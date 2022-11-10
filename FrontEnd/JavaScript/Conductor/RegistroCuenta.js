
function registrar() {
    var nombre = document.getElementById('nombres').value;
    var apellidoPaterno = document.getElementById('apellidoPaterno').value;
    var apellidoMaterno = document.getElementById('apellidoMaterno').value;
    var correo = document.getElementById('correo').value;
    var numLicencia = document.getElementById('numLicencia').value;
    var usuario = document.getElementById('usuario').value;
    var contrasenia = document.getElementById('contrasenia').value;
    var confirmarContrasenia = document.getElementById('confirmarContrasenia').value;

    var validarCamposVacios = camposVacios(nombre, apellidoPaterno, apellidoMaterno, correo,
                                    numLicencia, usuario, contrasenia, confirmarContrasenia);
    var correoValido = validarCorreo(correo);
    var validarContraseniaSegura = contraseniaSegura(contrasenia);
    var contraseniasIguales = validarContrasenias(contrasenia, confirmarContrasenia);

    if(validarCamposVacios && correoValido && validarContraseniaSegura && contraseniasIguales){
        location.href = "../../HTML/Conductor/InicioSesion.html";
    }
}

function camposVacios(nom, apellidoPa, apellidoMat, correo, numLicencia, usuario, contra, confirmarContra) {
    if (nom != "" && apellidoPa != "" && apellidoMat != "" &&
        correo != "" && numLicencia != "" && usuario != "" &&
        contra != "" && confirmarContra != "") {
        return true;
    } else {
        alert("Campos incompletos");
        return false;
    }
}

function validarCorreo(correo) {
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    var esValido = expReg.test(correo);
    if(esValido == true){
        return true;
    } else {
        alert("Correo no valido");
        return false;
    }
}

function contraseniaSegura(contra) {
    var expReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
    var contraSegura = expReg.test(contra);
    if (contraSegura == true) {
        return true;
    } else {
        alert("Su contraseña no es segura")
    }
}

function validarContrasenias(contra1, contra2) {
    if (contra1 != contra2) {
        alert("Las contraseñas no coinciden");
        return false;
    } else {
        return true;
    }
}
