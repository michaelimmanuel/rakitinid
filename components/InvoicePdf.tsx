import React from "react";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Define styles
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 11,
    color: "#333",
    padding: 20,
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
    marginBottom: 10,
    lineHeight: 1.5,
  },
  contactText: {
    fontSize: 10,
    marginBottom: 3,
  },
  boldText: {
    fontWeight: "bold",
  },
  invoiceTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "right",
    marginBottom: 5,
  },
  issuedDate: {
    fontSize: 12,
    textAlign: "right",
  },
  goodsSection: {
    border: "1 solid #000",
    marginTop: 10,
    padding: 5,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1 solid #000",
    marginBottom: 5,
    paddingBottom: 3,
    textAlign: "center",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1 solid #EEE",
    paddingVertical: 5,
  },
  tableCell: {
    textAlign: "center",
    flex: 1,
  },
  goodsList: {
    marginTop: 5,
    fontSize: 10,
    marginLeft: 10,
  },
  totalText: {
    textAlign: "right",
    fontSize: 12,
    marginTop: 10,
  },
});

const logo = "/rakitin-logo.png";

const InvoicePDF = ({ invoiceData }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image src={logo} style={styles.logo} />
        <Text style={styles.tagline}>PC Build | Upgrade | Service | Maintenance | Peripheral</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactSection}>
        <Text style={styles.contactText}> <Text style={styles.boldText}>RAKITINLAH.ID</Text></Text>
        <Text style={styles.contactText}> (+62) 813 8102 4919</Text>
        <Text style={styles.contactText}> Ruko Maggiore Grande Blok D-21,</Text>
        <Text style={styles.contactText}>Gading Serpong, Tangerang Selatan, 15332</Text>
        <Text style={styles.contactText}>BCA a/n Kevin Reviandri C (0661090447)</Text>
      </View>

      {/* Invoice Title and Date */}
      <Text style={styles.invoiceTitle}>INVOICE</Text>
      <Text style={styles.issuedDate}>Issued Date: {invoiceData.date}</Text>

      {/* Goods/Services Table */}
      <View style={styles.goodsSection}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>GOODS/SERVICES</Text>
          <Text style={styles.tableCell}>QTY</Text>
          <Text style={styles.tableCell}>PRICE</Text>
          <Text style={styles.tableCell}>TOTAL</Text>
        </View>

        {/* Table Rows */}
        {invoiceData.items.map((item: any, index: number) => (
          <View style={styles.tableRow} key={index}>
            <Text style={styles.tableCell}>{item.description}</Text>
            <Text style={styles.tableCell}>{item.quantity}</Text>
            <Text style={styles.tableCell}>{item.price}</Text>
            <Text style={styles.tableCell}>{item.total}</Text>
          </View>
        ))}
      </View>

      {/* Total */}
      <Text style={styles.totalText}>Grand Total: {invoiceData.total}</Text>
    </Page>
  </Document>
);

export default InvoicePDF;
