import { Request } from "tedious";
import { SqlServerCriteriaParser } from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { Involucrado } from "../../dominio/Involucrado.js";

export class SqlServerInvolucradoRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let involucrados = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "Involucrado",
        criteria
      );

      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error InvolucradoRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(involucrados)
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
        let involucrado = new Involucrado();
        for (let name in columnas) {
          involucrado[name] = columnas[name].value;
        }
        involucrados.push(involucrado);
      });

      this.conexion.execSql(request);
    });
}
