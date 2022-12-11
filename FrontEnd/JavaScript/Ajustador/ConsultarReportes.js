const ID_REPORTE = 0;

function mostrarDatosPoliza() {
    //Lina 3 borrar cuando se tenga login Ajustador
    sessionStorage.setItem("idEmpleado", 1);
    const idEmpleado = sessionStorage.getItem("idEmpleado");
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
    data.forEach(reporte => {
        let idReporte = reporte.id;
        let nombre = reporte.nombre;
        let estatus = reporte.estatus;
        let fechaRegistro = reporte.fecha;
        let conductor = reporte.conductor.nombre;

        let tabla = document.getElementById('reportes');
        let template = `
                        <tr onclick="consultarReporte()">
                            <td>${idReporte}</td>
                            <td>${nombre}</td>
                            <td>${estatus}</td>
                            <td>${fechaRegistro}</td>
                            <td>${conductor}</td>
                        </tr>`;
        tabla.innerHTML += template;
    });
}

function consultarReporte() {
    var tds = document.getElementsByTagName('td');
    ID_REPORTE = tds[0].innerHTML.trim()
}

function cambiarVentana() {
    if (ID_REPORTE == 0) {
        alert("Debe seleccionar un reporte para consultarlo")
    } else {
        location.href = "../../HTML/Ajustador/VerDetallesReporte.html";
    }
}

window.onload = function(){
    //Descomentar linea 43 cuando se tenga login Ajustador
    //existenValoresStorage("../../HTML/Conductor/InicioSesion.html")
    mostrarDatosPoliza()
    document.getElementById("verDetalles").onclick = cambiarVentana;
};