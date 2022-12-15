import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarMarcas {
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
        .then((marcas) => resolve(marcas))
        .catch((error) => reject(error));
    });
}
