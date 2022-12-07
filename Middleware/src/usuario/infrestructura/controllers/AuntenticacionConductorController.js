import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import { generarToken } from "../../../compartido/infrestructura/utils/Token.js";
import { Auntenticacion } from "../../aplicacion/Auntenticacion.js";
import { SqlServerUsuarioRepositorio } from "../persistencia/SqlServerUsuarioRepositorio.js";


export function auntenticacionConductorController(req, res) {
  const nombreUsuario = req.body.nombreUsuario;
  const claveAcceso = req.body.claveAcceso;

  let conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json();
      return;
    }

    let usuariosRepositorio =
        new SqlServerUsuarioRepositorio(conexion);
    let auntenticacion = new Auntenticacion(
        usuariosRepositorio
    );

    auntenticacion
        .auntenticacionConductor(nombreUsuario, claveAcceso)
        .then((usuario) => {
            const token = generarToken(usuario);
            res.setHeader('authorization', token);
            res.status(200).json(usuario);
        })
        .catch((error) => {
            res.status(error.status).json(error);
            //Checar el numero de status del error y mensaje a poner
        });
        conexion.close();
  });
}
