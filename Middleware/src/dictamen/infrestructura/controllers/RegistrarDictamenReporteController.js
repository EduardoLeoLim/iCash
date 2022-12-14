import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import SqlServerDictamenRepositorio from "../persistencia/SqlServerDictamenRepositorio.js";
import RegistrarDictamen from "../../aplicacion/RegistrarDictamen.js";
import SqlServerReporteSiniestroRepositorio from "../../../reportesiniestro/infrestructura/persistencia/SqlServerReporteSiniestroRepositorio.js";
import ActualizarReporteSiniestroComoDictaminado from "../../../reportesiniestro/aplicacion/ActualizarReporteSiniestroComoDictaminado.js";
import ConsultarReporteSiniestroPorId from "../../../reportesiniestro/aplicacion/ConsultarReporteSiniestroPorId.js";
import ApplicationError from "../../../compartido/aplicacion/excepciones/ApplicationError.js";

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

    let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(
      conexion
    );

    let consultarReporteSiniestroPorId = new ConsultarReporteSiniestroPorId(
      reporteSiniestroRepositorio
    );

    let actualizarReporteComoDictaminado =
      new ActualizarReporteSiniestroComoDictaminado(
        reporteSiniestroRepositorio
      );

    let registrarDictamen = new RegistrarDictamen(reporteDictamenRepositorio);

    conexion.beginTransaction((error) => {
      if (error) {
        console.log("Error: ", error);
        res.status(500).json();
        return;
      }

      //Comprobar reporte siniestro
      consultarReporteSiniestroPorId
        .run(idReporteSiniestro)
        .then((reporteSiniestro) => {
          if (reporteSiniestro.estatus === "Dictaminado")
            throw new ApplicationError(
              400,
              "El reporte ya ha sido dictaminado"
            );
          return registrarDictamen.run(fecha, descripcion, idReporteSiniestro);
        })
        .then((idDictamen) => {
          return actualizarReporteComoDictaminado.run(
            idDictamen,
            idReporteSiniestro
          );
        })
        .then(() => {
          conexion.commitTransaction((error) => {
            if (error)
              throw new ApplicationError(500, "Error al registrar el dictamen");
            res.status(201).json("Dictamen registrado");
          });
        })
        .catch((error) => {
          res.status(error.status).json(error);
        })
        .finally(() => {
          conexion.close();
        });
    });
  });
}
