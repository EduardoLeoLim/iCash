import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export class ConsultarCoberturas {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  run = () =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder().orderAsc("id").build();
      this.repositorio
        .buscar(criteria)
        .then((coberturas) => {
          resolve(coberturas);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
