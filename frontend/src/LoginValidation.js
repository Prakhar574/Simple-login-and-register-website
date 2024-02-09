function Validation(values) {
    let error = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.email === "") {
        error.email = "Email should not be empty";
    } else if (!emailPattern.test(values.email)) {
        error.email = "Email format is incorrect";
    }

    if (values.password === "") {
        error.password = "Password should not be empty";
    } else if (!passwordPattern.test(values.password)) {
        error.password = "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter";
    }

    return error;
}

export default Validation;
