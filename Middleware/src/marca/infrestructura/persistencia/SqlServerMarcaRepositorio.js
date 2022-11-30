import { Marca } from "../../dominio/Marca.js";

export class SqlExpressMarcaRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let marcas = [];

      let criteriaParser = new SqlExpressCriteriaParser([], "Marca", criteria);

      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error MarcaRepositorioRepositorio: " + err);
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
        let marca = new Marca();
        for (let name in columnas) {
          marca[name] = columnas[name].value;
        }
        marcas.push(marca);
      });

      request.on("error", (error) => reject(error));
      request.on("doneInProc", (rowCount, more, rows) => {
        resolve(marcas);
      });

      this.conexion.execSql(request);
    });
}
