import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import SqlServerDictamenRepositorio from "../persistencia/SqlServerDictamenRepositorio.js";
import RegistrarDictamen from "../../aplicacion/RegistrarDictamen.js";
import SqlServerReporteSiniestroRepositorio from "../../../reportesiniestro/infrestructura/persistencia/SqlServerReporteSiniestroRepositorio.js"
import ActualizarReporteComoDictaminado from "../../../reportesiniestro/aplicacion/ActualizarComoDictaminado.js";
import ConsultarReporteSiniestroPorId from "../../../reportesiniestro/aplicacion/ConsultarReporteSiniestroPorId.js";

export default function registrarDictamenReporteController(req, res) {

    const descripcion = req.body.descripcion;
    const fecha = req.body.fecha;
    const idReporteSiniestro = req.params.idReporteSiniestro;

  let conexion = new Connection(Config);


  conexion.connect((error) => {
    if (error) {
      console.log("Error: ", error);
      res.status(500).json();
      return;
    }

    let reporteDictamenRepositorio = new SqlServerDictamenRepositorio(conexion);

    let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(conexion);

    let consultarReporteSiniestroPorId = new ConsultarReporteSiniestroPorId(reporteSiniestroRepositorio);

    let actualizarReporteComoDictaminado = new ActualizarReporteComoDictaminado(reporteSiniestroRepositorio);

    let registrarDictamen = new RegistrarDictamen(reporteDictamenRepositorio);

    //Comprobar reporte siniestro
    consultarReporteSiniestroPorId.run(idReporteSiniestro).then((reporteSiniestro) => {
      if (reporteSiniestro.estatus === "Dictaminado")
        return res.status(400).json({ error: "El reporte ya ha sido dictaminado" });

      //Registrar dictamen
      conexion.beginTransaction(error =>{
        if(error){
          res.status(500).json("Error al conectarse a ka bd");
        }else{
          registrarDictamen.run(
            fecha,
            descripcion,
            idReporteSiniestro
          ).then((idDictamen) =>{
            actualizarReporteComoDictaminado.run(idDictamen,idReporteSiniestro).then(() => {
              conexion.commitTransaction(error =>{
                if(error){
                  res.status(500).json("Error al guardar");
                }else{
                  res.status(201).json("Registro correcto");
                }
              }).catch((error ) => {
                res.status(500).json(error);
              })
            })
          }).catch((error ) => {
            res.status(500).json(error);
          }).finally(() => {
            conexion.close();
          });
        }
      })
    }).catch((error) => {
      res.status(error.status).json(error);
    })


  });
}
