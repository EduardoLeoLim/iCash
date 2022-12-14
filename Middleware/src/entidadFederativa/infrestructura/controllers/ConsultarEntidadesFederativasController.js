import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import ConsultarEntidadesFederativas from "../../aplicacion/ConsultarEntidadesFederativas.js";
import SqlServerEntidadFederativaRepositorio from "../persistencia/SqlServerEntidadFederativaRepositorio.js";

export default function consultarEntidadesFederativasController(req, res) {
  let limit = req.query.limit;
  let offset = req.query.offset;

  let conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json();
      return;
    }

    let entidadFederativaRepositorio =
      new SqlServerEntidadFederativaRepositorio(conexion);
    let consultarEntidadesFederativas = new ConsultarEntidadesFederativas(
      entidadFederativaRepositorio
    );

    consultarEntidadesFederativas
      .run(limit, offset)
      .then((entidadesFederativas) => {
        res.status(200).json(entidadesFederativas);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      })
      .finally(() => {
        conexion.close();
      });
  });
}
