
var involucrados = [];
var entidadesFederativas = [];
var municipios = [];
var polizas = [];
var marcas =  [];
var nombreInvolucrado
var marcaTxt
var modeloTxt
var colorTxt
var numPlacasTxt 
var añoAuto
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
var cbMarcas
var idConductor
var token
let municipio
let estado
let selectPoliza

function validaCheckbox()
{
  let checked = checkBoxDatosVehiculo.checked;
  marcaTxt.disabled = !checked
  modeloTxt.disabled = !checked
  colorTxt.disabled = !checked
  numPlacasTxt.disabled = !checked
  numSerieTxt.disabled = !checked
  añoAuto.disabled = !checked
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
            numSerieTxt.value.trim().length == 0 || añoAuto.value.trim().length == 0){

            return
        }
    }


    const involucrado = {
        nombre : nombreInvolucrado.value.trim()
    }  

    const vehiculo = {

    }


    if(checked){
        vehiculo.idMarca = parseInt(cbMarcas.value)
        vehiculo.modelo = modeloTxt.value.trim()
        vehiculo.numPlacas = numPlacasTxt.value.trim()
        vehiculo.color = colorTxt.value.trim()
        vehiculo.numSerie = numSerieTxt.value.trim()
        vehiculo.año = parseInt(añoAuto.value.trim())
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
        let nombreMarca = involucrado.vehiculo? marcas.find(marca => marca.id = involucrado.vehiculo.idMarca).nombre:""
        let modelo = involucrado.vehiculo? involucrado.vehiculo.modelo:""
        let color = involucrado.vehiculo? involucrado.vehiculo.color:""
        let numPlacas = involucrado.vehiculo? involucrado.vehiculo.numPlacas:""
        let numSerie = involucrado.vehiculo? involucrado.vehiculo.numSerie:""
        let año = involucrado.vehiculo? involucrado.vehiculo.año:""

        let template = `
                        <tr>
                            <td>${involucrado.nombre}</td>
                            <td>${nombreMarca}</td> 
                            <td>${modelo}</td>
                            <td>${color}</td>
                            <td>${numPlacas}</td>
                            <td>${numSerie}</td>
                            <td>${año}</td>

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
    añoAuto.value = ""
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


function cargarMarcas(){
    return new Promise(function(res, rej){
        axios.get(URL_BASE+'/marcas')
          .then(function (response) {
            res(response.data)
          })
          .catch(function (error) {
            rej(error)
          });
    })
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

function cargarPolisasCb (listaPolizas){

    selectPoliza = document.getElementById("polizaConductor");
    removeOptions(selectPoliza);
    let placeHolder = document.createElement("option");
    placeHolder.textContent = "Selecciona una poliza"
    placeHolder.value = null

    selectPoliza.appendChild(placeHolder);

    for(let i = 0; i < listaPolizas.length; i++) {
        let opt = listaPolizas[i];
        let el = document.createElement("option");
        el.textContent = opt.nombre;
        el.value = opt.id;
        selectPoliza.appendChild(el);
    }
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


function cargarMunicipiosCb (municipios){

    municipio = document.getElementById("cbMunicipio");
    removeOptions(municipio);
    let placeHolder = document.createElement("option");
    placeHolder.textContent = "Selecciona un municipio"
    placeHolder.value = null


    municipio.appendChild(placeHolder);

    for(let i = 0; i < municipios.length; i++) {
        let opt = municipios[i];
        let el = document.createElement("option");
        el.textContent = opt.nombre;
        el.value = opt.clave;
        municipio.appendChild(el);
    }
}

function cargarMarcasCb (marcas){
    cbMarcas = document.getElementById("cbMarcaInvolucrado");
    removeOptions(cbMarcas);
    let placeHolder = document.createElement("option");
    placeHolder.textContent = "Selecciona una marca"
    placeHolder.value = null

    cbMarcas.appendChild(placeHolder);

    for(let i = 0; i < marcas.length; i++) {
        let opt = marcas[i];
        let el = document.createElement("option");
        el.textContent = opt.nombre;
        el.value = opt.id;
        cbMarcas.appendChild(el);
    }
}

function filtrarMunicipios(){
    estado = document.getElementById("cbEntidadFederativa");
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

function removeOptions(selectElement) {
    var i, L = selectElement.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectElement.remove(i);
    }
 }

function buttonregistrar (even){
tituloTxt
    const inputF = document.getElementById("imagenesIn")
    const archivos = inputF.files

    even.preventDefault()
    const horaAcciedente = document.getElementById("horaAccidente").value;
    const formData = new FormData();

    formData.append("nombre", tituloTxt.value  )
    formData.append("horaAccidente", horaAcciedente)
    formData.append("claveMunicipio", municipio.value)
    formData.append("claveEntidadFederativa", estado.value)
    formData.append("latitud", latitudTxt.value)
    formData.append("longitud", longitudTxt.value)
    formData.append("idPoliza",selectPoliza.value )
    formData.append("idConductor", idConductor)
    formData.append("involucrados", JSON.stringify(involucrados))
   
    
    for (let index = 0; index < archivos.length; index++) {
        formData.append("imagen" + (index + 1), archivos[index])
    }
   
    axios.post(URL_BASE+"/conductores/reportesSiniestro", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': token
        }
    }).then((resultado) => {
        alert("Reporte registrado")
        location.reload()
    }).catch((error) => {
        console.log(error)
        alert("Erro no se puedo registrar")
    })
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
    añoAuto = document.getElementById("añoInvolucrado") 
    tabla = document.getElementById("tableInvolucrado")
    btnAgregar = document.getElementById("btnAgregarInvolucrado")
    btnAgregar.onclick = agregarInvolucrado
    checkBoxDatosVehiculo = document.getElementById("chbDatosVehiculo")
    checkBoxDatosVehiculo.addEventListener("change", validaCheckbox, false);
    btnRemover = document.getElementById("btnRemoverInvolucrados")
    btnRemover.onclick = removerInvolucrados

    token = sessionStorage.getItem("token")
    tituloTxt = document.getElementById("tituloReporteText")

    latitudTxt = document.getElementById("latitudText")
    longitudTxt = document.getElementById("longitudText")

    btnUbicacion = document.getElementById("btnCalcularUbicacion")
    btnUbicacion.onclick = calcularUbicacion


    btnRegistrar = document.getElementById("btnRegistrar")
    btnRegistrar.onclick = buttonregistrar


    marcaTxt.disabled = true
    modeloTxt.disabled = true
    colorTxt.disabled = true
    numPlacasTxt.disabled = true
    numSerieTxt.disabled = true
    checkBoxDatosVehiculo.checked = false
    añoAuto.disabled = true

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

    cargarMarcas().then(listamarcas => {
        marcas = listamarcas
        cargarMarcasCb(marcas)
    } ).catch ((err)=> 
        alert("error al cargar marcas")
    )
}