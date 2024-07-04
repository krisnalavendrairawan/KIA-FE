// src/components/ChildDetailPDF.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { id as idLocale, te } from 'date-fns/locale';
import { format } from 'date-fns';
import logoPosyandu from "assets/images/logoPosyandu.png";

// Create styles
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
    alert: { backgroundColor: '#83B4FF', color: 'white', fontSize: 10, padding: 4, height: 20, display: 'flex', alignItems: 'center', borderRadius: 7, fontWeight: 'bold', marginHorizontal: 10 },
    section: { pageBreakAfter: 'always', color: 'black', fontSize: 14, textAlign: 'center', marginHorizontal: 30, marginVertical: 10, },
    sectionData: { color: 'black', fontSize: 14, textAlign: 'justify', margin: 30, border: '1px solid #000', marginHorizontal: 30, marginVertical: 10, },
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
    tableData: {
        display: "table",
        width: "auto",
        margin: "10px",
        borderStyle: "none",
    },
    tableRowData: {
        flexDirection: "row",
    },
    tableColData: {
        width: "50%",
        padding: 5,
    },
    tableCellData: {
        fontSize: 10,
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
        borderStyle: "solid 1px #000",
        borderWidth: 1
    },
    tableCol: {
        width: "50%",
        padding: 5,
        borderStyle: "solid 1px #000",
        // borderWidth: 1
    },
    tableCell: {
        fontSize: 10,
        borderStyle: "solid 1px #000",
        // borderWidth: 1
    },
    image: {
        width: 90,
        height: 70,
        // marginBottom: 20,
        alignSelf: 'center',
    },
});
/* eslint-disable react/prop-types */
// Create Document Component
const ChildDetailPDF = ({ datas, dataPenimbangan, dataImunisasi }) => (
    <Document>
        <Page size="A4" style={styles.page}>

            <View style={styles.section}>
                <Image style={styles.image} src={logoPosyandu} />
                <Text>HASIL KEGIATAN POSYANDU</Text>
            </View>

            <Text style={styles.subtitle}>Posyandu Cibeusi</Text>
            <Text style={styles.subtitle}>Desa Cibeusi, Kec. Jatinangor, Kab. Sumedang</Text>
            <View style={{ borderBottom: '2px solid black', marginHorizontal: 10, marginBottom: 10, }}></View>
            <View>
                <Text style={styles.text}>Dengan Hormat, kami sampaikan hasil penimbangan dan imunisasi anak Posyandu Cibeusi sebagai berikut:</Text>
            </View>
            <View style={styles.alert}>
                <Text style={styles.textAlert}>INFORMASI ANAK</Text>
            </View>
            <View style={styles.sectionData}>
                <View style={styles.tableData}>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Nama Anak</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.nama_anak}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>NIK Anak</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.nik}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>No KK</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.no_kk}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Tanggal Lahir</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && format(new Date(datas.tanggal_lahir), 'dd MMMM yyyy', { locale: idLocale })}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Jenis Kelamin</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.jenis_kelamin}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Anak Ke</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.anak_ke}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Usia</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.umur} bulan</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Berat Badan Lahir</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.bb_lahir} kg</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Panjang Badan Lahir</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.pb_lahir} cm</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Nama Ibu</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.nama_ibu}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Nama Ayah</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: {datas && datas.nama_ayah}</Text>
                        </View>
                    </View>
                    <View style={styles.tableRowData}>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>Alamat</Text>
                        </View>
                        <View style={styles.tableColData}>
                            <Text style={styles.tableCellData}>: Desa {datas && datas.alamat}, RT {datas && datas.rt}/RW {datas && datas.rw}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.alert}>
                <Text style={styles.textAlert}>INFORMASI PENIMBANGAN ANAK</Text>
            </View>
            <View style={styles.section}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Tanggal</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Berat Badan</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Tinggi Badan</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Status Gizi</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Keterangan</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Saran</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Usia</Text>
                        </View>
                    </View>

                    {dataPenimbangan?.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{format(new Date(item.tgl_penimbangan), 'dd MMMM yyyy', { locale: idLocale })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.berat_badan} kg</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.tinggi_badan} cm</Text>
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
                                <Text style={styles.tableCell}>{item.usia} bulan</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
            <View style={styles.section}>
                <View style={styles.alert}>
                    <Text style={styles.textAlert}>INFORMASI IMUNISASI ANAK</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Tanggal Imunisasi</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Jenis Imunisasi</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Usia</Text>
                        </View>
                    </View>

                    {dataImunisasi?.map((item, index) => (
                        <View style={styles.tableRow} key={index} break>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{format(new Date(item.tgl_imunisasi), 'dd MMMM yyyy', { locale: idLocale })}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.tgl_imunisasi}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{item.usia} bulan</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);

export default ChildDetailPDF;
