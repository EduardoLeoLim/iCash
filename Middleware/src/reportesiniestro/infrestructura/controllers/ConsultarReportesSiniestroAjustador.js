import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import SqlServerReporteSiniestroRepositorio from "../persistencia/SqlServerReporteSiniestroRepositorio.js";
import ConsultarReportesSiniestroPorAsignacion from "../../aplicacion/ConsultarReportesSiniestroPorAsignacion.js";

export function consultarReportesSiniestroAjustador(req, res) {
  const idEmpleado = req.params["idEmpleado"];
  let conexion = new Connection(Config);

  conexion.connect((error) => {
    if (error) {
      console.log("Error: ", error);
      res.status(500).json();
      return;
    }

    let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(
      conexion
    );
    let consultarReportesAjustador =
      new ConsultarReportesSiniestroPorAsignacion(reporteSiniestroRepositorio);

    consultarReportesAjustador
      .run(idEmpleado)
      .then((reportes) => {
        res.status(200).json(reportes);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      })
      .finally(() => {
        conexion.close();
      });
  });
}
