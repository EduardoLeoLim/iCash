function mostrarDatosReporte() {
    let idEmpleado = sessionStorage.getItem("idEmpleado");
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
    var tabla = document.getElementById('reportes'), rIndex;
    for (var i = 0; i < tabla.rows.length; i++) {
        tabla.rows[i].onclick = function() {
            rIndex = this.rowIndex;
            sessionStorage.setItem("idReporteSiniestro",this.cells[0].innerHTML);
        }
    }
}

function filtrar() {
    var input, filtro, tabla, tr, td, i, txtValor;
    input = document.getElementById("filtro");
    filtro = input.value.toUpperCase();
    tabla = document.getElementById("reportes");
    tr = tabla.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
          txtValor = td.textContent || td.innerText;
          if (txtValor.toUpperCase().indexOf(filtro) > -1) {
            tr[i].style.display = "";
          } else {
            tr[i].style.display = "none";
          }
        }
    }
}

function cambiarVentana() {
    if (sessionStorage.getItem("idReporteSiniestro") === null) {
        alert("Debe seleccionar un reporte para consultarlo")
    } else {
        location.href = "../../HTML/Ajustador/VerDetallesReporte.html";
    }
}

function cerrarSesion() {
    sessionStorage.removeItem("idUsuario")
    sessionStorage.removeItem("idEmpleado")
    sessionStorage.removeItem("contrasena")
    sessionStorage.removeItem("nombreUsuario")
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("idReporteSiniestro")
    location.href = "../../HTML/Ajustador/LoginAjustador.html";
}

window.onload = function(){
    existenValoresStorage("../../HTML/Ajustador/LoginAjustador.html")
    mostrarDatosReporte()
    filtrar()
    document.getElementById("verDetalles").onclick = cambiarVentana;
    document.getElementById("cerrarSesion").onclick = cerrarSesion;
};