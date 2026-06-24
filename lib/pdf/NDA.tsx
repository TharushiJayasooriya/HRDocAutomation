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
  letterDate: string
}

export function NDAPDF({ candidateName, position, letterDate }: Props) {
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

        <Text style={styles.title}>NON-DISCLOSURE AGREEMENT</Text>

        <Text style={styles.bodyText}>
          This Non-Disclosure Agreement ("Agreement") is entered into as of <Text style={styles.bold}>{letterDate}</Text>, between <Text style={styles.bold}>Knight Owl</Text>, a company registered in Sri Lanka with its principal place of business at 86/1, Egodawatta, Ambalangoda, Polgasowita, Sri Lanka ("Company"), and <Text style={styles.bold}>{candidateName}</Text>, joining as <Text style={styles.bold}>{position}</Text> ("Recipient").
        </Text>

        <Text style={styles.sectionTitle}>1. Confidential Information</Text>
        <Text style={styles.bodyText}>
          "Confidential Information" means any data or information that is proprietary to Knight Owl and not generally known to the public, whether in tangible or intangible form, including but not limited to business strategies, client information, financial data, technical data, trade secrets, product plans, software, and any other information disclosed by the Company.
        </Text>

        <Text style={styles.sectionTitle}>2. Obligations of Recipient</Text>
        <Text style={styles.bodyText}>
          The Recipient agrees to: (a) hold all Confidential Information in strict confidence; (b) not disclose any Confidential Information to third parties without prior written consent from Knight Owl; (c) use the Confidential Information solely for the purpose of fulfilling duties as <Text style={styles.bold}>{position}</Text> at Knight Owl; (d) notify Knight Owl immediately upon discovery of any unauthorized use or disclosure of Confidential Information.
        </Text>

        <Text style={styles.sectionTitle}>3. Duration</Text>
        <Text style={styles.bodyText}>
          This Agreement shall remain in effect during the period of engagement with Knight Owl and for a period of two (2) years following the termination of such engagement.
        </Text>

        <Text style={styles.sectionTitle}>4. Return of Information</Text>
        <Text style={styles.bodyText}>
          Upon termination of engagement or upon request by Knight Owl, the Recipient shall promptly return or destroy all materials containing Confidential Information.
        </Text>

        <Text style={styles.sectionTitle}>5. Governing Law</Text>
        <Text style={styles.bodyText}>
          This Agreement shall be governed by and construed in accordance with the laws of Sri Lanka.
        </Text>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>For Knight Owl:</Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureBold}>Manul Singhe</Text>
            <Text style={styles.signatureText}>Founder & CEO</Text>
            <Text style={styles.signatureText}>Knight Owl</Text>
            <Text style={styles.signatureText}>Date: {letterDate}</Text>
          </View>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>Recipient:</Text>
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