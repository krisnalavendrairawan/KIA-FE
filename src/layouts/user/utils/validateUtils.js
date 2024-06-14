import Swal from "sweetalert2";
import axios from "axios";

const validateRT = (value) => {
    if (value.toString().length > 3) {
        return "RT tidak melebihi 3 digit";
    }
    return true;
};

const checkUsernameExists = async (username) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cekUsername/${username}`);
        // console.log(response);
        return response.data.message;
    } catch (error) {
        console.error('Error checking username:', error);
        return false;
    }
};

const checkEmailExists = async (email) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cekEmail/${email}`);
        console.log(response);
        return response.data.message; 
    } catch (error) {
        console.error('Error checking email:', error);
        return false;
    }
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

export { validateRT, checkUsernameExists, checkEmailExists, checkUsernameExistsEdit, checkEmailExistsEdit};

