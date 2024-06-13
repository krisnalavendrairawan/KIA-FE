import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const useDeleteData = (deleteUrl) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (id, setData) => {
        // Tampilkan konfirmasi SweetAlert2
        const confirmDelete = await Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        });

        // Jika pengguna mengonfirmasi penghapusan
        if (confirmDelete.isConfirmed) {
            setLoading(true);
            try {
                await axios.delete(`${deleteUrl}/${id}`);
                // Hapus baris data dari state lokal
                setData(prevData => prevData.filter(item => item.id !== id));
                // Tampilkan pesan sukses dengan SweetAlert2
                await Swal.fire('Berhasil!', 'Data telah dihapus.', 'success');
            } catch (error) {
                setError("Gagal menghapus data");
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    };

    return { loading, error, deleteData };
};

export default useDeleteData;
