function onChangeEmail() {
    const email = form.email().value;
    form.emailRequiredError().style.display = email ? "none" : "block";

    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";

    toggleRegisterButtonDisable();
}

function onChangePassword() {
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";

    form.passwordMinLengthError().style.display = password.length >= 6 ? "none" : "block";

    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function onChangeConfirmPassword() {
    validatePasswordsMatch();
    toggleRegisterButtonDisable();
}

function validatePasswordsMatch() {
    const password = form.password().value;
    const confirmPassword = form.confirmPassword().value;

    form.confirmPasswordDoesntMatchError().style.display =
        password == confirmPassword ? "none" : "block";
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid();
}

function isFormValid() {
    const email = form.email().value;
    if (!email || !validateEmail(email)) {
        return false;
    }

    const password = form.password().value;
    if (!password || password.length < 6) {
        return false;
    }

    const confirmPassword = form.confirmPassword().value;
    if (password != confirmPassword) {
        return false;
    }

    return true;


}

function register() {
    const email = form.email().value;
    const password = form.password().value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "/pages/login.html";
        })
        .catch(error => {
            alert(getErrorMessage(error));
        });
}



const form = {
    confirmPassword: () => document.getElementById('confirmPassword'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('email-invalid-error'),
    emailRequiredError: () => document.getElementById('email-required-error'),
    password: () => document.getElementById('password'),
    passwordMinLengthError: () => document.getElementById('password-min-length-error'),
    passwordRequiredError: () => document.getElementById('password-required-error'),
    registerButton: () => document.getElementById('register-button')
}

function getErrorMessage(error) {
    switch (error.code) {
        case 'auth/weak-password':
            return 'A senha é muito fraca. Tente novamente com uma senha mais forte.';
        case 'auth/email-already-in-use':
            return 'O email já está em uso. Escolha outro email.';
        case 'auth/invalid-email':
            return 'O email é inválido. Verifique o formato do email.';
        // Adicione mais casos conforme necessário
        default:
            return 'Ocorreu um erro durante o registro. Tente novamente mais tarde.';
    }
}
