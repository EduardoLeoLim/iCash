import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export class ConsultarEntidadesFederativas {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (limit, offset) =>
    new Promise((resolve, reject) => {
      let criteriaBuilder = new CriteriaBuilder();
      criteriaBuilder = criteriaBuilder.orderAsc("id");
      if (limit) criteriaBuilder = criteriaBuilder.limit(limit);
      if (offset) criteriaBuilder = criteriaBuilder.offset(offset);

      let criteria = criteriaBuilder.build();

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
