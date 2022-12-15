import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import SqlServerMarcaRepositorio from "../persistencia/SqlServerMarcaRepositorio.js";
import ConsultarMarcas from "../../aplicacion/ConsultarMarcas.js";

export default function consultarMarcasController(req, res) {
  let limit = req.query.limit;
  let offset = req.query.offset;

  let conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json();
      return;
    }

    let marcasRepositorio = new SqlServerMarcaRepositorio(conexion);
    let consultarMarcas = new ConsultarMarcas(marcasRepositorio);

    consultarMarcas
      .run(limit, offset)
      .then((consultarMarcas) => {
        res.status(200).json(consultarMarcas);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      })
      .finally(() => {
        conexion.close();
      });
  });
}
