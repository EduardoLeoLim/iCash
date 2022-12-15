export default class RegistrarInvolucradoDeReporte {
  constructor(registradorInvolucrado, registradorVehiculo, consultarMarca) {
    this.registradorInvolucrado = registradorInvolucrado;
    this.registradorVehiculo = registradorVehiculo;
    this.consultarMarca = consultarMarca;
  }

  run = (involucrado, idReporteSiniestro) =>
    new Promise((resolve, reject) => {
      if (involucrado.vehiculo) {
        let vehiculo = involucrado.vehiculo;
        this.consultarMarca
          .run(vehiculo.idMarca)
          .then((marca) => {
            return this.registradorVehiculo.run(
              vehiculo.año,
              vehiculo.color,
              vehiculo.modelo,
              vehiculo.idMarca,
              vehiculo.numPlacas,
              vehiculo.numSerie,
              null
            );
          })
          .then((idVehiculo) => {
            return this.registradorInvolucrado.run(
              involucrado.nombre,
              idReporteSiniestro,
              idVehiculo
            );
          })
          .then((idInvolucrado) => {
            resolve(idInvolucrado);
          })
          .catch((error) => reject(error));
      } else {
        this.registradorInvolucrado
          .run(involucrado.nombre, idReporteSiniestro, null)
          .then((idInvolucrado) => {
            resolve(idInvolucrado);
          })
          .catch((error) => reject(error));
      }
    });
}
