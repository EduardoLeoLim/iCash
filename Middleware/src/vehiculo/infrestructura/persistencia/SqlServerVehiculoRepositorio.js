import { TYPES } from "tedious";
import { SqlServerCriteriaParser } from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { Vehiculo } from "../../dominio/Vehiculo.js";

export class SqlServerVehiculoRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let vehiculos = [];

      let criteriaParser = new SqlServerCriteriaParser(
        [],
        "Vehiculo",
        criteria
      );

      let { consulta, parameters } = criteriaParser.parse();

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error VehiculoRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(vehiculos);
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
        let vehiculo = new Vehiculo();
        for (let name in columnas) {
          vehiculo[name] = columnas[name].value;
        }
        vehiculos.push(vehiculo);
      });

      this.conexion.execSql(request);
    });

  registrar = (vehiculo) =>
    new Promise((resolve, reject) => {
      let idVehiculo;
      let consulta =
        "INSERT INTO Vehiculo (año, color, idMarca, modelo, numPlacas, numSerie, idPoliza) " +
        "VALUES (@value1, @value2, @value3, @value4, @value5, @value6, @value7); " +
        "SELECT scope_identity();";

      let request = new Request(consulta, (err) => {
        if (err) {
          console.log("Error VehiculoRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          resolve(idVehiculo);
        }
      });

      request.addParameter("value1", TYPES.Int, vehiculo.año);
      request.addParameter("value2", TYPES.VarChar, vehiculo.color);
      request.addParameter("value3", TYPES.Int, vehiculo.idMarca);
      request.addParameter("value4", TYPES.VarChar, vehiculo.modelo);
      request.addParameter("value5", TYPES.VarChar, vehiculo.numPlacas);
      request.addParameter("value6", TYPES.VarChar, vehiculo.numSerie);
      request.addParameter("value7", TYPES.Int, vehiculo.idPoliza);

      request.on("row", (columns) => {
        idVehiculo = columns[0].value;
        console.log("vehículo registrado con id: %d", idVehiculo);
      });

      this.conexion.execSql(request);
    });
}
