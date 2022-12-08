
function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var contrasenia = document.getElementById('contrasenia').value;
    if (usuario != "" && contrasenia != "") {
        location.href = "../../HTML/Conductor/ModificarCuenta.html";
    }else{
        alert("Campos incompletos");
    }
}

/*

function agregarValoresStorage(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 & this.status == 200){
            const header = new Headers();
            const token = header.get('authorization');
            const nombreUsuario
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("nombreUsuario", nombreUsuario);
            sessionStorage.setItem("idUsuario", idUsuario);
        }
    };
    xhttp.open("POST", "", true);
    xhttp.send();
}

window.onload = function(){
    existenValoresStorage();
};

*/