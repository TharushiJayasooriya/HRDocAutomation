import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendDocumentsEmail } from '@/lib/ses'

export async function POST(req: Request) {
  try {
    const { candidateId } = await req.json()

    const candidate = await prisma.candidate.findUnique({
      where: { id: candidateId },
      include: { documents: true },
    })

    if (!candidate) {
      return NextResponse.json(
        { error: 'Candidate not found' },
        { status: 404 }
      )
    }

    if (candidate.documents.length === 0) {
      return NextResponse.json(
        { error: 'No documents found. Please generate documents first.' },
        { status: 400 }
      )
    }

    await sendDocumentsEmail(
      candidate.fullName,
      candidate.email,
      candidate.position,
      candidate.documents.map((doc) => ({
        documentType: doc.documentType,
        fileUrl: doc.fileUrl,
      }))
    )

    // Save email log
    await prisma.emailLog.create({
      data: {
        candidateId,
        emailStatus: 'sent',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Send email error:', error)

    // Save failed log
    try {
      const { candidateId } = await req.json()
      await prisma.emailLog.create({
        data: {
          candidateId,
          emailStatus: 'failed',
        },
      })
    } catch {}

    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}