function existenValoresStorage(direccion){
    if(!sessionStorage.getItem("token") || !sessionStorage.getItem("nombreUsuario") || !sessionStorage.getItem("idUsuario") || !sessionStorage.getItem("contrasena")){
        window.open(direccion, "_self");
        return;
    }

    axios.get(URL_BASE+"/validarToken", {
        headers: {
            'Authorization': sessionStorage.getItem("token")
        }
    })
        .then(function (response){
        })
        .catch(function (){
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("nombreUsuario");
            sessionStorage.removeItem("idUsuario");
            sessionStorage.removeItem("contrasena");
            if(sessionStorage.getItem("idEmpleado") === null){
                sessionStorage.removeItem("idConductor");
            }else{
                sessionStorage.removeItem("idEmpleado");
            }
            window.open(direccion, "_self");
        })
}