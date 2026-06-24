import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { backgroundColor: '#000000', padding: 40, fontFamily: 'Helvetica' },
  logo: { width: 40, height: 40, marginRight: 10 },
  companyName: { fontSize: 28, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 4 },
  companyInfoBold: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 3 },
  companyInfo: { fontSize: 10, color: '#ffffff', marginBottom: 3 },
  dateText: { fontSize: 10, color: '#ffffff', marginTop: 10, marginBottom: 10 },
  toText: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginTop: 10 },
  addressText: { fontSize: 10, color: '#ffffff', marginBottom: 2 },
  dearText: { fontSize: 10, color: '#ffffff', marginTop: 20, marginBottom: 10 },
  titleText: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 10 },
  bodyText: { fontSize: 10, color: '#ffffff', lineHeight: 1.6, textAlign: 'justify', marginBottom: 10 },
  bold: { fontFamily: 'Helvetica-Bold' },
  sectionTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginTop: 15, marginBottom: 8 },
  bulletRow: { flexDirection: 'row', marginBottom: 5 },
  bulletDot: { fontSize: 10, color: '#ffffff', marginRight: 6 },
  bulletLabel: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  bulletValue: { fontSize: 10, color: '#ffffff' },
  footer: { marginTop: 30 },
  footerText: { fontSize: 10, color: '#ffffff', marginBottom: 2 },
  footerBold: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 2 },
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

export function ContractOfferLetterPDF({ candidateName, position, contractFee, startDate, endDate, companyRepName, letterDate, department }: Props) {
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

        <View>
          <Text style={styles.companyInfoBold}>Knight Owl</Text>
          <Text style={styles.companyInfo}>86/1, Egodawatta, Ambalangoda, Polgasowita, Sri Lanka</Text>
          <Text style={styles.companyInfo}>contact@knightowl.online | +94766773354</Text>
          <Text style={styles.dateText}><Text style={styles.bold}>Date:</Text> {letterDate}</Text>
          <Text style={styles.toText}>To:</Text>
          <Text style={styles.addressText}>{candidateName}</Text>
          <Text style={styles.dearText}>Dear {firstName},</Text>
          <Text style={styles.titleText}>Contract Offer Letter - {position}</Text>

          <Text style={styles.bodyText}>
            We are pleased to offer you a contract position as <Text style={styles.bold}>{position}</Text> at <Text style={styles.bold}>Knight Owl</Text>. This contract will commence on <Text style={styles.bold}>{startDate}</Text> and will continue until <Text style={styles.bold}>{endDate}</Text>.
          </Text>

          <Text style={styles.bodyText}>
            As a <Text style={styles.bold}>{position}</Text> in the <Text style={styles.bold}>{department}</Text> department, you will be engaged to deliver specific services and deliverables as agreed. You will collaborate with our team to ensure quality outcomes within the defined contract period.
          </Text>

          <Text style={styles.sectionTitle}>Contract Details:</Text>

          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Position: </Text>
            <Text style={styles.bulletValue}>{position}</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Department: </Text>
            <Text style={styles.bulletValue}>{department}</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Contract Period: </Text>
            <Text style={styles.bulletValue}>{startDate} to {endDate}</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Contract Fee: </Text>
            <Text style={styles.bulletValue}>LKR {contractFee} per month</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Employment Type: </Text>
            <Text style={styles.bulletValue}>Contract</Text>
          </View>
          <View style={styles.bulletRow}>
            <Text style={styles.bulletDot}>●</Text>
            <Text style={styles.bulletLabel}>Reporting To: </Text>
            <Text style={styles.bulletValue}>{companyRepName} – CEO</Text>
          </View>

          <Text style={styles.bodyText}>
            This offer is contingent upon your acceptance and adherence to Knight Owl's policies and code of conduct. To confirm your acceptance, please reply to this email or provide a signed copy of this letter.
          </Text>

          <Text style={styles.bodyText}>
            We look forward to a productive and successful collaboration!
          </Text>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Warm regards,</Text>
            <Text style={styles.footerBold}>{companyRepName}</Text>
            <Text style={styles.footerText}>Founder & CEO</Text>
            <Text style={styles.footerText}>Knight Owl</Text>
            <Text style={styles.footerText}>manul.knightowl@gmail.com | +94766773354</Text>
          </View>

          <View style={styles.divider} />
        </View>
      </Page>
    </Document>
  )
}