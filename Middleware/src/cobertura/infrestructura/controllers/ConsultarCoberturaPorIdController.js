import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import { ConsultarCoberturaPorId } from "../../aplicacion/ConsultarCoberturaPorId.js";
import { SqlServerCoberturaRepositorio } from "../persistencia/SqlServerCoberturaRepositorio.js";

export function consultarCoberturaPorIdController(req, res) {
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
      .then((coberturas) => {
        console.log("Controlador");
        res.status(200).send(coberturas);
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  });
  conexion.close();
}
