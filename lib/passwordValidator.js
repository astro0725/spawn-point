function validatePassword(password) {
    const has8Characters = /.{8,}/;
    const hasCapitalLetter = /[A-Z]/;
    const hasNumber = /[0-9]/;
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/; 

    if (!has8Characters.test(password)) {
        return "Password must be at least 8 characters long.";
    }
    if (!hasCapitalLetter.test(password)) {
        return "Password must contain at least one capital letter.";
    }
    if (!hasNumber.test(password)) {
        return "Password must contain at least one number.";
    }
    if (!hasSpecialChar.test(password)) {
        return "Password must contain at least one special character.";
    }
    return null;
}