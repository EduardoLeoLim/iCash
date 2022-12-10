import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarMunicipioPorEntidadFederativa {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (idEntidadFederativa) =>
    new Promise((resolve, reject) => {
      //llamar reject si idEntidadFederativa es undefined

      let criteria = new CriteriaBuilder()
        .equal("idEntidadFederativa", idEntidadFederativa)
        .obligatory()
        .orderAsc("id")
        .build();

      this._repositorio
        .buscar(criteria)
        .then((municipios) => resolve(municipios))
        .catch((error) => reject(error));
    });
}
