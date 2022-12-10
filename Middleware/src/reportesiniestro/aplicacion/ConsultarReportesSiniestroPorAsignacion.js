import { ResourceNotFoundError } from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";
import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export class ConsultarReportesSiniestroPorAsignacion {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (idEmpleado) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .equal("idEmpleado", idEmpleado)
        .obligatory()
        .build();

      this._repositorio
        .buscar(criteria)
        .then((dictamenes) => {
          if (dictamenes.length > 0) {
            resolve(dictamenes);
          } else {
            reject(
              new ResourceNotFoundError("No se encontraron reportes asignados")
            );
          }
        })
        .catch((error) => reject(error));
    });
}
