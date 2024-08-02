const validateRT = (value) => {
    if (value.toString().length > 3) {
        return "RT tidak melebihi 3 digit";
    }
    return true;
};

const validateNIK = (value) => {
    if (value.toString().length > 16) {
        return "NIK tidak melebihi 16 digit";
    }
    return true;
}

export { validateRT, validateNIK };