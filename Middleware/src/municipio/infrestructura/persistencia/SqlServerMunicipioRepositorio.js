import { Request, TYPES } from "tedious";
import { SqlExpressCriteriaParser } from "../../../compartido/infrestructura/utils/SqlExpressCriteriaParser.js";
import { Municipio } from "../../dominio/Municipio.js";

export class SqlServerMunicipioRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let municipios = [];

      let criteriaParser = new SqlExpressCriteriaParser(
        [],
        "Municipio",
        criteria
      );
      let { consulta, parameters } = criteriaParser.parse();

      console.log(consulta);

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log(err);
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
        let municipio = new Municipio();
        for (var name in columnas) {
          municipio[name] = columnas[name].value;
        }
        municipios.push(municipio);
      });

      request.on("error", (error) => reject(error));
      request.on("doneInProc", (rowCount, more, rows) => {
        resolve(coberturas);
      });

      this.conexion.execSql(request);
    });
}
