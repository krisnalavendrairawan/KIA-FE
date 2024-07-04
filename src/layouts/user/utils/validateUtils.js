import Swal from "sweetalert2";
import axios from "axios";

const URL = "http://127.0.0.1:8000/api";

const validateRT = (value) => {
    if (value.toString().length > 3) {
        return "RT tidak melebihi 3 digit";
    }
    return true;
};

const validateNIK = (value) => {
    if (value === "") {
        return "NIK tidak boleh kosong";
    }
    return true;
}

const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Format email tidak valid!',
        });
    
        return false;
    }
    return true;
};

const checkNIKExists = async (nik) => {
    try {
        const response = await axios.get(`${URL}/cekNik/${nik}`);
        console.log(response);
        if(response.data.message === "NIK sudah digunakan") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'NIK sudah digunakan!',
            });
            return false;
        }
        return true;
    }
    catch (error) {
        console.error('Error checking NIK:', error);
        return false;
    }
}

const checkUsernameExists = async (username) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cekUsername/${username}`);
        console.log(response);
        if(response.data.message === "Username sudah digunakan") {
           return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username sudah digunakan!',
            });
        return false;
        
        }
    } catch (error) {
        console.error('Error checking username:', error);
        return false;
    }
};

const checkEmailExists = async (email) => {
    try{
        const response = await axios.get(`http://127.0.0.1:8000/api/cekEmail/${email}`);
        console.log(response);
        if(response.data.message === "Email sudah digunakan"){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email sudah digunakan!',
            });
            //berhenti dan tidak melanjutkan proses ke tahap berikutnya
            return false;
        }
    }catch (error){
        console.error('Error checking email:', error);
        return false;
    }

    return true;

};

const checkUsernameExistsEdit = async (username, id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cekUsernameEdit/${username}/${id}`);
        console.log(response.data.message);
        return response.data.message;
    }
    catch (error) {
        console.error('Error checking username:', error);
        return false;
    }
}

const checkEmailExistsEdit = async (email, id) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cekEmailEdit/${email}/${id}`);
        console.log(response.data.message);
        return response.data.message;
    }
    catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
}

const validatePasswordMatch = (password, confirmPassword) => {
    if (password !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password dan Confirm Password tidak sama!',
        });
        return false;
    }
    return true;
};


export { validateEmail, validateRT, validateNIK, checkNIKExists, checkUsernameExists, checkEmailExists, checkUsernameExistsEdit, checkEmailExistsEdit, validatePasswordMatch};

