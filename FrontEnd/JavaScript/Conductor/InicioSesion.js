
function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var contrasenia = document.getElementById('contrasenia').value;
    if (usuario != "" && contrasenia != "") {
        location.href = "../../HTML/Conductor/ModificarCuenta.html";
    }else{
        alert("Campos incompletos");
    }
}