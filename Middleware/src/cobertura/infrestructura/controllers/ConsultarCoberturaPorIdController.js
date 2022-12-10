import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import ConsultarCoberturaPorId from "../../aplicacion/ConsultarCoberturaPorId.js";
import SqlServerCoberturaRepositorio from "../persistencia/SqlServerCoberturaRepositorio.js";

export default function consultarCoberturaPorIdController(req, res) {
  let id = req.params["id"];
  let conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).json();
      return;
    }

    let coberturaRepositorio = new SqlServerCoberturaRepositorio(conexion);
    let consultarCobertura = new ConsultarCoberturaPorId(coberturaRepositorio);

    consultarCobertura
      .run(id)
      .then((cobertura) => {
        res.status(200).send(cobertura);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      })
      .finally(() => {
        conexion.close();
      });
  });
}
