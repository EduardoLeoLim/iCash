import { Request, TYPES } from "tedious";
import ApplicationError from "../../../compartido/aplicacion/excepciones/ApplicationError.js";
import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import Cobertura from "../../dominio/Cobertura.js";

export default class SqlServerCoberturaRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let coberturas = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "Cobertura",
        criteria
      );
      let { consulta, parameters } = criteriaParser.parse();

      console.log(consulta);

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error CoberturaRepositorio: " + err);
          reject(new ApplicationError(500, "Error base de datos"));
        } else {
          console.log(rowCount + " rows");
          resolve(coberturas);
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
        let cobertura = new Cobertura();
        for (var name in columnas) {
          cobertura[name] = columnas[name].value;
        }
        coberturas.push(cobertura);
      });

      
      this.conexion.execSql(request);
    });
}
