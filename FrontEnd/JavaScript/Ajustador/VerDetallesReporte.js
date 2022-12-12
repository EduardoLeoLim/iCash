let ID_REPORTE = 0;

function mostrarDatosReporte() {
    const idReporte = sessionStorage.getItem("idReporte");
    return new Promise(function(res, rej){
        axios.get(URL_BASE+'/ajustadores/'+idEmpleado+'/reportesSiniestro')
          .then(function (response) {
            agregarValoresStorage(response.data)
            res()
          })
          .catch(function (error) {
            rej(error)
          });
    })
}

function agregarValoresStorage(data) {

        //let ciudad = municipio.nombre;
        let estatus = reporte.estatus;
        let fechaRegistro = reporte.fecha;
        let latitud = reporte.latitud;
        let longitud = reporte.longitud;
        let nombre = reporte.nombre;

        //document.getElementById("ciudad").textContent = ciudad;
        document.getElementById("estatus").textContent = estatus;
        document.getElementById("fechaRegistro").textContent = fechaRegistro;
        document.getElementById("latitud").textContent = latitud;
        document.getElementById("longitud").textContent = longitud;
        document.getElementById("nombre").textContent = nombre;
}

window.onload = function(){
    existenValoresStorage("../../HTML/Ajustador/ConsultarReportes.html")
    mostrarDatosReporte()
};