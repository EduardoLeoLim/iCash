import Imagen from "../dominio/Imagen.js";

export default class RegistrarImagen {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  ejecutar = (idReporteSiniestro, nombreImangen) =>
    new Promise((resolve, reject) => {
      let imagen = new Imagen(idReporteSiniestro, nombreImangen);
      this.repositorio
        .registrar(imagen)
        .then((urlImagen) => resolve(urlImagen))
        .catch((error) => reject(error));
    });
}
