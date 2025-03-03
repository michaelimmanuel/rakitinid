import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Font } from "@react-pdf/renderer";

// Register bold font
Font.register({
  family: "Helvetica-Bold",
  src: "https://fonts.gstatic.com/s/helveticaneue/HelveticaNeueBold.ttf",
});

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#333",
    
  },
  header: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    textAlign: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  tagline: {
    fontSize: 10,
    marginTop: 5,
  },
  contactSection: {
    padding: 20,
    marginBottom: 5,
    lineHeight: 1,
  },
  contactText: {
    fontSize: 10,
    marginBottom: 1,
  },
  boldText: {
    fontFamily: "Helvetica-Bold",
  },
  invoiceTitle: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    textAlign: "right",
    marginBottom: 5,
  },
  issuedDate: {
    fontSize: 12,
    textAlign: "right",
  },
  goodsSection: {
    marginTop: 10,
    padding: 10,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #000",
    paddingBottom: 3,
    textAlign: "center",
    fontFamily: "Helvetica-Bold",
    padding:20
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #EEE",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  tableCell: {
    textAlign: "left",
    flex: 1,
  },
  totalSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTop: "1 solid #000",
    paddingHorizontal: 20,
  },
  totalText: {
    textAlign: "right",
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
  },
  pageBreak: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    fontStyle: "italic",
    color: "#666",
  },
  signature: {
    marginTop: 20,
    alignItems: "flex-end",
    paddingHorizontal: 20,
  },
  invoiceInfo: {
    marginRight: 20,
  }
});

const logo = "/rakitin-logo.png";

const InvoicePDF = ({ invoiceData, id }: { invoiceData: any; id: string }) => {
  const itemsPerPage = 9; // Adjust based on page layout
  const pages = [];

  for (let i = 0; i < invoiceData.items.length; i += itemsPerPage) {
    pages.push(invoiceData.items.slice(i, i + itemsPerPage));
  }

  return (
    <Document>
      {pages.map((pageItems, pageIndex) => (
        <Page key={pageIndex} size="A4" style={styles.page}>
          {/* Header Section */}
          <View style={styles.header}>
            <Image src={logo} style={styles.logo} />
            <Text style={styles.tagline}>PC Build | Upgrade | Service | Maintenance | Peripheral</Text>
          </View>

          {/* Contact Information (Only on First Page) */}
          {pageIndex === 0 && (
            <View style={styles.contactSection}>
              <Text style={styles.contactText}><Text style={styles.boldText}>RAKITINLAH.ID</Text></Text>
              <Text style={styles.contactText}>(+62) 813 8102 4919, (+62) 878 62 5859 62 </Text>
              <Text style={styles.contactText}>Ruko Maggiore Grande Blok D-21,</Text>
              <Text style={styles.contactText}>Gading Serpong, Tangerang Selatan, 15332</Text>
              <Text style={styles.contactText}>BCA a/n Kevin Reviandri C (0661090447)</Text>
              <Text style={styles.contactText}>BCA a/n Revindo Sinergi Gemilang CV (7635647388)</Text>
            </View>
          )}

          {/* Invoice Title and Date (Only on First Page) */}
          {pageIndex === 0 && (
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.issuedDate}>Issued Date: {invoiceData.date}</Text>
              <Text style={[styles.issuedDate, styles.boldText]}>RKTN-{id}</Text>
            </View>
          )}

          {/* Goods/Services Table */}
          <View style={styles.goodsSection}>
            {/* Table Header (Always Present) */}
            <View style={styles.tableHeader} wrap={false}>
              {Object.keys(invoiceData.items[0]).map((key: string, index: number) => (
                <Text style={styles.tableCell} key={index}>
                  {key.toUpperCase()}
                </Text>
              ))}
            </View>

            {/* Table Rows */}
            {pageItems.map((item: any, index: number) => (
              <View style={styles.tableRow} key={index}>
                {Object.keys(item).map((key: string, subIndex: number) => (
                  <Text style={styles.tableCell} key={subIndex}>
                    {item[key]}
                  </Text>
                ))}
              </View>
            ))}
          </View>

          {/* Last Page - Show Grand Total and Signature */}
          {pageIndex === pages.length - 1 && (
            <View style={[styles.totalSection]}>
              <Text style={styles.totalText}>Grand Total: {invoiceData.total}</Text>

              {/* Signature */}
              <View style={styles.signature}>
                <Image src="/images/signature.png" style={{ width: 320, height: 100 }} />
              </View>
            </View>
          )}

          {/* Page Break Indicator (if not the last page) */}

        </Page>
      ))}
    </Document>
  );
};

export default InvoicePDF;
