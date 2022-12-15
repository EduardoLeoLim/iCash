import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";
import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarConductorPorId {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  ejecutar = (idConductor) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("id", idConductor)
        .obligatory()
        .build();

      this.repositorio
        .buscar(criteria)
        .then((conductores) => {
          if (conductores.length === 0) {
            reject(new ResourceNotFoundError("Conductor no encontrado"));
          } else {
            resolve(conductores[0]);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
}
