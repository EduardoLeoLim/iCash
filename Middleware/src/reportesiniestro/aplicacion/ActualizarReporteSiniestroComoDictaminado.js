import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";
import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";

export default class ActualizarReporteSiniestroComoDictaminado {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }
  run = (idDictamen, idReporteSiniestro) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("id", idReporteSiniestro)
        .obligatory()
        .build();

      this.repositorio
        .buscar(criteria)
        .then((reportesSiniestro) => {
          if (reportesSiniestro.length === 0)
            throw new ResourceNotFoundError(
              404,
              "No se encontró el reporte de siniestro"
            );
          return reportesSiniestro[0];
        })
        .then((reporteSiniestro) => {
          reporteSiniestro.dictaminar(idDictamen);
          return this.repositorio.actualizar(reporteSiniestro);
        })
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
}
