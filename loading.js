// Adicione esta função no seu script.js
function loading() {
    // Exibir tela de carregamento
    document.getElementById("loading-screen").style.display = "block";

    // Simular um atraso (você pode substituir isso por lógica real de registro)
    setTimeout(() => {
        // Esconder tela de carregamento após o tempo necessário
        document.getElementById("loading-screen").style.display = "none";
         window.location.href = "register.html";
    }, 2000); // Tempo de simulação de 2 segundos (substitua pelo tempo real necessário)
}