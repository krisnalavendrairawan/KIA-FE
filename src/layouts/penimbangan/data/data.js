export default function dataAnak(data) {
    return data.map(child => {
        // Ambil data berat badan dari tabel penimbangan yang berelasi dengan tabel anak
        const latestPenimbangan = child.penimbangan?.length > 0
            ? child.penimbangan[child.penimbangan.length - 1].berat_badan
            : null;
        const latestMonth = child.penimbangan?.length > 0
            ? child.penimbangan[child.penimbangan.length - 1].usia
            : null;
        return {
            nik: child.nik,
            no_kk: child.no_kk,
            nama_anak: child.nama_anak,
            nama_ibu: child.nama_ibu,
            nama_ayah: child.nama_ayah,
            jenis_kelamin: child.jenis_kelamin,
            tanggal_lahir: child.tanggal_lahir,
            alamat: child.alamat,
            umur: child.umur,
            usia : latestMonth,
            berat_badan: latestPenimbangan,
            bb_lahir: child.bb_lahir,
        };
    });
}
