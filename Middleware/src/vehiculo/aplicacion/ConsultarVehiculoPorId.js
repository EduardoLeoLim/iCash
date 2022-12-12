import {CriteriaBuilder} from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export default class ConsultarVehiculoPorId {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    
    ejecutar = (idVehiculo) => new Promise((resolve, reject) => {
        let criteria = new CriteriaBuilder().equal("id", idVehiculo).obligatory().build();
    
        this.repositorio.buscar(criteria).then((vehiculos) => {
            if(vehiculos.length == 0){
                reject(new ResourceNotFoundError("Vehiculo no encontrado"));
            }else{
                resolve(vehiculos[0]);
            }
        }).catch((error) => {
        reject(error);
        });
    });
}