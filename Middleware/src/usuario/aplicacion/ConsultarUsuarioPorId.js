import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";
import ResourceNotFoundError from "../../compartido/aplicacion/excepciones/ResourceNotFoundError.js";

export default class ConsultarUsuarioPorId {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  buscarUsuario = (idUsuario) => 
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .orderAsc("id")
        .equal("id", idUsuario)
        .obligatory()
        .build();

      this._repositorio
        .buscar(criteria)
        .then((usuarios) => {
          if (usuarios.length > 0) {
            resolve(usuarios[0]);
          } else {
            reject(new ResourceNotFoundError("Usuario no encontrado"));
          }
        })
        .catch((error) => reject(error));
    });
}
