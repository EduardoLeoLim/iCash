
function dictaminarReporte (){
    if(comprobarValoresVacios()){
        const idReportesiniestro = sessionStorage.getItem("idReporteSiniestro");
        var descripcion = document.getElementById("txaDescripcion").value;
        var date = document.getElementById("inputDate").value;

        return new Promise(function(res, rej){
            axios.post(URL_BASE+'/ajustador/'+idReportesiniestro+'/dictaminar', {
                fecha: date,
                descripcion: descripcion,
                idReporteSiniestro: idReportesiniestro
              },{
                headers: {
                    'Authorization': sessionStorage.getItem("token")
                }
              })
              .then(function (response) {
                alert("Se dictaminó el reporte con exito")
                location.href = "../../HTML/Ajustador/VerDetallesReporte.html";
                res()
              })
              .catch(function (error) {
                alert("Error al dictaminar el reporte")
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
    existenValoresStorage("../../HTML/Ajustador/LoginAjustador.html")
    document.getElementById("btnDictaminar").onclick = dictaminarReporte;
};