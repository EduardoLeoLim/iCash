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
        let reporteSiniestro = new ReporteSiniestro();
        for (let name in columnas) {
          reporteSiniestro[name] = columnas[name].value;
        }
        reportesSiniestro.push(reporteSiniestro);
      });

      this.conexion.execSql(request);
    });
}
