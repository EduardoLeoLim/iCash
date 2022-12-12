
function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var contrasenia = document.getElementById('contrasenia').value;
    if (usuario != "" && contrasenia != "") {
        comprobarCredenciales(usuario, contrasenia)
        .then(function(){
            location.href = "../../HTML/Conductor/ModificarCuenta.html";
        })
        .catch(function (error){{
            alert("Credenciales invalidas");
        }});
    }else{
        alert("Campos incompletos");
    }
}

function comprobarCredenciales(usuario, contrasenia) {
    return new Promise(function(res, rej){
        axios.post(URL_BASE+'/conductor/login', {
            nombreUsuario: usuario,
            claveAcceso: contrasenia
          })
          .then(function (response) {
            agregarValoresStorage(response)
            res()
          })
          .catch(function (error) {
            rej()
          });
    })
}
 

function agregarValoresStorage(response){
    sessionStorage.setItem("token", response.headers.authorization)
    sessionStorage.setItem("nombreUsuario", response.data.nombreUsuario)
    sessionStorage.setItem("contrasena", response.data.claveAcceso)
    sessionStorage.setItem("idUsuario", response.data.id)
}

window.onload = function(){
    document.getElementById("botonIniciarSesion").onclick = iniciarSesion;
};
