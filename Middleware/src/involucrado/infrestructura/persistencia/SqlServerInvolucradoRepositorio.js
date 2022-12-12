import { Request, TYPES } from "tedious";
import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import Involucrado from "../../dominio/Involucrado.js";
import ApplicationError from "../../../compartido/aplicacion/excepciones/ApplicationError.js";

export default class SqlServerInvolucradoRepositorio {
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
          reject(new ApplicationError(500, "Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(involucrados);
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

  registrar = (involucrado) =>
    new Promise((resolve, reject) => {
      let idInvolucrado;
      let consulta =
        "INSERT INTO Involucrado (nombre, idReporteSiniestro, idVehiculo) " +
        "VALUES (@value1, @value2, @value3);" +
        "SELECT scope_identity();";

      let request = new Request(consulta, (err) => {
        if (err) {
          console.log("Error InvolucradoRepositorio: " + err);
          reject(new ApplicationError(500, "Error base de datos"));
        } else {
          resolve(idInvolucrado);
        }
      });

      request.addParameter("value1", TYPES.VarChar, involucrado.nombre);
      request.addParameter("value2", TYPES.Int, involucrado.idReporteSiniestro);
      request.addParameter("value3", TYPES.Int, involucrado.idVehiculo);

      request.on("row", (columnas) => {
        idInvolucrado = columnas[0].value;
      });

      this.conexion.execSql(request);
    });
}
