import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import Swal from 'sweetalert2';

// Images
import team2 from "assets/images/team-2.jpg";

export default function DataAnak() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/getAnak")
      .then((response) => {
        setDatas(response.data.anak); // Assuming response.data contains the array of children data
        console.log("Data fetched: ", response.data.anak);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleDelete = (nik) => {
    Swal.fire({
      title: 'Konfirmasi Penghapusan',
      text: 'Apakah Anda yakin ingin menghapus data anak ini?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengonfirmasi penghapusan
        console.log(`Delete button clicked for NIK: ${nik}`);
        axios.delete(`http://127.0.0.1:8000/api/deleteAnak/${nik}`)
          .then((response) => {
            // Tampilkan pesan sukses jika diperlukan
            Swal.fire('Sukses!', 'Data anak berhasil dihapus.', 'success');
            //refresh halaman
            window.location.reload();
            // Kemungkinan perlu memperbarui UI setelah penghapusan
          })
          .catch((error) => {
            console.error("Error deleting data: ", error);
            // Tampilkan pesan kesalahan jika diperlukan
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus data anak.', 'error');
          });
      }
    });
  };

  const Anak = ({ image, nama_anak, nik }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={nama_anak} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {nama_anak}
        </MDTypography>
        <MDTypography variant="caption">{nik}</MDTypography>
      </MDBox>
    </MDBox>
  );

  Anak.propTypes = {
    image: PropTypes.string.isRequired,
    nama_anak: PropTypes.string.isRequired,
    nik: PropTypes.string.isRequired,
  };

  const Parent = ({ nama_ibu, nama_ayah }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {nama_ibu}
      </MDTypography>
      <MDTypography variant="caption">{nama_ayah}</MDTypography>
    </MDBox>
  );

  Parent.propTypes = {
    nama_ibu: PropTypes.string.isRequired, // Validate nama_ibu prop as a string and mark it as required
    nama_ayah: PropTypes.string.isRequired, // Validate nama_ayah prop as a string and mark it as required
};

  // Map fetched data to the required format for rows
  const rows = datas.map((data, index) => ({
    nama_anak: <Anak image={team2} nama_anak={data.nama_anak} nik={String(data.nik)} />, // Konversi menjadi string di sini
    orang_tua: <Parent nama_ibu={data.nama_ibu} nama_ayah={data.nama_ayah} />,
    nik: String(data.nik), // Juga konversi di sini
    no_kk: data.no_kk,
    nama_ayah: data.nama_ayah,
    anak_ke: data.anak_ke,
    tanggal_lahir: data.tanggal_lahir,
    jenis_kelamin: data.jenis_kelamin,
    bb_lahir: `${data.bb_lahir} kg`, // Tambahkan satuan "kg"
    pb_lahir: `${data.pb_lahir} cm`, // Tambahkan satuan "cm"
    alamat: data.alamat,
    no_hp_ortu: data.no_hp_ortu,
    action: (
      <MDBox>
        <MDTypography
          component="a"
          href={`/anak/edit/${data.nik}`}
          variant="caption"
          color="text"
          fontWeight="medium"
          style={{ marginRight: 8 }}
        >
          Edit
        </MDTypography>
        <MDTypography
          component="button"
          variant="caption"
          color="error"
          fontWeight="medium"
          onClick={() => handleDelete(data.nik)} // Call handleDelete function on click
        >
          Delete
        </MDTypography>
      </MDBox>
      
    ),
  }));
  return { columns: [
    { Header: "Nama Anak", accessor: "nama_anak", width: "45%", align: "left" },
    { Header: "Orang Tua", accessor: "orang_tua", align: "left" },
    // { Header: "nik", accessor: "nik", align: "left" },
    { Header: "No KK", accessor: "no_kk", align: "center" },
    // { Header: "nama_ayah", accessor: "nama_ayah", align: "center" },
    { Header: "Anak Ke", accessor: "anak_ke", align: "center" },
    { Header: "Tanggal Lahir", accessor: "tanggal_lahir", align: "center" },
    { Header: "Jenis Kelamin", accessor: "jenis_kelamin", align: "center" },
    { Header: "Berat Badan Lahir", accessor: "bb_lahir", align: "center" },
    { Header: "Panjang Badan Lahir", accessor: "pb_lahir", align: "center" },
    { Header: "Alamat", accessor: "alamat", align: "center" },
    { Header: "No HP Ortu", accessor: "no_hp_ortu", align: "center" },
    { Header: "Aksi", accessor: "action", align: "center" },
  ],
  rows: rows };
}
