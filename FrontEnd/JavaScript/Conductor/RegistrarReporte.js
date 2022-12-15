
var involucrados = [];

var entidadesFederativas = [];
var municipios = [];

var polizas = [];

var marcas =  [{id:1},{id:2},{id:3}];

var nombreInvolucrado
var marcaTxt
var modeloTxt
var colorTxt
var numPlacasTxt 
var checkBoxDatosVehiculo
var btnAgregar
var numSerieTxt
var btnRemover
var tabla
var latitud 
var longitud
var latitudTxt
var longitudTxt
var tituloTxt

var idConductor

function validaCheckbox()
{
  let checked = checkBoxDatosVehiculo.checked;
  marcaTxt.disabled = !checked
  modeloTxt.disabled = !checked
  colorTxt.disabled = !checked
  numPlacasTxt.disabled = !checked
  numSerieTxt.disabled = !checked
}


function agregarInvolucrado (even){

    even.preventDefault()

    if(nombreInvolucrado.value.trim().length == 0 ){
        alert("Nombre involucrado esta vacio")
        return
    }

    let checked = checkBoxDatosVehiculo.checked;

    if(checked){
        if(marcaTxt.value.trim().length == 0 || modeloTxt.value.trim().length == 0 || 
            colorTxt.value.trim().length == 0 || numPlacasTxt.value.trim().length == 0 ||
            numSerieTxt.value.trim().length == 0 ){

            return
        }
    }


    const involucrado = {
        nombre : nombreInvolucrado.value.trim()
    }  

    const vehiculo = {

    }


    if(checked){

        vehiculo.idMarca = marcas[marcaTxt.value].id
        vehiculo.modelo = modeloTxt.value.trim()
        vehiculo.numPlacas = numPlacasTxt.value.trim()
        vehiculo.color = colorTxt.value.trim()
        vehiculo.numSerie = numSerieTxt.value.trim()
        involucrado.vehiculo = vehiculo 
    }
    involucrados.push(involucrado)
    recargarTabla()
}


function recargarTabla(){
    limpiarCampos()
    var tableHeaderRowCount = 1;
    var rowCount = tabla.rows.length;
    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        tabla.deleteRow(tableHeaderRowCount);
    }



    involucrados.forEach(involucrado => {
        alert(involucrado.nombre)
        let template = `
                        <tr>
                            <td>${involucrado.nombre}</td>
                            <td>${involucrado.vehiculo.idMarca}</td> 
                            <td>${involucrado.vehiculo.modelo}</td>
                            <td>${involucrado.vehiculo.color}</td>
                            <td>${involucrado.vehiculo.numPlacas}</td>
                            <td>${involucrado.vehiculo.numSerie}</td>
                        </tr>`;
        tabla.innerHTML += template;
    })
} 

function removerInvolucrados (even){
    even.preventDefault()
    involucrados = []
    recargarTabla()
}

function limpiarCampos(){
    nombreInvolucrado.value = ""
    marcaTxt.value = ""
    modeloTxt.value = ""
    colorTxt.value = ""
    numPlacasTxt.value = ""
    numSerieTxt.value = ""
}

function calcularUbicacion (even){
    even.preventDefault()
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    navigator.geolocation.getCurrentPosition(accesoUbicacionPermitido, accesoUbicacionDenegado, options);
}

function accesoUbicacionPermitido(posicion){
    const cordenadas = posicion.coords
    latitud = cordenadas.latitude
    longitud = cordenadas.longitude
    latitudTxt.value = latitud
    longitudTxt.value = longitud
}

function accesoUbicacionDenegado( err){
    alert("Debes permitir acceso a la ubicacion")
}


function cargarPolisas(idConductor){
    return new Promise(function(res, rej){
        axios.get(URL_BASE+'/conductores/'+idConductor+"/polizas")
          .then(function (response) {
            res(response.data)
          })
          .catch(function (error) {
            rej(error)
          });
    })
}

function cargarPolisasCb (listaPolizas){

    let select = document.getElementById("polizaConductor");
    removeOptions(select);
    let placeHolder = document.createElement("option");
    placeHolder.textContent = "Selecciona una poliza"
    placeHolder.value = null

    select.appendChild(placeHolder);

    for(let i = 0; i < listaPolizas.length; i++) {
        let opt = listaPolizas[i];
        let el = document.createElement("option");
        el.textContent = opt.nombre;
        el.value = opt;
        select.appendChild(el);
    }
}

