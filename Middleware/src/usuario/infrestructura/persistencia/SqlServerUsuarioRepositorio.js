import { Request, TYPES } from "tedious";
import SqlServerCriteriaParser from "../../../compartido/infrestructura/utils/SqlServerCriteriaParser.js";
import Usuario from "../../dominio/Usuario.js";

export default class SqlServerUsuarioRepositorio {
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
          console.log(rowCount + " filas");
          resolve(usuarios);
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

      this.conexion.execSql(request);
    });

  registrar = (usuario) =>
    new Promise((resolve, reject) => {
      let idUsuario;
      let consulta =
        "INSERT INTO Usuario (nombre, apellidoPaterno, apellidoMaterno, nombreUsuario, claveAcceso) " +
        "values (@value1, @value2, @value3, @value4, @value5); " +
        "SELECT scope_identity();";

      let request = new Request(consulta, (error) => {
        if (error) {
          console.log("Error VehiculoRepositorio: " + err);
          reject(new Error("Error base de datos"));
        } else {
          resolve(idUsuario);
        }
      });

      request.addParameter("value1", TYPES.VarChar, usuario.nombre);
      request.addParameter("value2", TYPES.VarChar, usuario.apellidoPaterno);
      request.addParameter("value3", TYPES.VarChar, usuario.apellidoMaterno);
      request.addParameter("value4", TYPES.VarChar, usuario.nombreUsuario);
      request.addParameter("value5", TYPES.VarChar, usuario.claveAcceso);

      //Se obtiene id del usuario al ajecutar 'SELECT scope_identity();'
      request.on("row", (columns) => {
        idUsuario = columns[0].value;
        console.log("Usuario registrado con id: %d", idUsuario);
      });

      this.conexion.execSql(request);
    });
}
