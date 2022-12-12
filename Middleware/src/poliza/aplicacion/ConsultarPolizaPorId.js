import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";
import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";

export default class ConsultarPolizaPorId {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    
    ejecutar = (idPoliza) => new Promise((resolve, reject) => {
        let criteria = new CriteriaBuilder().equal("id", idPoliza).obligatory().build();
    
        this.repositorio.buscar(criteria).then((polizas) => {
            if(polizas.length == 0){
                reject(new ResourceNotFoundError("Plazo no encontrado"));
            }
            resolve(polizas[0]);
        }).catch((error) => {
        reject(error);
        });
    });
}