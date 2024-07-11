import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LogOut = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    Swal.fire({
      title: 'Logout Berhasil',
      text: 'Anda telah logout dari aplikasi',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      localStorage.clear();
      navigate('/authentication/sign-in');
    });
  }, [navigate]);

  return null;
};

export default LogOut;
