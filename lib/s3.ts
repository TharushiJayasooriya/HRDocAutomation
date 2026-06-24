import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

const bucketName = process.env.AWS_S3_BUCKET!

export async function uploadToS3(
  buffer: Buffer,
  key: string,
  contentType: string = 'application/pdf'
): Promise<string> {
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  )

  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
}