import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";
import ResourceNotFoundError from "./../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";

export default class ConsultarPlazoPorId {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  ejecutar = (id) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder().equal("id", id).obligatory().build();

      this.repositorio
        .buscar(criteria)
        .then((plazos) => {
          if (plazos.length == 0) {
            reject(new ResourceNotFoundError("Plazo no encontrado"));
          }
          resolve(plazos[0]);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
