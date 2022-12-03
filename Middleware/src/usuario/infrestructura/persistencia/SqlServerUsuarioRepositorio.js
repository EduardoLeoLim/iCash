import { Request, TYPES } from "tedious";
import { SqlServerCriteriaParser } from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import { Usuario } from "../../dominio/Usuario.js";

export class SqlServerUsuarioRepositorio {
  constructor(conexion) {
    this.conexion = conexion;
  }

  buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let usuarios = [];

      let criteriaParser = new SqlServerCriteriaParser([], "Usuario", criteria);

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
        let usuario = new Usuario();
        for (let name in columnas) {
          usuario[name] = columnas[name].value;
        }
        usuarios.push(usuario);
      });

      request.on("error", (error) => reject(error));
      request.on("doneInProc", (rowCount, more, rows) => {
        resolve(usuarios);
      });

      this.conexion.execSql(request);
    });

  registrar = (usuario) =>
    new Promise((resolve, reject) => {
      let idUsuario;
      let consulta =
        "INSERT INTO Usuario (nombre, apellidoPaterno, apellidoMaterno, nombreUsuario, claveAcceso) " +
        "values (@value1, @value2, @value3, @value4, @value5); " +
        "SELECT scope_identity();";

      let request = new Request(consulta, (err) => {
        if (err) {
          console.log("Error VehiculoRepositorio: " + err);
          reject(new Error("Error base de datos"));
        }
      });

      request.addParameter("value1", TYPES.VarChar, usuario.nombre);
      request.addParameter("value2", TYPES.VarChar, vehiculo.apellidoPaterno);
      request.addParameter("value3", TYPES.VarChar, vehiculo.apellidoMaterno);
      request.addParameter("value4", TYPES.VarChar, vehiculo.nombreUsuario);
      request.addParameter("value5", TYPES.VarChar, vehiculo.claveAcceso);

      //Se obtiene id del usuario al ajecutar 'SELECT scope_identity();'
      request.on("row", (columns) => {
        idUsuario = columns[0].value;
        console.log("Usuario registrado con id: %d", idUsuario);
      });

      request.on("error", (error) => reject(error));
      request.on("doneInProc", () => {
        resolve(idVehiculo);
      });

      this.conexion.execSql(request);
    });
}
