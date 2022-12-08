
function regresar() {
    location.href = "../../HTML/Conductor/ConsultarPolizas.html";
}

function mostrarDatosPoliza() {
    recuperarDatosPoliza();
    recuperarDatosVehiculo();
}

function recuperarDatosPoliza() {
    document.getElementById('nombrePoliza').innerHTML  = "Poliza seguro total";
    document.getElementById('precioFinal').innerHTML  = "$10200";
    document.getElementById('nombreCobertura').innerHTML  = "Cobertura total vehicular";
    document.getElementById('precioCobertura').innerHTML  = "$5800";
    document.getElementById('tipoCobertura').innerHTML  = "Vehicular";
    document.getElementById('duracionPlazo').innerHTML  = "2 años";
    document.getElementById('nombrePlazo').innerHTML  = "Anual";
    document.getElementById('precioPlazo').innerHTML  = "$2200";
}

function recuperarDatosVehiculo() {
    document.getElementById('numPlacas').innerHTML  = "KS7-Y1-J7";
    document.getElementById('numSerie').innerHTML  = "12837218739";
    document.getElementById('marcaVehiculo').innerHTML  = "Nissan";
    document.getElementById('modeloVehiculo').innerHTML  = "All";
    document.getElementById('anioVehiculo').innerHTML  = "2020";
    document.getElementById('colorVehiculo').innerHTML  = "Verde";
}

window.onload = function(){
    existenValoresStorage("../../HTML/Conductor/InicioSesion.html")
    mostrarDatosPoliza();
};

