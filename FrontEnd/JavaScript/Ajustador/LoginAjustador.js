
function iniciarSesion() {
    var usuario = document.getElementById('usuario').value;
    var contrasenia = document.getElementById('contrasenia').value;
    if (usuario != "" && contrasenia != "") {
        comprobarCredenciales(usuario, contrasenia)
        .then(function(){
            
            location.href = "../../HTML/Ajustador/ConsultarReportes.html";
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
        axios.post(URL_BASE+'/ajustador/login', {
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
    console.log(response.headers)
    sessionStorage.setItem("token", response.headers.authorization)
    sessionStorage.setItem("nombreUsuario", response.data.nombreUsuario)
    sessionStorage.setItem("contrasena", response.data.claveAcceso)
    sessionStorage.setItem("idUsuario", response.data.id)
    sessionStorage.setItem("idEmpleado", response.data.idEmpleado)
}

window.onload = function(){
    document.getElementById("iniciarSesion").onclick = iniciarSesion;
};
