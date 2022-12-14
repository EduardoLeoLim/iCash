import assert from 'assert';
import { Connection } from "tedious";
import { Config } from '../src/compartido/infrestructura/conexiones/Conexion.js';
import SqlServerDictamenRepositorio from "../src/dictamen/infrestructura/persistencia/SqlServerDictamenRepositorio.js";
import SqlServerReporteSiniestroRepositorio from "../src/reportesiniestro/infrestructura/persistencia/SqlServerReporteSiniestroRepositorio.js";
import ConsultarReporteSiniestroPorId from "../src/reportesiniestro/aplicacion/ConsultarReporteSiniestroPorId.js";
import ActualizarReporteSiniestroComoDictaminado from "../src/reportesiniestro/aplicacion/ActualizarReporteSiniestroComoDictaminado.js";
import RegistrarDictamen from "../src/dictamen/aplicacion/RegistrarDictamen.js";
import { resolve } from 'path';

//TESTS
describe("Dictamenes", function() {
    describe('#Registrar dictamen', function (){
        it('Debe un 201, ya que el reporte no se encuentra dictaminado ', function() {
            return new Promise((resolve,reject) => {
              var date = Date.now()
                registrarDictamenReporteController("Se realizo el dictamen correspondiente", date, 2)
                  .then((dictamenStatus) => {
                    assert.equal(dictamenStatus, 201)
                    resolve()
                  })
                  .catch(error => {
                    reject(error)
                  })
            })
        });

        it('Debe un 400, ya que el reporte ya se encuentra dictaminado ', function() {
          return new Promise((resolve,reject) => {
            var date = Date.now()
              registrarDictamenReporteController("Se realizo el dictamen correspondiente", date, 2)
                .then((dictamenStatus) => {
                  assert.equal(dictamenStatus, 400)
                  reject()
                })
                .catch(error => {
                  resolve(error)
                })
          })
      });
    });
});

//FUNCIONES
function registrarDictamenReporteController(fecha, descripcion, idReporteSiniestro){
    return new Promise((resolve, reject) => {
        let conexion = new Connection(Config);
  
        conexion.connect((error) => {
          if (error) {
            assert.ok(false, "Error de conexión")
            resolve()
          }
      
          let reporteDictamenRepositorio = new SqlServerDictamenRepositorio(conexion);
      
          let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(
            conexion
          );
      
          let consultarReporteSiniestroPorId = new ConsultarReporteSiniestroPorId(
            reporteSiniestroRepositorio
          );
      
          let actualizarReporteComoDictaminado = new ActualizarReporteSiniestroComoDictaminado(
            reporteSiniestroRepositorio
          );
      
          let registrarDictamen = new RegistrarDictamen(reporteDictamenRepositorio);
      
          conexion.beginTransaction((error) => {
            if (error) {
                assert.ok(false, "Error de conexión")
                resolve()
            }
      
            //Comprobar reporte siniestro
            consultarReporteSiniestroPorId
              .run(idReporteSiniestro)
              .then((reporteSiniestro) => {
                if (reporteSiniestro.estatus === "Dictaminado")
                  reject(400);
                return registrarDictamen.run(fecha, descripcion, idReporteSiniestro);
              })
              .then((idDictamen) => {
                return actualizarReporteComoDictaminado.run(
                  idDictamen,
                  idReporteSiniestro
                );
              })
              .then(() => {
                conexion.commitTransaction((error) => {
                  if (error)
                    reject(500);
                  resolve(201);
                });
              })
              .catch((error) => {
                reject(error)
              })
              .finally(() => {
                conexion.close();
              });
          });
        });
    })
}