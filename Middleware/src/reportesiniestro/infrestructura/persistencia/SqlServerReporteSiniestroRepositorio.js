import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { Request, TYPES } from "tedious";
import ReporteSiniestro from "../../dominio/ReporteSiniestro.js";

export default class SqlServerReporteSiniestroRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let reportesSiniestro = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "ReporteSiniestroDetalle",
        criteria
      );
      let { consulta, parameters } = criteriaParser.parse();

      console.log(consulta);

      let request = new Request(consulta, (error, rowCount) => {
        if (error) {
          console.log("Error ReporteSiniestroRepositorio: " + error);
          reject(new Error("Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(reportesSiniestro);
        }
      });

      parameters.forEach((parameter) => {
        request.addParameter(
          parameter.get("param"),
          TYPES.VarChar,
          parameter.get("value")
        );
      });

      request.on("row", (columnas) => {
        console.log(columnas)
        let id = columnas.id.value;
        let nombre = columnas.nombre.value;
        let estatus = columnas.estatus.value;
        let fecha = columnas.fecha.value;
        let conductor = columnas.nombreConductor.value 
        let apellidoPaterno = columnas.apellidoPaterno.value 
        let apellidoMaterno = columnas.apellidoMaterno.value;
        let idConductor = columnas.idConductor.value;
        let latitud = columnas.latitud.value;
        let longitud = columnas.longitud.value;
        let reporteSiniestro = new ReporteSiniestro(nombre, estatus, fecha, latitud, longitud, conductor, apellidoPaterno, apellidoMaterno, idConductor, id);
        reportesSiniestro.push(reporteSiniestro);
      });

      this.conexion.execSql(request);
    });
}
