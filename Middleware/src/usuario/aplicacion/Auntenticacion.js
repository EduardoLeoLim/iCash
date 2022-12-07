import { CriteriaBuilder } from "../../compartido/dominio/criteria/CriteriaBuilder.js";

export const Rol = {
    Conductor: 1,
    Ajustador: 2,
    Administrador: 3,
    EjecutivoAsistencia: 4
};

export class Auntenticacion {
  constructor(repositorio) {
    this._repositorio = repositorio;
  }

  auntenticacionConductor = (usuario, contrasena) =>
    new Promise((resolve, reject) => {
      let criteria = new CriteriaBuilder()
        .orderAsc("id")
        .equal("nombreUsuario",usuario)
        .obligatory()
        .equal("claveAcceso", contrasena)
        .obligatory()
        .equal("role", Rol.Conductor)
        .build();

      this._repositorio
        .buscar(criteria)
        .then((usuarios) => {
            if (usuarios.length > 0) {
                resolve(usuarios[0]);
            }else{
                reject(new ResourceNotFoundError("Credenciales inválidas"));
            }
        })
        .catch((error) => reject(error));
    });

    //BLAS - Agregar metodo para autenticacionAjustador
}
