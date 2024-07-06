import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logoPosyandu from "assets/images/logoPosyandu.png";
import { id as idLocale } from 'date-fns/locale';
import { format } from 'date-fns';

/* eslint-disable react/prop-types */
const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
    title: {
        fontSize: 14,
        textAlign: 'center',
        margin: 20,
        fontFamily: 'Oswald',
        fontWeight: 'bold'
    },
    alert: {
        backgroundColor: '#83B4FF',
        color: 'white',
        fontSize: 10,
        padding: 4,
        height: 20,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 7,
        fontWeight: 'bold',
        marginHorizontal: 10
    },
    section: {
        pageBreakAfter: 'always',
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 30,
        marginVertical: 10,
    },
    sectionData: {
        color: 'black',
        fontSize: 14,
        textAlign: 'justify',
        margin: 30,
        border: '1px solid #000',
        marginHorizontal: 30,
        marginVertical: 10,
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
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
        borderStyle: "solid 1px #000",
        borderWidth: 1
    },
    tableRow: {
        flexDirection: "row",
        width: "100%",
        borderStyle: "solid 1px #000",
        borderWidth: 1
    },
    tableColHeader: {
        padding: 5,
        borderStyle: "solid 1px #000",
        flexGrow: 1,
        width: '12.5%', // Adjusted to ensure even distribution across 8 columns
    },
    tableCol: {
        padding: 2, // Reduced padding
        borderStyle: "solid 1px #000",
        flexGrow: 1,
        width: '12.5%', // Adjusted to ensure even distribution across 8 columns
    },
    tableCell: {
        fontSize: 10,
        borderStyle: "solid 1px #000",
        marginVertical: 0, // Removed vertical margin
        paddingVertical: 2, // Reduced vertical padding
    },
    image: {
        width: 90,
        height: 70,
        alignSelf: 'center',
    },
});

const MyDocument = ({ dataPenimbangan, dataImunisasi }) => {
    const month = format(new Date(dataPenimbangan[0]?.tgl_penimbangan || dataImunisasi[0]?.tgl_imunisasi), 'MMMM', { locale: idLocale });
    const year = format(new Date(dataPenimbangan[0]?.tgl_penimbangan || dataImunisasi[0]?.tgl_imunisasi), 'yyyy', { locale: idLocale });

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.image} src={logoPosyandu} />
                    <Text>RIWAYAT KEGIATAN POSYANDU</Text>
                </View>

                <Text style={styles.subtitle}>Posyandu Cibeusi</Text>
                <Text style={styles.subtitle}>Desa Cibeusi, Kec. Jatinangor, Kab. Sumedang</Text>
                <View style={{ borderBottom: '2px solid black', marginHorizontal: 10, marginBottom: 10, }}></View>
                <Text style={styles.text}>Dengan ini menerangkan bahwa pada bulan {month} {year}, telah dilakukan penimbangan terhadap anak dengan data sebagai berikut:</Text>

                <View style={styles.alert}>
                    <Text style={styles.textAlert}>RIWAYAT PENIMBANGAN BULAN {month.toUpperCase()} {year}</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            {["Tanggal", "Nama", "Berat Badan", "Tinggi Badan", "Status Gizi", "Keterangan", "Saran", "Usia"].map((header, index) => (
                                <View style={styles.tableColHeader} key={index}>
                                    <Text style={styles.tableCell}>{header}</Text>
                                </View>
                            ))}
                        </View>

                        {dataPenimbangan?.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{format(new Date(item.tgl_penimbangan), 'dd MMMM yyyy', { locale: idLocale })}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.anak.nama_anak}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.berat_badan}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.tinggi_badan}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.status_gizi}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.keterangan}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.saran}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.usia}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>

            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.image} src={logoPosyandu} />
                    <Text>RIWAYAT KEGIATAN POSYANDU</Text>
                </View>

                <Text style={styles.subtitle}>Posyandu Cibeusi</Text>
                <Text style={styles.subtitle}>Desa Cibeusi, Kec. Jatinangor, Kab. Sumedang</Text>
                <View style={{ borderBottom: '2px solid black', marginHorizontal: 10, marginBottom: 10, }}></View>
                <Text style={styles.text}>Dengan ini menerangkan bahwa pada bulan {month} {year}, telah dilakukan imunisasi terhadap anak dengan data sebagai berikut:</Text>

                <View style={styles.alert}>
                    <Text style={styles.textAlert}>RIWAYAT IMUNISASI BULAN {month.toUpperCase()} {year}</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            {["Tanggal", "Nama Anak", "Jenis Imunisasi", "Usia"].map((header, index) => (
                                <View style={styles.tableColHeader} key={index}>
                                    <Text style={styles.tableCell}>{header}</Text>
                                </View>
                            ))}
                        </View>

                        {dataImunisasi?.map((item, index) => (
                            <View style={styles.tableRow} key={index}>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{format(new Date(item.tgl_imunisasi), 'dd MMMM yyyy', { locale: idLocale })}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.anak.nama_anak}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.jenis_imunisasi}</Text>
                                </View>
                                <View style={styles.tableCol}>
                                    <Text style={styles.tableCell}>{item.usia}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );
};

export default MyDocument;