function cargarComboBoxMunicipicios(claveEntidadFederativa){
    return new Promise(function(res, rej){
        axios.get(URL_BASE+'/entidadesfederativas/'+claveEntidadFederativa+"/municipios")
          .then(function (response) {
            res(response.data)
          })
          .catch(function (error) {
            rej(error)
          });
    })
}


function cargarEntidadesFederativas(){
    return new Promise(function(res, rej){
        axios.get(URL_BASE+'/entidadesfederativas')
          .then(function (response) {
            res(response.data)
          })
          .catch(function (error) {
            rej(error)
          });
    })
}


function cargarEntidadesFederativasCb (entidadesFederativas){

    let select = document.getElementById("cbEntidadFederativa");
    let placeHolder = document.createElement("option");
    removeOptions(select);
    placeHolder.textContent = "Selecciona un estado"
    placeHolder.value = null

    select.appendChild(placeHolder);

    for(let i = 0; i < entidadesFederativas.length; i++) {
        let opt = entidadesFederativas[i];
        let el = document.createElement("option");
        el.textContent = opt.nombre;
        el.value = opt.clave;
        select.appendChild(el);
    }

    select.onchange = filtrarMunicipios
}

function filtrarMunicipios(){
    let estado = document.getElementById("cbEntidadFederativa");
    let clave = estado.value

    if(clave && clave != null ){
        cargarComboBoxMunicipicios(clave).then (municipios =>{
            cargarMunicipiosCb(municipios)
        }).catch ((err)=>{
            console.log(err)
            alert("error al cargar municipios")
        })
    }
}

function cargarMunicipiosCb (municipios){

    let select = document.getElementById("cbMunicipio");
    removeOptions(select);
    let placeHolder = document.createElement("option");
    placeHolder.textContent = "Selecciona un municipio"
    placeHolder.value = null


    select.appendChild(placeHolder);

    for(let i = 0; i < municipios.length; i++) {
        let opt = municipios[i];
        let el = document.createElement("option");
        el.textContent = opt.nombre;
        el.value = opt;
        select.appendChild(el);
    }
}

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

    

window.onload = function(){

    existenValoresStorage("../../HTML/Conductor/InicioSesion.html")
    idConductor = sessionStorage.getItem("idConductor")

    nombreInvolucrado = document.getElementById("nombreInvolucrado")
    marcaTxt = document.getElementById("cbMarcaInvolucrado")
    modeloTxt = document.getElementById("modeloInvolucrado")
    colorTxt = document.getElementById("colorInvolucrado")
    numPlacasTxt = document.getElementById("numPlacasInvolucrado")
    numSerieTxt = document.getElementById("numSerieInvolucrado")
    tabla = document.getElementById("tableInvolucrado")
    btnAgregar = document.getElementById("btnAgregarInvolucrado")
    btnAgregar.onclick = agregarInvolucrado
    checkBoxDatosVehiculo = document.getElementById("chbDatosVehiculo")
    checkBoxDatosVehiculo.addEventListener("change", validaCheckbox, false);
    btnRemover = document.getElementById("btnRemoverInvolucrados")
    btnRemover.onclick = removerInvolucrados

    tituloTxt = document.getElementById("tituloReporteText")

    latitudTxt = document.getElementById("latitudText")
    longitudTxt = document.getElementById("longitudText")

    btnUbicacion = document.getElementById("btnCalcularUbicacion")
    btnUbicacion.onclick = calcularUbicacion


    marcaTxt.disabled = true
    modeloTxt.disabled = true
    colorTxt.disabled = true
    numPlacasTxt.disabled = true
    numSerieTxt.disabled = true
    checkBoxDatosVehiculo.checked = false


    cargarEntidadesFederativas().then(listaEntidadesFederativas => {
        entidadesFederativas = listaEntidadesFederativas
        cargarEntidadesFederativasCb(entidadesFederativas)
    } ).catch ((err)=> 
        alert("error al cargar entidades federativas")
    )

    cargarPolisas(idConductor).then(listaPolizas => {
        polizas = listaPolizas
        cargarPolisasCb(polizas)
    } ).catch ((err)=> 
        alert("error al cargar polizas")
    )
}