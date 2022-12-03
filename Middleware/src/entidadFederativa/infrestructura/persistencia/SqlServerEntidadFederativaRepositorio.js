import { Request, TYPES } from "tedious";
import { SqlServerCriteriaParser } from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { EntidadFederativa } from "../../dominio/EntidadFederativa.js";

export class SqlServerEntidadFederativaRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let entidadesFederativas = [];

      let criteriaParser = new SqlServerCriteriaParser(
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
          resolve(entidadesFederativas);
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

      this.conexion.execSql(request);
    });
}
