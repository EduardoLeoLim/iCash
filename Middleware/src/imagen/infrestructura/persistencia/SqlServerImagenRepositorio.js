import { Request, TYPES } from "tedious";
import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import Imagen from "./../../dominio/Imagen.js";

export default class SqlServerImagenRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let imagenes = [];

      let criteriaParser = new SqlServerCriteriaParser([], "Imagen", criteria);
      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error ImagenRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(imagenes);
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
        let id = columnas.id.value;
        let idReporteSiniestro = columnas.idReporteSiniestro.value;
        let urlImagen = columnas.urlImagen.value;

        let imagen = new Imagen(idReporteSiniestro, urlImagen, id);

        imagenes.push(imagen);
      });

      this.conexion.execSql(request);
    });

  registrar = (imagen) =>
    new Promise((resolve, reject) => {
      let consulta =
        "INSERT INTO Imagen (idReporteSiniestro, urlImagen) VALUES (@idReporteSiniestro, @urlImagen)";

      let request = new Request(consulta, (err) => {
        if (err) {
          console.log("Error ImagenRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          resolve(imagen.urlImagen);
        }
      });

      request.addParameter(
        "idReporteSiniestro",
        TYPES.VarChar,
        imagen.idReporteSiniestro
      );
      request.addParameter("urlImagen", TYPES.VarChar, imagen.urlImagen);

      this.conexion.execSql(request);
    });
}
