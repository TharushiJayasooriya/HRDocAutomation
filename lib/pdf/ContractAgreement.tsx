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
  contractFee: string
  startDate: string
  endDate: string
  companyRepName: string
  letterDate: string
  department: string
}

export function ContractAgreementPDF({ candidateName, position, contractFee, startDate, endDate, companyRepName, letterDate, department }: Props) {
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

        <Text style={styles.title}>CONTRACT AGREEMENT</Text>

        <Text style={styles.bodyText}>
          This Contract Agreement ("Agreement") is entered into as of <Text style={styles.bold}>{letterDate}</Text>, between <Text style={styles.bold}>Knight Owl</Text>, a company registered in Sri Lanka with its principal place of business at 86/1, Egodawatta, Ambalangoda, Polgasowita, Sri Lanka ("Company"), and <Text style={styles.bold}>{candidateName}</Text> ("Contractor").
        </Text>

        <View style={styles.detailsBox}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contractor Name:</Text>
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
            <Text style={styles.detailLabel}>Contract Fee:</Text>
            <Text style={styles.detailValue}>LKR {contractFee} per month</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contract Start:</Text>
            <Text style={styles.detailValue}>{startDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Contract End:</Text>
            <Text style={styles.detailValue}>{endDate}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Reporting To:</Text>
            <Text style={styles.detailValue}>{companyRepName} – CEO</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>1. Scope of Work</Text>
        <Text style={styles.bodyText}>
          Dear {firstName}, Knight Owl engages you as an independent contractor in the capacity of <Text style={styles.bold}>{position}</Text> in the <Text style={styles.bold}>{department}</Text> department for the contract period from <Text style={styles.bold}>{startDate}</Text> to <Text style={styles.bold}>{endDate}</Text>. You will deliver services and deliverables as agreed with the Company.
        </Text>

        <Text style={styles.sectionTitle}>2. Contract Fee</Text>
        <Text style={styles.bodyText}>
          The Contractor will receive a monthly contract fee of <Text style={styles.bold}>LKR {contractFee}</Text>, payable at the end of each calendar month upon satisfactory completion of agreed deliverables.
        </Text>

        <Text style={styles.sectionTitle}>3. Independent Contractor Status</Text>
        <Text style={styles.bodyText}>
          The Contractor is an independent contractor and not an employee of Knight Owl. This Agreement does not create an employer-employee relationship. The Contractor is responsible for their own taxes and statutory obligations.
        </Text>

        <Text style={styles.sectionTitle}>4. Confidentiality</Text>
        <Text style={styles.bodyText}>
          The Contractor agrees to keep all proprietary and confidential information of Knight Owl strictly confidential during and after the contract period, as outlined in the separately executed Non-Disclosure Agreement.
        </Text>

        <Text style={styles.sectionTitle}>5. Intellectual Property</Text>
        <Text style={styles.bodyText}>
          All work products, deliverables, and intellectual property created by the Contractor during the contract period shall be the exclusive property of Knight Owl upon full payment of the contract fee.
        </Text>

        <Text style={styles.sectionTitle}>6. Termination</Text>
        <Text style={styles.bodyText}>
          Either party may terminate this Agreement with a written notice of fourteen (14) days. Knight Owl reserves the right to terminate immediately in cases of breach of contract or misconduct.
        </Text>

        <Text style={styles.sectionTitle}>7. Governing Law</Text>
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
            <Text style={styles.signatureText}>Contractor:</Text>
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