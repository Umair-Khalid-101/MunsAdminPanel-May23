import React from "react";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  // Image,
} from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";

const styles = StyleSheet.create({
  bold: {
    fontSize: 16,
    fontWeight: "bold",
  },
  section: {
    paddingHorizontal: "10%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: "3%",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: "5%",
  },
  normal: {
    fontSize: 16,
    fontWeight: "light",
    width: "80%",
    marginLeft: "5%",
  },
  page: {
    backgroundColor: "#E4E4E4",
    width: "100%",
  },
});

export default function MyPDF() {
  const { state } = useLocation();
  // console.log("STATE:", state);
  return (
    <PDFViewer className="w-[100%] min-h-screen">
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.heading}>
            <Text>Muns TrashValet</Text>
            <Text>Incident Report</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Issue:</Text>
            <Text style={styles.normal}>{state?.issue}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Apartment:</Text>
            <Text style={styles.normal}>{state?.apartment}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Property Name:</Text>
            <Text style={styles.normal}>{state?.propertyname}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>City Name:</Text>
            <Text style={styles.normal}>{state?.cityname}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>State Name:</Text>
            <Text style={styles.normal}>{state?.statename}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Other:</Text>
            <Text style={styles.normal}>{state?.other}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Reported By:</Text>
            <Text style={styles.normal}>{state?.reportedBy}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Reported Date:</Text>
            <Text style={styles.normal}>{state?.reportedDate}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.bold}>Reported Time:</Text>
            <Text style={styles.normal}>{state?.reportedTime}</Text>
          </View>
          {/* <Image style={styles.image} src={state?.incidentImage} /> */}
        </Page>
      </Document>
    </PDFViewer>
  );
}
