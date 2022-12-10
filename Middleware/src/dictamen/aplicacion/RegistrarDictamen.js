import Dictamen from "../dominio/Dictamen.js";

export default class RegistrarDictamen {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  run = (folio, fecha, descripcion, idReporteSiniestro) =>
    new Promise((resolve, reject) => {
      let dictamen = new Dictamen(
        folio,
        fecha,
        descripcion,
        idReporteSiniestro
      );

      this._repositorio
        .registrar(dictamen)
        .then((idDictamen) => resolve(idDictamen))
        .catch((error) => reject(error));
    });
}
