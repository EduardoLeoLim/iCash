import Involucrado from "../dominio/Involucrado.js";

export default class RegistradorInvolucrado {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  run = (nombre, idReporteSiniestro, idVehiculo) =>
    new Promise((resolve, reject) => {
      let nuevoInvolucrado = new Involucrado(
        nombre,
        idReporteSiniestro,
        idVehiculo
      );

      this.repositorio
        .registrar(nuevoInvolucrado)
        .then((idInvolucrado) => resolve(idInvolucrado))
        .catch((error) => reject(error));
    });
}
