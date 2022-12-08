import { Marca } from "../../dominio/Marca.js";
import { TYPES, Request } from "tedious";
import { SqlServerCriteriaParser } from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";

export class SqlExpressMarcaRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let marcas = [];

      let criteriaParser = new SqlServerCriteriaParser([], "Marca", criteria);

      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error MarcaRepositorioRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(marcas);
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
        let marca = new Marca();
        for (let name in columnas) {
          marca[name] = columnas[name].value;
        }
        marcas.push(marca);
      });

      this.conexion.execSql(request);
    });
}
