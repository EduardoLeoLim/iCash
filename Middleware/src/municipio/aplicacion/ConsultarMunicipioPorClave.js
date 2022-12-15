import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";
import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";

export default class ConsultarMunicipioPorClave {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  run = (idEntiddadFederativa, clave) =>
    new Promise((resolve, reject) => {
      let criterio = new CriteriaBuilder()
        .equal("clave", clave)
        .obligatory()
        .equal("idEntidadFederativa", idEntiddadFederativa)
        .obligatory()
        .build();

      this.repositorio
        .buscar(criterio)
        .then((municipios) => {
          if (municipios.length === 0) {
            reject(new ResourceNotFoundError("Municipio no encontrado"));
          } else {
            resolve(municipios[0]);
          }
        })
        .catch();
    });
}
