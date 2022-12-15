import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { Request, TYPES } from "tedious";
import ApplicationError from "../../../compartido/aplicacion/excepciones/ApplicationError.js";
import Conductor from "../../dominio/Conductor.js";

export default class SqlServerConductorRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let conductores = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "Conductor",
        criteria
      );

      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error ConductorRepositorioRepositorio: " + err);
          reject(new ApplicationError(500, "Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(conductores);
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
        let numLicencia = columnas.numLicencia.value;
        let correo = columnas.correo.value;
        let id = columnas.id.value;

        let conductor = new Conductor(correo, numLicencia, id);
        conductores.push(conductor);
      });

      this.conexion.execSql(request);
    });
}
