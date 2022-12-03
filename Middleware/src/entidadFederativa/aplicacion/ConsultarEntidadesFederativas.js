import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export class ConsultarEntidadesFederativas {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (limit, offset) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .orderAsc("id")
        .offset(offset)
        .limit(limit)
        .build();

      this._repositorio
        .buscar(criteria)
        .then((entidadesFederativas) => {
          resolve(entidadesFederativas);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
