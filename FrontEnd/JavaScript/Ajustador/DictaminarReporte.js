
function dictaminarReporte (){
    if(comprobarValoresVacios()){
        alert("Paso");
    }
}

function comprobarValoresVacios(){
    var descripcion = document.getElementById("txaDescripcion").value;
    var date = document.getElementById("inputDate").value;

    if(descripcion != "" && date != "" ){
        return true;
    }else{
        alert("Campos vacios")
        return false;
    }
}

window.onload = function(){
    //Descomentar linea 43 cuando se tenga login Ajustador
    //existenValoresStorage("../../HTML/Conductor/InicioSesion.html")
    document.getElementById("btnDictaminar").onclick = dictaminarReporte;
};