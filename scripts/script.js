function validateFields() {
    const emailValid = isEmailValid();
    document.getElementById("recover-password-button").disabled = !emailValid;

    const passwordValid = isPasswordValid();
    document.getElementById("login-button").disabled = !emailValid || !passwordValid;

}

function isEmailValid() {
    const email = document.getElementById("email").value;
    if (!email) {
        return false;
    }
    return validateEmail(email);
}

function isPasswordValid() {
    const password = document.getElementById("password").value;
    if (!password) {
        return false;
    }
    return true;
}

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            window.location.href = "./login.html";
        }).catch(error => {
            alert("Login ou senha incorreta")
        });
    loading();
}


function recoverPassword() {
    const email = document.getElementById("email").value;
    loading();

    firebase.auth().sendPasswordResetEmail(email).then(() => {
        alert("Email enviado com sucesso!");
        window.location.href = "./index.html";
    }).catch(error => {
        alert("Houve um problema, favor nos contactar");
        window.location.href = "./index.html";
    });
}

function registro() {
    window.location.href = "./register.html";
}


