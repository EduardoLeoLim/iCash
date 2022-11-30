import { ResourceNotFoundError } from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";
import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export class ConsultarDictmenPorReporteSiniestro {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (idReporteSiniestro) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("idReporteSiniestro", idReporteSiniestro)
        .build();

      this._repositorio
        .buscar(criteria)
        .then((dictamenes) => {
          if (dictamenes.length > 0) {
            resolve(dictamenes[0]);
          } else {
            reject(new ResourceNotFoundError("No se encontró un dictamen"));
          }
        })
        .catch((error) => reject(error));
    });
}
