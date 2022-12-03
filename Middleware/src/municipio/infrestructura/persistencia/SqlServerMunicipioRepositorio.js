import { Request, TYPES } from "tedious";
import { SqlServerCriteriaParser } from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { Municipio } from "../../dominio/Municipio.js";

export class SqlServerMunicipioRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let municipios = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "Municipio",
        criteria
      );
      let { consulta, parameters } = criteriaParser.parse();

      console.log(consulta);

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          reject(err.message);
        } else {
          console.log(rowCount + " rows");
          resolve(municipios);
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

      this.conexion.execSql(request);
    });
}
