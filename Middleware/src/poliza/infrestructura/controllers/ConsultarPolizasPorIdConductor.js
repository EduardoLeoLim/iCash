import SqlServerPolizaRepositorio from "../persistencia/SqlServerPolizaRepositorio.js";
import ConsultarPolizasPorIdConductor from "../../aplicacion/ConsultarPolizasPorIdConductor.js";
import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";

export default function consultarPolizasPorIdConductor(req, res) {
  let idConductor = req.params.idConductor;

  let conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log("Error: ", err);
      return res.status(500).json();
    }

    let polizaRepositorio = new SqlServerPolizaRepositorio(conexion);
    let consultarPolizasPorIdConductor = new ConsultarPolizasPorIdConductor(
      polizaRepositorio
    );

    consultarPolizasPorIdConductor
      .run(idConductor)
      .then((polizas) => {
        res.status(200).json(polizas);
      })
      .catch((error) => {
        if (error.status) {
          res.status(error.status).json(error);
        } else {
          res.status(500).json(error);
        }
      })
      .finally(() => conexion.close());
  });
}
