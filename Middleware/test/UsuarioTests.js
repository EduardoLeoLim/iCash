import assert from 'assert';
import { CriteriaBuilder } from "../src/compartido/dominio/criteria/CriteriaBuilder.js";
import SqlServerUsuarioRepositorio from "../src/usuario/infrestructura/persistencia/SqlServerUsuarioRepositorio.js";
import { Connection } from "tedious";
import { Config } from "../src/compartido/infrestructura/conexiones/Conexion.js";
import ConsultarUsuarioPorId from "../src/usuario/aplicacion/ConsultarUsuarioPorId.js";

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

  describe('Autenticación', function () {
    it('Iniciar sesion de conductor', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
    });
  })

});

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

