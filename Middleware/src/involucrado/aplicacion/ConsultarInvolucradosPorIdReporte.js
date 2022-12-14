import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarInvolucradosPorIdReporte {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  ejecutar = (idReporte) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("idReporteSiniestro", idReporte)
        .obligatory()
        .build();

      this.repositorio
        .buscar(criteria)
        .then((involucrados) => {
          resolve(involucrados);
        })
        .catch((error) => {
          reject(error);
        });
    });
}
