'use client';

import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#1e3a8a',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#334155',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    color: '#475569',
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 5,
  },
});

const FinancialDocument = ({ transactions, assets, liabilities, user }) => {
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, t) => acc + t.amount, 0);
  const totalAssets = assets.reduce((acc, a) => acc + a.value, 0);
  const totalLiabilities = liabilities.reduce((acc, l) => acc + l.value, 0);
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Financial Report - FinTrack</Text>
        <Text style={{ fontSize: 12, marginBottom: 20, textAlign: 'center', color: '#64748b' }}>
          Generated for: {user?.name || 'User'} | Date: {new Date().toLocaleDateString()}
        </Text>

        <View style={styles.section}>
          <Text style={styles.title}>Summary</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Total Income:</Text>
            <Text style={styles.text}>${totalIncome.toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Total Expenses:</Text>
            <Text style={styles.text}>${totalExpense.toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.total}>Monthly Balance:</Text>
            <Text style={styles.total}>${(totalIncome - totalExpense).toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>Portfolio Summary</Text>
          <View style={styles.row}>
            <Text style={styles.text}>Total Assets:</Text>
            <Text style={styles.text}>${totalAssets.toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Total Liabilities:</Text>
            <Text style={styles.text}>${totalLiabilities.toLocaleString()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.total}>Net Worth:</Text>
            <Text style={styles.total}>${(totalAssets - totalLiabilities).toLocaleString()}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default function DownloadReport({ transactions, assets, liabilities, user }) {
  return (
    <div className="mt-8">
      <PDFDownloadLink
        document={<FinancialDocument transactions={transactions} assets={assets} liabilities={liabilities} user={user} />}
        fileName="fintrack-financial-report.pdf"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-colors"
      >
        {({ blob, url, loading, error }) => (loading ? 'Generating PDF...' : 'Download Full PDF Report')}
      </PDFDownloadLink>
    </div>
  );
}
