import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import { ConsultarCoberturas } from "../../aplicacion/ConsultarCoberturas.js";
import { SqlServerCoberturaRepositorio } from "../persistencia/SqlServerCoberturaRepositorio.js";

export function consultarCoberturasController(req, res) {
  let conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log("Error al iniciar conexión: ", err.message);
      res.status(500).json();
      return;
    }

    let coberturaRepositorio = new SqlServerCoberturaRepositorio(conexion);
    let consultarCoberturas = new ConsultarCoberturas(coberturaRepositorio);

    consultarCoberturas
      .run()
      .then((coberturas) => {
        res.status(200).send(coberturas);
      })
      .catch((error) => {
        console.log(error.message);
        res.status(500).json();
      })
      .finally(() => {
        conexion.close();
      });
  });
}
