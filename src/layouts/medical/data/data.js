export default function dataAnak(data){
    //map data anak
    return data.map(child => {
        // Ambil data berat badan dari tabel penimbangan yang berelasi dengan tabel anak
        const lastBeratBadan = child.penimbangan?.length > 0
            ? child.penimbangan[child.penimbangan.length - 1].berat_badan
            : null;
        const lastTinggiBadan = child.penimbangan?.length > 0
            ? child.penimbangan[child.penimbangan.length - 1].tinggi_badan
            : null;
        const latestMonth = child.penimbangan?.length > 0
            ? child.penimbangan[child.penimbangan.length - 1].usia
            : null;

        const tinggi_badan = child.penimbangan?.length > 0
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
            // usia : latestMonth,
            berat_badan: lastBeratBadan,
            tinggi_badan: lastTinggiBadan,
            // bb_lahir: child.bb_lahir,
        };
    });
}