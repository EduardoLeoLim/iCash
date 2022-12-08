import { ResourceNotFoundError } from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";
import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export class ConsultarEntidadFederativaPorClave {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (clave) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("clave", clave)
        .obligatory()
        .build();

      this._repositorio
        .buscar(criteria)
        .then((entidadFederativas) => {
          if (entidadFederativas.length > 0) {
            resolve(entidadFederativas[0]);
          } else {
            reject(
              new ResourceNotFoundError("Entidad federativa no encontrada")
            );
          }
        })
        .catch((error) => reject(error));
    });
}
