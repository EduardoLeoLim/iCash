import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarPolizasPorIdConductor {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  run = (idConductor) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("idConductor", idConductor)
        .obligatory()
        .build();

      this.repositorio
        .buscar(criteria)
        .then((polizas) => {
          resolve(polizas);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
