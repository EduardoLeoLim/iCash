import { Request, TYPES } from "tedious";
import { SqlExpressCriteriaParser } from "../../../compartido/infrestructura/utils/SqlExpressCriteriaParser.js";
import { EntidadFederativa } from "../../dominio/EntidadFederativa.js";

export class SqlServerEntidadFederativaRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let entidadesFederativas = [];

      let criteriaParser = new SqlExpressCriteriaParser(
        [],
        "EntidadFederativa",
        criteria
      );
      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error EntidadFederativaRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          console.log(rowCount + " rows");
        }
      });

      parameters.forEach((parametro) => {
        request.addParameter(
          parametro.get("param"),
          TYPES.VarChar,
          parametro.get("value")
        );
      });

      request.on("row", (columnas) => {
        let entidadFederativa = new EntidadFederativa();
        for (var name in columnas) {
          entidadFederativa[name] = columnas[name].value;
        }
        entidadesFederativas.push(entidadFederativa);
      });

      request.on("error", (error) => reject(error));
      request.on("doneInProc", (rowCount, more, rows) => {
        resolve(entidadesFederativas);
      });

      this.conexion.execSql(request);
    });
}
