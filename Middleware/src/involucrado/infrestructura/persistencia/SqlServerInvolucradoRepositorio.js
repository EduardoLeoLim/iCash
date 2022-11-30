import { Request } from "tedious";
import { SqlExpressCriteriaParser } from "../../../compartido/infrestructura/utils/SqlExpressCriteriaParser.js";
import { Involucrado } from "../../dominio/Involucrado.js";

export class SqlServerInvolucradoRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let involucrados = [];

      let criteriaParser = new SqlExpressCriteriaParser(
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
          console.log(rowCount + " rows");
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
        for (var name in columnas) {
          involucrado[name] = columnas[name].value;
        }
        involucrados.push(involucrado);
      });

      request.on("error", (error) => reject(error));
      request.on("doneInProc", (rowCount, more, rows) => {
        resolve(involucrados);
      });

      this.conexion.execSql(request);
    });
}