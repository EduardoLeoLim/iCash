import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";
import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarCoberturaPorId {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (id) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("id", id)
        .obligatory()
        .orderAsc("id")
        .build();

      this._repositorio
        .buscar(criteria)
        .then((coberturas) => {
          if (coberturas.length > 0) {
            resolve(coberturas[0]);
          } else {
            reject(new ResourceNotFoundError("Cobertura no encontrada"));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
}
