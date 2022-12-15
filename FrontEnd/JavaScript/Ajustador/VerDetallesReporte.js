
function mostrarDatosReporte() {
    const idReporte = sessionStorage.getItem("idReporteSiniestro");
   
    return new Promise(function(res, rej){
        axios.get(URL_BASE+'/reportesSiniestro/'+idReporte)
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
      
        let idPoliza = data.poliza.id;
        let nombreCobertura =  data.poliza.cobertura.nombre;
        let tipo = data.poliza.cobertura.tipo;
        let nombrePlazo = data.poliza.plazo.nombre;
        let precioFinal = data.poliza.precioFinal;
        let idReporte = data.id;
        let nombreReporte = data.nombre;
        let estatus = data.estatus;
        let fechaRegistro = data.fechaRegistro;
        let horaAccidente = data.horaAccidente;
        let latitud = data.latitud;
        let longitud = data.longitud;
        let fotos = data.fotos;

        data.involucrados.forEach(involucrado => {
            let idInvolucrado = involucrado.id;
            let nombreInvolucrado = involucrado.nombre;
            let vehiculo = involucrado.vehiculo;

            let anioVehiculo = "";
            let idVehiculo = "";
            let colorVehiculo = "";
            let modeloVehiculo = "";
            let idMarcaVehiculo = "";
            let numPlacasVehiculo = "";
            let numSerieVehiculo = "";
            let idPolizaInvolucrado = "";
              
            if(vehiculo != null){
               anioVehiculo = involucrado.vehiculo.año;
               idVehiculo = involucrado.vehiculo.id;
               colorVehiculo = involucrado.vehiculo.color;
               modeloVehiculo = involucrado.vehiculo.modelo;
               idMarcaVehiculo = involucrado.vehiculo.idMarca;
               numPlacasVehiculo = involucrado.vehiculo.numPlacas;
               numSerieVehiculo = involucrado.vehiculo.numSerie;
               idPolizaInvolucrado = involucrado.vehiculo.idPoliza;
            }

            document.getElementById("idPoliza").textContent = idPoliza;
            document.getElementById("nombreCobertura").textContent = nombreCobertura;
            document.getElementById("tipo").textContent = tipo;
            document.getElementById("nombrePlazo").textContent = nombrePlazo;
            document.getElementById("precioFinal").textContent = precioFinal;
            document.getElementById("idReporte").textContent = idReporte;
            document.getElementById("nombreReporte").textContent = nombreReporte;
            document.getElementById("estatus").textContent = estatus;
            document.getElementById("fechaRegistro").textContent = fechaRegistro;
            document.getElementById("horaAccidente").textContent = horaAccidente;
            document.getElementById("latitud").textContent = latitud;
            document.getElementById("longitud").textContent = longitud;
            
            let contenidoFotos = "";
            fotos.forEach(foto => { 
              contenidoFotos += `<img crossorigin="anonymous" src='${URL_BASE + "/reportesSiniestro/imagenes/" + foto}' width='300' height='300'>`
            })
            document.getElementById("fotosReporte").innerHTML = contenidoFotos;

            let tabla = document.getElementById('involucrados');
            let template = `
                            <tr>
                                <td>${idInvolucrado}</td>
                                <td>${nombreInvolucrado}</td>
                                <td>${idVehiculo}</td>
                                <td>${anioVehiculo}</td>
                                <td>${colorVehiculo}</td>
                                <td>${modeloVehiculo}</td>
                                <td>${idMarcaVehiculo}</td>
                                <td>${numPlacasVehiculo}</td>
                                <td>${numSerieVehiculo}</td>
                                <td>${idPolizaInvolucrado}</td>
                            </tr>`;
            tabla.innerHTML += template;

        });
}

function cambiarVentana() {
  let estatus = document.getElementById("estatus").textContent;
  if (estatus == "Dictaminado") {
      alert("Ya se encuentra dictaminado el reporte")
  } else {
      location.href = "../../HTML/Ajustador/DictaminarReporte.html";
  }
}

function regresar() {
  location.href = "../../HTML/Ajustador/ConsultarReportes.html";
}

window.onload = function(){
    mostrarDatosReporte()
    document.getElementById("dictaminar").onclick = cambiarVentana;
    document.getElementById("regresar").onclick = regresar;
};