const validateRT = (value) => {
    if (value.toString().length > 3) {
        return "RT tidak melebihi 3 digit";
    }
    return true;
};

export { validateRT };