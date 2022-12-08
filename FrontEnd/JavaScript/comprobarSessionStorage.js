function existenValoresStorage(direccion){
    if(!sessionStorage.getItem("token") || !sessionStorage.getItem("nombreUsuario") || !sessionStorage.getItem("idUsuario") || !sessionStorage.getItem("contrasena")){
        window.open(direccion, "_self");
        return;
    }

    const config = {
        Headers: {
            authorization: sessionStorage.getItem("token")
        }
    }
    axios.get(URL_BASE+"/validarToken", config)
        .then(function (response){
        })
        .catch(function (){
            window.open(direccion, "_self");
        })
}
