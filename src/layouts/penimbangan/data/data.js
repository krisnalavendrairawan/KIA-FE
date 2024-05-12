export default function dataAnak (data) {
    return data.map(child => ({
        nik: child.nik,
        no_kk: child.no_kk,
        nama_anak: child.nama_anak,
        nama_ibu: child.nama_ibu,
        nama_ayah: child.nama_ayah,
        jenis_kelamin: child.jenis_kelamin,
        tanggal_lahir: child.tanggal_lahir,
        alamat: child.alamat,
        umur : child.umur,
        berat_badan: child.berat_badan,
    }));
}