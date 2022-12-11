
function dictaminarReporte (){
    if(comprobarValoresVacios()){
        //se quita cuando blas acabe
        sessionStorage.setItem("idReporteSiniestro",2);
        const idReportesiniestro = sessionStorage.getItem("idReporteSiniestro");
        var descripcion = document.getElementById("txaDescripcion").value;
        var date = document.getElementById("inputDate").value;

        return new Promise(function(res, rej){
            axios.post(URL_BASE+'/ajustador/'+idReportesiniestro+'/dictaminar', {
                fecha: date,
                descripcion: descripcion,
                idReporteSiniestro: idReportesiniestro
              })
              .then(function (response) {
                res()
              })
              .catch(function (error) {
                rej(error)
              });
        })
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
    existenValoresStorage("../../HTML/Ajustador/LoginAjustador.html")
    document.getElementById("btnDictaminar").onclick = dictaminarReporte;
};