import {
  Document, Page, Text, View, StyleSheet, Image
} from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#000000',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    paddingBottom: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  companyName: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    letterSpacing: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  bodyText: {
    fontSize: 10,
    color: '#ffffff',
    lineHeight: 1.6,
    textAlign: 'justify',
    marginBottom: 10,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginTop: 15,
    marginBottom: 6,
  },
  detailsBox: {
    borderWidth: 1,
    borderColor: '#ffffff',
    padding: 12,
    marginBottom: 15,
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  detailLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    width: '40%',
  },
  detailValue: {
    fontSize: 10,
    color: '#ffffff',
    width: '60%',
  },
  signatureSection: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginBottom: 5,
    marginTop: 30,
  },
  signatureText: {
    fontSize: 10,
    color: '#ffffff',
  },
  signatureBold: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    marginTop: 40,
    marginBottom: 10,
  },
})

interface Props {
  candidateName: string
  position: string
  allowance: string
  startDate: string
  endDate: string
  companyRepName: string
  letterDate: string
}

export function InternshipAgreementPDF({
  candidateName,
  position,
  allowance,
  startDate,
  endDate,
  companyRepName,
  letterDate,
}: Props) {
  const firstName = candidateName.split(' ')[1] || candidateName.split(' ')[0]

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Image
           src={`${process.cwd()}/public/KnightOwl_Logo.jpeg`}
           style={styles.logo}
          />
          <Text style={styles.companyName}>KNIGHT OWL</Text>
        </View>

        <Text style={styles.title}>INTERNSHIP AGREEMENT</Text>

        <Text style={styles.bodyText}>
          This Internship Agreement ("Agreement") is made and entered into as of <Text style={styles.bold}>{letterDate}</Text>, between <Text style={styles.bold}>Knight Owl</Text>, a company registered in Sri Lanka with its principal place of business at 86/1, Egodawatta, Ambalangoda, Polgasowita, Sri Lanka ("Company"), and <Text style={styles.bold}>{candidateName}</Text> ("Intern").
        </Text>

        {/* Details Box */}
        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Intern Name:</Text>
            <Text style={styles.detailValue}>{candidateName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Position:</Text>
            <Text style={styles.detailValue}>{position}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly Allowance:</Text>
            <Text style={styles.detailValue}>LKR {allowance}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Start Date:</Text>
            <Text style={styles.detailValue}>{startDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>End Date:</Text>
            <Text style={styles.detailValue}>{endDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reporting To:</Text>
            <Text style={styles.detailValue}>{companyRepName} – CEO</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>1. Internship Scope</Text>
        <Text style={styles.bodyText}>
          Dear {firstName}, Knight Owl agrees to provide the Intern with an internship opportunity in the capacity of <Text style={styles.bold}>{position}</Text>. The Intern will contribute to real-world projects, work collaboratively with the team, and gain practical industry experience during the internship period from <Text style={styles.bold}>{startDate}</Text> to <Text style={styles.bold}>{endDate}</Text>.
        </Text>

        <Text style={styles.sectionTitle}>2. Allowance</Text>
        <Text style={styles.bodyText}>
          The Intern will receive a monthly allowance of <Text style={styles.bold}>LKR {allowance}</Text> for the duration of the internship. This allowance is not considered a salary and does not create an employer-employee relationship.
        </Text>

        <Text style={styles.sectionTitle}>3. Confidentiality</Text>
        <Text style={styles.bodyText}>
          The Intern agrees to keep all proprietary and confidential information of Knight Owl strictly confidential during and after the internship period, as outlined in the separately executed Non-Disclosure Agreement.
        </Text>

        <Text style={styles.sectionTitle}>4. Conduct & Responsibilities</Text>
        <Text style={styles.bodyText}>
          The Intern is expected to maintain professionalism, meet deadlines, actively contribute to team efforts, and adhere to Knight Owl's policies and code of conduct at all times.
        </Text>

        <Text style={styles.sectionTitle}>5. Termination</Text>
        <Text style={styles.bodyText}>
          Either party may terminate this Agreement with a written notice of seven (7) days. Knight Owl reserves the right to terminate the Agreement immediately in cases of misconduct or breach of company policies.
        </Text>

        <Text style={styles.sectionTitle}>6. Governing Law</Text>
        <Text style={styles.bodyText}>
          This Agreement shall be governed by the laws of Sri Lanka.
        </Text>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>For Knight Owl:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureBold}>{companyRepName}</Text>
            <Text style={styles.signatureText}>Founder & CEO</Text>
            <Text style={styles.signatureText}>Knight Owl</Text>
            <Text style={styles.signatureText}>Date: {letterDate}</Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Intern:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureBold}>{candidateName}</Text>
            <Text style={styles.signatureText}>{position}</Text>
            <Text style={styles.signatureText}>Date: {letterDate}</Text>
          </View>
        </View>

        <View style={styles.divider} />
      </Page>
    </Document>
  )
}