import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";
import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarMarcarPorId {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  run = (id) =>
    new Promise((resolve, reject) => {
      let criterio = new CriteriaBuilder().equal("id", id).obligatory().build();

      this.repositorio
        .buscar(criterio)
        .then((marcas) => {
          if (marcas.length === 0) {
            reject(new ResourceNotFoundError("Marca no encontrada"));
          } else {
            resolve(marcas[0]);
          }
        })
        .catch();
    });
}
