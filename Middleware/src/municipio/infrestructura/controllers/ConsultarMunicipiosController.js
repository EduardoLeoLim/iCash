import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import { ConsultarEntidadFederativaPorClave } from "../../../entidadfederativa/aplicacion/ConsultarEntidadFederativaPotClave.js";
import { SqlServerEntidadFederativaRepositorio } from "../../../entidadfederativa/infrestructura/persistencia/SqlServerEntidadFederativaRepositorio.js";
import { ConsultarMunicipioPorEntidadFederativa } from "../../aplicacion/ConsultarMunicipiosPorEntidadFederativa.js";
import { SqlServerMunicipioRepositorio } from "../persistencia/SqlServerMunicipioRepositorio.js";

export function consultarMunicipiosController(req, res) {
  let claveEntidadFederativa = req.params["claveEntidadFederativa"];
  let conexion = new Connection(Config);

  conexion.connect((error) => {
    if (error) {
      console.log("Error: ", error);
      res.status(500).json();
      return;
    }

    let entidadFederativaRepositorio =
      new SqlServerEntidadFederativaRepositorio(conexion);
    let consultarEntidadFederativaPorClave =
      new ConsultarEntidadFederativaPorClave(entidadFederativaRepositorio);

    let municipioRepositorio = new SqlServerMunicipioRepositorio(conexion);
    let consultarMunicipios = new ConsultarMunicipioPorEntidadFederativa(
      municipioRepositorio
    );

    consultarEntidadFederativaPorClave
      .run(claveEntidadFederativa)
      .then((entidadFederativa) => {
        return entidadFederativa.id;
      })
      .then((idEntidadFederativa) => {
        consultarMunicipios
          .run(idEntidadFederativa)
          .then((municipios) => res.status(200).json(municipios));
      })
      .catch((error) => {
        res.status(error.status).json(error);
      });
  });
}
