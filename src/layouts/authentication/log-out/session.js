import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SessionExpired = () => {
    const navigate = useNavigate();
    if (localStorage.getItem('token') === null) {
        Swal.fire({
            icon: 'error',
            title: 'Session Expired',
            text: 'Mohon login kembali untuk melanjutkan',
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/authentication/sign-in');
            }
        })
    }
}

export default SessionExpired;