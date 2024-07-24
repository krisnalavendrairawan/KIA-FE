// src/components/MyDocument.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoPosyandu from "assets/images/logoPosyandu.png";
/* eslint-disable react/prop-types */
const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Helvetica-Bold',
        fontWeight: 'bold'
    },
    alert: { backgroundColor: '#83B4FF', color: 'white', fontSize: 10, padding: 4, height: 20, display: 'flex', alignItems: 'center', borderRadius: 7, fontWeight: 'bold', marginHorizontal: 10 },
    section: { pageBreakAfter: 'always', color: 'black', fontSize: 14, textAlign: 'center', marginHorizontal: 30, marginVertical: 10, },
    subtitle: {
        fontSize: 10,
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 12,
    },
    text: {
        fontSize: 10,
        margin: 10,
        textAlign: 'justify',
    },
    textAlert: {
        fontSize: 10,
        textAlign: 'justify',
        fontWeight: 'bold',
    },
    table: {
        display: "table",
        width: "auto",
        margin: "10px",
        borderStyle: "none",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "50%",
        padding: 5,
    },
    tableCell: {
        fontSize: 10,
    },
    image: {
        width: 50,
        height: 50,
        marginBottom: 20,
        alignSelf: 'center',
    },
    footer: {
        textAlign: 'right',
        marginTop: 20,
    },
    footerText: {
        marginVertical: 5,
    },
    footerSignature: {
        marginTop: 40,
    },
    image: {
        width: 90,
        height: 70,
        // marginBottom: 20,
        alignSelf: 'center',
    },
});
/* eslint-disable react/prop-types */
const MyDocument = ({ datas }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Image style={styles.image} src="/path-to-your-logo.png" />
            <View style={styles.section}>
                <Image style={styles.image} src={logoPosyandu} />
                <Text>HASIL KEGIATAN POSYANDU</Text>
            </View>

            <Text style={styles.subtitle}>Posyandu Cibeusi</Text>
            <Text style={styles.subtitle}>Desa Cibeusi, Kec. Jatinangor, Kab. Sumedang</Text>
            <View style={{ borderBottom: '2px solid black', marginHorizontal: 10, marginBottom: 10, }}></View>
            <Text style={styles.text}>Dengan ini menerangkan bahwa pada tanggal {datas && datas.tgl_penimbangan}, telah dilakukan penimbangan terhadap anak dengan data sebagai berikut:</Text>

            <View style={styles.alert}>
                <Text style={styles.textAlert}>INFORMASI ANAK</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Nama Anak</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.nama_anak}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>NIK Anak</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.nik_anak}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Tanggal Lahir</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.tanggal_lahir}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Jenis Kelamin</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.jenis_kelamin}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Nama Ibu</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.nama_ibu}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Nama Ayah</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.nama_ayah}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Alamat</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.alamat}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.alert}>
                <Text style={styles.textAlert}>HASIL IMUNISASI</Text>
            </View>
            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Tanggal Penimbangan</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.tgl_imunisasi}</Text>
                    </View>
                </View>

                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Jenis Imunisasi</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.jenis_imunisasi}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Usia</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.usia} bulan</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Pemberian Vitamin</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.vitamin}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>Pemberian MPASI</Text>
                    </View>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>: {datas && datas.mpasi}</Text>
                    </View>
                </View>
            </View>
        </Page>
    </Document>
);

export default MyDocument;
