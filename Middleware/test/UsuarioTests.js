import assert from 'assert';
import { CriteriaBuilder } from "../src/compartido/dominio/criteria/CriteriaBuilder.js";
import SqlServerUsuarioRepositorio from "../src/usuario/infrestructura/persistencia/SqlServerUsuarioRepositorio.js";
import { Connection } from "tedious";
import { Config } from "../src/compartido/infrestructura/conexiones/Conexion.js";
import ConsultarUsuarioPorId from "../src/usuario/aplicacion/ConsultarUsuarioPorId.js";
import Auntenticacion from '../src/usuario/aplicacion/Auntenticacion.js';
import { generarToken } from "../src/compartido/infrestructura/utils/Token.js";
import { resolve } from 'path';
import dotenv from "dotenv";

dotenv.config();

// TESTS
describe("Usuarios", function () {
  describe('#Consultar Usuarios', function () {
    it('Debe retornar un arreglo', function () {
      return new Promise((resolve,reject) => {
        consultarUsuarios()
          .then((usuarios) => {
            assert.ok(Array.isArray(usuarios), "No es un arreglo")
            resolve(usuarios)
          })
          .catch(error => {
            reject(error)
          })
      })
    });

    it("Debe retornar un usuario con id 2", function () {
      return new Promise((resolve,reject) => {
        consultarUsuarioPorId(2)
          .then((usuario) => {
            assert.equal(usuario.id, 2)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    })

  });

  describe('#Autenticación', function () {
    it('Inicio de sesion con usuario 2282144903 y contrasena 123', function () {
      return new Promise((resolve, reject) => {
        auntenticacionConductor("2282144903", "123")
        .then((response) => {
          assert.equal(response.nombreUsuario, "2282144903");
          assert.equal(response.claveAcceso, "123")
          resolve()
        })
        .catch(error => {
          reject(error)
        })
      })
    });
  })

});

//FUNCIONES
function consultarUsuarios() {
  return new Promise((resolve, reject) => {
    let conexion = new Connection(Config);

    conexion.connect((error) => {
      if (error) {
        assert.ok(false, "Error de conexión")
        resolve()
      }

      let criteria = new CriteriaBuilder().build();

      let repositorioUsuario = new SqlServerUsuarioRepositorio(conexion);
      repositorioUsuario.buscar(criteria)
        .then((usuarios) => {
          resolve(usuarios)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          conexion.close();
        })
    });
  })
}

function consultarUsuarioPorId(idUsuario) {
  return new Promise((resolve, reject) => {
    let conexion = new Connection(Config);

    conexion.connect((error) => {
      if (error) {
        assert.ok(false, "Error de conexión")
        resolve()
      }

      let repositorioUsuario = new SqlServerUsuarioRepositorio(conexion);
      let consultarUsuarioPorId = new ConsultarUsuarioPorId(repositorioUsuario);

      consultarUsuarioPorId.buscarUsuario(idUsuario)
        .then((usuario) => {
          resolve(usuario)
        })
        .catch((error) => {
          reject(error)
        }).finally(() => {
          conexion.close()
      })
    });
  })
}

function auntenticacionConductor(usuario, contrasena){
  return new Promise((resolve, reject) => {
    let conexion = new Connection(Config);

    conexion.connect((error) => {
      if (error) {
        assert.ok(false, "Error de conexión")
        resolve()
      }

      let usuariosRepositorio = new SqlServerUsuarioRepositorio(conexion);
      let auntenticacion = new Auntenticacion(usuariosRepositorio);

      auntenticacion
      .auntenticacionConductor(usuario, contrasena)
      .then((usuario) => {
        resolve(usuario)
      })
      .catch((error) => {
        reject(error)
      })
      .finally(() => {
        conexion.close();
      });
    });
  })
}

