import { NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { prisma } from '@/lib/db'
import React from 'react'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

// Intern templates
import { OfferLetterPDF } from '@/lib/pdf/OfferLetter'
import { NDAPDF } from '@/lib/pdf/NDA'
import { InternshipAgreementPDF } from '@/lib/pdf/InternshipAgreement'

// Full-Time templates
import { FullTimeOfferLetterPDF } from '@/lib/pdf/FullTimeOfferLetter'
import { FullTimeAgreementPDF } from '@/lib/pdf/FullTimeAgreement'
import { FullTimeNDAPDF } from '@/lib/pdf/FullTimeNDA'

// Contract templates
import { ContractOfferLetterPDF } from '@/lib/pdf/ContractOfferLetter'
import { ContractAgreementPDF } from '@/lib/pdf/ContractAgreement'
import { ContractNDAPDF } from '@/lib/pdf/ContractNDA'

const s3Client = new S3Client({ region: process.env.AWS_REGION })

async function uploadToS3(buffer: Buffer, key: string): Promise<string> {
  const bucketName = process.env.S3_BUCKET_NAME || process.env.AWS_S3_BUCKET || process.env.AWS_BUCKET
  if (!bucketName) {
    throw new Error('S3 bucket name not configured')
  }

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: 'application/pdf',
    })
  )

  return `https://${bucketName}.s3.amazonaws.com/${encodeURIComponent(key)}`
}

export async function POST(req: Request) {
  try {
    const { candidateId } = await req.json()

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
    })

    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      )
    }

    const startDate = new Date(candidate.startDate)
    const endDate = new Date(candidate.startDate)
    endDate.setFullYear(endDate.getFullYear() + 1)

    const formatDate = (date: Date) =>
      date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })

    const letterDate = formatDate(new Date())
    const formattedStart = formatDate(startDate)
    const formattedEnd = formatDate(endDate)

    const sanitizedName = candidate.fullName.replace(/\s+/g, '_')
    let documentsToCreate: {
      candidateId: string
      documentType: string
      fileUrl: string
    }[] = []

    if (candidate.employmentType === 'Intern') {
      const offerBuffer = Buffer.from(await renderToBuffer(
        React.createElement(OfferLetterPDF, {
          candidateName: candidate.fullName,
          candidateAddress: 'Sri Lanka',
          position: candidate.position,
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
        }) as React.ReactElement<any>
      ))

      const ndaBuffer = Buffer.from(await renderToBuffer(
        React.createElement(NDAPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          letterDate,
        }) as React.ReactElement<any>
      ))

      const agreementBuffer = Buffer.from(await renderToBuffer(
        React.createElement(InternshipAgreementPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          allowance: candidate.salary.toString(),
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
        }) as React.ReactElement<any>
      ))

      const [offerUrl, ndaUrl, agreementUrl] = await Promise.all([
        uploadToS3(offerBuffer, `${sanitizedName}/Internship_Offer_Letter.pdf`),
        uploadToS3(ndaBuffer, `${sanitizedName}/Intern_NDA.pdf`),
        uploadToS3(agreementBuffer, `${sanitizedName}/Internship_Agreement.pdf`),
      ])

      documentsToCreate = [
        { candidateId, documentType: 'Internship Offer Letter', fileUrl: offerUrl },
        { candidateId, documentType: 'Intern NDA', fileUrl: ndaUrl },
        { candidateId, documentType: 'Internship Agreement', fileUrl: agreementUrl },
      ]

    } else if (candidate.employmentType === 'Full-Time') {
      const offerBuffer = Buffer.from(await renderToBuffer(
        React.createElement(FullTimeOfferLetterPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          salary: candidate.salary.toString(),
          startDate: formattedStart,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      ))

      const agreementBuffer = Buffer.from(await renderToBuffer(
        React.createElement(FullTimeAgreementPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          salary: candidate.salary.toString(),
          startDate: formattedStart,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      ))

      const ndaBuffer = Buffer.from(await renderToBuffer(
        React.createElement(FullTimeNDAPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          letterDate,
        }) as React.ReactElement<any>
      ))

      const [offerUrl, agreementUrl, ndaUrl] = await Promise.all([
        uploadToS3(offerBuffer, `${sanitizedName}/Employment_Offer_Letter.pdf`),
        uploadToS3(agreementBuffer, `${sanitizedName}/Employment_Agreement.pdf`),
        uploadToS3(ndaBuffer, `${sanitizedName}/Employee_NDA.pdf`),
      ])

      documentsToCreate = [
        { candidateId, documentType: 'Employment Offer Letter', fileUrl: offerUrl },
        { candidateId, documentType: 'Employment Agreement', fileUrl: agreementUrl },
        { candidateId, documentType: 'Employee NDA', fileUrl: ndaUrl },
      ]

    } else if (candidate.employmentType === 'Contract') {
      const offerBuffer = Buffer.from(await renderToBuffer(
        React.createElement(ContractOfferLetterPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          contractFee: candidate.salary.toString(),
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      ))

      const agreementBuffer = Buffer.from(await renderToBuffer(
        React.createElement(ContractAgreementPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          contractFee: candidate.salary.toString(),
          startDate: formattedStart,
          endDate: formattedEnd,
          companyRepName: candidate.companyRepName,
          letterDate,
          department: candidate.department,
        }) as React.ReactElement<any>
      ))

      const ndaBuffer = Buffer.from(await renderToBuffer(
        React.createElement(ContractNDAPDF, {
          candidateName: candidate.fullName,
          position: candidate.position,
          letterDate,
          endDate: formattedEnd,
        }) as React.ReactElement<any>
      ))

      const [offerUrl, agreementUrl, ndaUrl] = await Promise.all([
        uploadToS3(offerBuffer, `${sanitizedName}/Contract_Offer_Letter.pdf`),
        uploadToS3(agreementBuffer, `${sanitizedName}/Contract_Agreement.pdf`),
        uploadToS3(ndaBuffer, `${sanitizedName}/Contractor_NDA.pdf`),
      ])

      documentsToCreate = [
        { candidateId, documentType: 'Contract Offer Letter', fileUrl: offerUrl },
        { candidateId, documentType: 'Contract Agreement', fileUrl: agreementUrl },
        { candidateId, documentType: 'Contractor NDA', fileUrl: ndaUrl },
      ]
    }

    // Save to database
    await prisma.document.deleteMany({ where: { candidateId } })
    await prisma.document.createMany({ data: documentsToCreate })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Failed to generate documents' },
      { status: 500 }
    )
  }
}