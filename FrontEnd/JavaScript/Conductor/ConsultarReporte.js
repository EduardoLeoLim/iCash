function mostrarDatosPoliza() {
    recuperarDatosPoliza();
    recuperarDatosVehiculo();
    //recuperarImagenes();
    recuperarInvolucrados();
    recuperarDatosAjustador();
    recuperarDatosDictamen();
}

function recuperarDatosPoliza() {
    document.getElementById('nombrePoliza').innerHTML  = "Poliza seguro total";
    document.getElementById('fecha').innerHTML  = "23-11-2022";
    document.getElementById('ciudad').innerHTML  = "Xalapa";
    document.getElementById('latitud').innerHTML  = "51° 30’ 30’’ N";
    document.getElementById('longitud').innerHTML  = "0° 7’ 32’’ O";
}

function recuperarDatosVehiculo() {
    document.getElementById('numPlacas').innerHTML  = "KS7-Y1-J7";
    document.getElementById('numSerie').innerHTML  = "12837218739";
    document.getElementById('marca').innerHTML  = "Nissan";
    document.getElementById('modelo').innerHTML  = "All";
    document.getElementById('año').innerHTML  = "2020";
    document.getElementById('color').innerHTML  = "Verde";
}

function recuperarInvolucrados() {
    let nombre = "Pedro";
    let marca = "Nissan";
    let modelo = "All";
    let color = "Rojo";
    let numPlacas = "KS7-Y1-U2"

    let tabla = document.getElementById('involucrados');
    let template = `
                    <tr>
                        <td>${nombre}</td>
                        <td>${marca}</td>
                        <td>${modelo}</td>
                        <td>${color}</td>
                        <td>${numPlacas}</td>
                    </tr>`;
    tabla.innerHTML += template;
}

function recuperarDatosAjustador() {
    document.getElementById('nombreAjustador').innerHTML  = "Pedro";
    document.getElementById('apellidoPaternoAjustador').innerHTML  = "Hernandez";
    document.getElementById('apellidoMaternoAjustador').innerHTML  = "Martinez";
}

function recuperarDatosDictamen() {
    document.getElementById('estatusDictamen').innerHTML  = "Dictaminado";
    let folio = "JSDKL2192";
    let fecha = "23-11-2022";
    let descripcion = "En el presente dictamen se da por concluido que la poliza para el vehiculo no aplica"

    let tabla = document.getElementById('dictamen');
    let template = `
                    <tr>
                        <td>${folio}</td>
                        <td>${fecha}</td>
                        <td>${descripcion}</td>
                    </tr>`;
    tabla.innerHTML += template;
}

window.onload = function(){
    existenValoresStorage("../../HTML/Conductor/InicioSesion.html")
    mostrarDatosPoliza()
};