import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";
import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarReporteSiniestroPorId {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (id) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder().equal("id", id).obligatory().build();

      this._repositorio
        .buscar(criteria)
        .then((reportes) => {
          
          if (reportes.length == 0) {
            reject(
              new ResourceNotFoundError("Reporte de siniestro no encontrado")
            );
          } else {
            
            resolve(reportes[0]);
            
          }
        })
        .catch((error) => reject(error));
    });
}
