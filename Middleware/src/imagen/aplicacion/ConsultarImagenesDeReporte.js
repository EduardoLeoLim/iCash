import { CriteriaBuilder } from './../../compartido/dominio/criteria/CriteriaBuilder.js';

export default class ConsultarImagenesDeReporte {

  constructor(repositorio) {
    this.repositorio = repositorio;
  }

    ejecutar = (idReporteSiniestro) => new Promise((resolve, reject) => {
        let criteria = new CriteriaBuilder().equal("idReporteSiniestro", idReporteSiniestro).obligatory().build();
        
        this.repositorio.buscar(criteria).then((imagenes) => {
            resolve(imagenes);
        }).catch((error) => {
            reject(error);
        });
    });
}