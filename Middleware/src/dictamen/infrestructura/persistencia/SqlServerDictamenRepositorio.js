import { Request, TYPES } from "tedious";
import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import Dictamen from "../../dominio/Dictamen.js";

export default class SqlServerDictamenRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let dictamenes = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "Dictamen",
        criteria
      );

      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error UsuarioRepositorio: " + err);
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
        let dictamen = new Dictamen();
        for (let name in columnas) {
          dictamen[name] = columnas[name].value;
        }
        dictamenes.push(dictamen);
      });

      request.on("error", (error) => reject(error));
      request.on("doneInProc", (rowCount, more, rows) => {
        resolve(usuarios);
      });

      this.conexion.execSql(request);
    });

  registrar = (dictamen) =>
    new Promise((resolve, reject) => {
      let idDictamen;
      let consulta =
        "INSERT INTO Dictamen (fecha, descripcion) " +
        "VALUES (@value1, @value2); " +
        "SELECT scope_identity() as id;";

      let request = new Request(consulta, (err) => {
        if (err) {
          console.log("Error dictamen: " + err);
          reject(new Error("Error base de datos"));
        } else {
          resolve(idDictamen);
        }
      });
      TYPES.VarChar, dictamen.descripcion;
      request.addParameter("value1", TYPES.DateTime, dictamen.fecha);
      request.addParameter("value2", TYPES.VarChar, dictamen.descripcion);

      request.on("row", (columns) => {
        idDictamen = columns.id.value;
        console.log("Usuario registrado con id: %d", idDictamen);
      });

      this.conexion.execSql(request);
    });
}
