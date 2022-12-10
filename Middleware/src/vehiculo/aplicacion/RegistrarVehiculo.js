import Vehiculo from "../dominio/Vehiculo.js";

export default class RegistrarVehiculo {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  run = (año, color, modelo, idMarca, numPlacas, numSerie, idPoliza) =>
    new Promise((resolve, reject) => {
      let nuevoVehiculo = new Vehiculo(
        año,
        color,
        modelo,
        idMarca,
        numPlacas,
        numSerie,
        idPoliza
      );

      this.repositorio
        .registrar(nuevoVehiculo)
        .then((idVehiculo) => resolve(idVehiculo))
        .catch((error) => reject(error));
    });
}
