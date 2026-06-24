import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { backgroundColor: '#000000', padding: 40, fontFamily: 'Helvetica' },
  logo: { width: 40, height: 40, marginRight: 10 },
  companyName: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 4 },
  title: { fontSize: 16, fontFamily: 'Helvetica-Bold', color: '#ffffff', textAlign: 'center', marginTop: 20, marginBottom: 20 },
  bodyText: { fontSize: 10, color: '#ffffff', lineHeight: 1.6, textAlign: 'justify', marginBottom: 10 },
  bold: { fontFamily: 'Helvetica-Bold' },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginTop: 15, marginBottom: 6 },
  detailsBox: { borderWidth: 1, borderColor: '#ffffff', padding: 12, marginBottom: 15, marginTop: 10 },
  detailRow: { flexDirection: 'row', marginBottom: 6 },
  detailLabel: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff', width: '40%' },
  detailValue: { fontSize: 10, color: '#ffffff', width: '60%' },
  signatureSection: { marginTop: 40, flexDirection: 'row', justifyContent: 'space-between' },
  signatureBox: { width: '45%' },
  signatureLine: { borderBottomWidth: 1, borderBottomColor: '#ffffff', marginBottom: 5, marginTop: 30 },
  signatureText: { fontSize: 10, color: '#ffffff' },
  signatureBold: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  divider: { borderBottomWidth: 1, borderBottomColor: '#ffffff', marginTop: 40, marginBottom: 10 },
})

interface Props {
  candidateName: string
  position: string
  salary: string
  startDate: string
  companyRepName: string
  letterDate: string
  department: string
}

export function FullTimeAgreementPDF({ candidateName, position, salary, startDate, companyRepName, letterDate, department }: Props) {
  const firstName = candidateName.split(' ')[1] || candidateName.split(' ')[0]
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, borderBottomWidth: 1, borderBottomColor: '#ffffff', paddingBottom: 10 }}>
          <Image
           src={`${process.cwd()}/public/KnightOwl_Logo.jpeg`}
           style={styles.logo}
          />
          <Text style={styles.companyName}>KNIGHT OWL</Text>
        </View>

        <Text style={styles.title}>EMPLOYMENT AGREEMENT</Text>

        <Text style={styles.bodyText}>
          This Employment Agreement ("Agreement") is entered into as of <Text style={styles.bold}>{letterDate}</Text>, between <Text style={styles.bold}>Knight Owl</Text>, a company registered in Sri Lanka with its principal place of business at 86/1, Egodawatta, Ambalangoda, Polgasowita, Sri Lanka ("Company"), and <Text style={styles.bold}>{candidateName}</Text> ("Employee").
        </Text>

        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Employee Name:</Text>
            <Text style={styles.detailValue}>{candidateName}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Position:</Text>
            <Text style={styles.detailValue}>{position}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Department:</Text>
            <Text style={styles.detailValue}>{department}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Monthly Salary:</Text>
            <Text style={styles.detailValue}>LKR {salary}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Start Date:</Text>
            <Text style={styles.detailValue}>{startDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Employment Type:</Text>
            <Text style={styles.detailValue}>Full-Time, Permanent</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reporting To:</Text>
            <Text style={styles.detailValue}>{companyRepName} – CEO</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>1. Position & Duties</Text>
        <Text style={styles.bodyText}>
          Dear {firstName}, Knight Owl agrees to employ you as <Text style={styles.bold}>{position}</Text> in the <Text style={styles.bold}>{department}</Text> department commencing <Text style={styles.bold}>{startDate}</Text>. You will perform duties as assigned and are expected to contribute actively to team efforts and company goals.
        </Text>

        <Text style={styles.sectionTitle}>2. Compensation</Text>
        <Text style={styles.bodyText}>
          The Employee will receive a monthly salary of <Text style={styles.bold}>LKR {salary}</Text>, paid at the end of each calendar month. The Company reserves the right to review and adjust compensation annually based on performance.
        </Text>

        <Text style={styles.sectionTitle}>3. Working Hours</Text>
        <Text style={styles.bodyText}>
          Standard working hours are Monday to Friday. The Employee may be required to work additional hours as needed to fulfill their responsibilities. Remote working arrangements may be agreed upon separately.
        </Text>

        <Text style={styles.sectionTitle}>4. Confidentiality</Text>
        <Text style={styles.bodyText}>
          The Employee agrees to keep all proprietary and confidential information of Knight Owl strictly confidential during and after employment, as outlined in the separately executed Non-Disclosure Agreement.
        </Text>

        <Text style={styles.sectionTitle}>5. Termination</Text>
        <Text style={styles.bodyText}>
          Either party may terminate this Agreement with a written notice of thirty (30) days. Knight Owl reserves the right to terminate employment immediately in cases of gross misconduct or breach of company policies.
        </Text>

        <Text style={styles.sectionTitle}>6. Governing Law</Text>
        <Text style={styles.bodyText}>
          This Agreement shall be governed by the laws of Sri Lanka.
        </Text>

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
            <Text style={styles.signatureText}>Employee:</Text>
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