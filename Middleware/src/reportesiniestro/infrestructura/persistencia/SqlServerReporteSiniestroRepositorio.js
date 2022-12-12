import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { Request, TYPES } from "tedious";
import ReporteSiniestro from "../../dominio/ReporteSiniestro.js";

export default class SqlServerReporteSiniestroRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let reportesSiniestro = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "ReporteSiniestroDetalle",
        criteria
      );
      let { consulta, parameters } = criteriaParser.parse();

      console.log(consulta);

      let request = new Request(consulta, (error, rowCount) => {
        if (error) {
          console.log("Error ReporteSiniestroRepositorio: " + error);
          reject(new Error("Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(reportesSiniestro);
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
        let id = columnas.id.value;
        let nombre = columnas.nombre.value;
        let estatus = columnas.estatus.value;
        let fecha = columnas.fechaRegistro.value;
        let hora = columnas.horaAccidente.value;
        let conductor = columnas.nombreConductor.value
        let idMunicipio = columnas.idMunicipio.value;
        let apellidoPaterno = columnas.apellidoPaterno.value 
        let apellidoMaterno = columnas.apellidoMaterno.value;
        let idConductor = columnas.idConductor.value;
        let latitud = columnas.latitud.value;
        let longitud = columnas.longitud.value;
        let reporteSiniestro = new ReporteSiniestro(nombre, estatus, fecha, hora, idMunicipio, latitud, longitud, conductor, apellidoPaterno, apellidoMaterno, idConductor, id);
        reportesSiniestro.push(reporteSiniestro);
      });

      this.conexion.execSql(request);
    });

  registrar = (reporteSiniestro) =>
    new Promise((resolve, reject) => {
      let idReporteSiniestro;
      let consulta =
        "INSERT INTO ReporteSiniestro(nombre, estatus, fechaRegistro, horaAccidente, idMunicipio, latitud, longitud, idPoliza) " +
        "VALUES (@value1, @value2, @value3, @value4, @value5, @value6, @value7, @value8); " +
        "SELECT scope_indentity()";

      let request = new Request(consulta, (error) => {
        if (error) {
          console.log("Error ReporteSiniestroRepositorio: " + error);
          reject(
            new ApplicationError(
              500,
              "Error al registrar el reporte de siniestro vehicular."
            )
          );
        }
      });

      request.addParameter("value1", TYPES.VarChar, reporteSiniestro.nombre);
      request.addParameter("value2", TYPES.VarChar, reporteSiniestro.estatus);
      request.addParameter("value3", TYPES.Date, reporteSiniestro.fecha);
      request.addParameter("value4", TYPES.DateTime, reporteSiniestro.hora);
      request.addParameter("value5", TYPES.Int, reporteSiniestro.idMunicipio);
      request.addParameter("value6", TYPES.Float, reporteSiniestro.latitud);
      request.addParameter("value7", TYPES.Float, reporteSiniestro.longitud);
      request.addParameter("value8", TYPES.Int, reporteSiniestro.idPoliza);

      request.on("row", (columns) => {
        idReporteSiniestro = columns[0].value;
        console.log("vehículo registrado con id: %d", idVehiculo);
      });

      this.conexion.execSql(request);
    });

  actualizar = (reporteSiniestro) =>
    new Promise((resolve, reject) => {
      let consulta =
        "UPDATE ReporteSiniestro SET estatus = @value1, idDictamen = @value2, idEmpleado = @value3 WHERE id = @value4";

      let request = new Request(consulta, (error) => {
        if (error) {
          console.log("Error ReporteSiniestroRepositorio: " + error);
          reject(
            new ApplicationError(
              500,
              "Error al actualizar el reporte de siniestro vehicular."
            )
          );
        }
        resolve();
      });

      request.addParameter("value1", TYPES.VarChar, reporteSiniestro.estatus);
      request.addParameter("value2", TYPES.Int, reporteSiniestro.idDictamen);
      request.addParameter("value3", TYPES.Int, reporteSiniestro.idEmpleado);
      request.addParameter("value4", TYPES.Int, reporteSiniestro.id);

      this.conexion.execSql(request);
    });
}
