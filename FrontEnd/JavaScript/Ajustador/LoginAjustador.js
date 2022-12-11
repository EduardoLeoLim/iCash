
function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var contrasenia = document.getElementById('contrasenia').value;
    if (usuario != "" && contrasenia != "") {
        location.href = "/FrontEnd/HTML/Ajustador/MainAjustador.html";
    }else{
        alert("Campos incompletos");
    }
}