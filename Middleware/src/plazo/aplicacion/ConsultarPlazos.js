import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder";

export class ConsultarPlazos {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (limit, offset) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .orderAsc("id")
        .limit(limit)
        .offset(offset)
        .build();

      this._repositorio
        .buscar(criteria)
        .then((plazos) => resolve(plazos))
        .catch((error) => reject(error));
    });
}
