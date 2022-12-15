import ReporteSiniestro from "../dominio/ReporteSiniestro.js";

export default class RegistrarReporteSiniestro {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  ejecutar = (
    nombre,
    horaAccidente,
    latitud,
    longitud,
    idMunicipio,
    idPoliza
  ) =>
    new Promise((resolve, reject) => {
      let reporteSiniestro = new ReporteSiniestro(
        nombre,
        "Pendiente",
        new Date(),
        horaAccidente,
        idMunicipio,
        latitud,
        longitud,
        0,
        0,
        idPoliza
      );

      this.repositorio
        .registrar(reporteSiniestro)
        .then((id) => resolve(id))
        .catch((error) => {
          reject(error);
        });
    });
}
