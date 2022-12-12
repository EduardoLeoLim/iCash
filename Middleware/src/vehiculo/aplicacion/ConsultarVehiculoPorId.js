

export default class ConsultarVehiculoPorId {
    constructor(repositorio) {
        this.repositorio = repositorio;
    }
    
    ejecutar = (idVehiculo) => new Promise((resolve, reject) => {
        let criteria = new CriteriaBuilder().equal("id", idVehiculo).obligatory().build();
    
        this.repositorio.buscar(criteria).then((vehiculos) => {
            resolve(vehiculos);
        }).catch((error) => {
        reject(error);
        });
    });
}