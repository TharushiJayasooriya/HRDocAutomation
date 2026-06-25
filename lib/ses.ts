import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function sendDocumentsEmail(
  candidateName: string,
  candidateEmail: string,
  position: string,
  documents: { documentType: string; fileUrl: string }[]
): Promise<void> {
  const documentLinks = documents
    .map((doc) => `<li><a href="${doc.fileUrl}">${doc.documentType}</a></li>`)
    .join('')

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #000000; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; letter-spacing: 4px;">KNIGHT OWL</h1>
      </div>
      <div style="padding: 30px; background-color: #ffffff;">
        <p>Dear ${candidateName},</p>
        <p>We are pleased to welcome you to <strong>Knight Owl</strong> as our new <strong>${position}</strong>.</p>
        <p>Please find your documents attached below:</p>
        <ul>${documentLinks}</ul>
        <p>Please review and sign the documents at your earliest convenience.</p>
        <p>If you have any questions, feel free to reach out to us at <a href="mailto:contact@knightowl.online">contact@knightowl.online</a>.</p>
        <br/>
        <p>Warm regards,</p>
        <p><strong>Manul Singhe</strong><br/>Founder & CEO<br/>Knight Owl<br/>manul.knightowl@gmail.com | +94766773354</p>
      </div>
      <div style="background-color: #000000; padding: 10px; text-align: center;">
        <p style="color: #ffffff; font-size: 12px;">© 2025 Knight Owl. All rights reserved.</p>
      </div>
    </div>
  `

  const command = new SendEmailCommand({
    Source: process.env.SES_FROM_EMAIL!,
    Destination: {
      ToAddresses: [candidateEmail],
    },
    Message: {
      Subject: {
        Data: `Your Documents from Knight Owl - ${position}`,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlBody,
          Charset: 'UTF-8',
        },
      },
    },
  })

  await sesClient.send(command)
}