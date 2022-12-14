import assert from 'assert';
import { CriteriaBuilder } from "../src/compartido/dominio/criteria/CriteriaBuilder.js";
import SqlServerReporteSiniestroRepositorio from "../src/reportesiniestro/infrestructura/persistencia/SqlServerReporteSiniestroRepositorio.js"
import { Connection } from "tedious";
import { Config } from "../src/compartido/infrestructura/conexiones/Conexion.js";
import ConstultarReportesSiniestroPorAsignacion from "../src/reportesiniestro/aplicacion/ConsultarReportesSiniestroPorAsignacion.js"
import { resolve } from 'path';

//TESTS
describe("Reportes siniestros", function() {
    describe('#Consultar reportes', function (){
        it('Debe retornar un arreglo con los reportes asignados para el idEmpleado 1 ', function() {
            return new Promise((resolve,reject) => {
              consultarReportesSiniestroAjustador(1)
                  .then((reportes) => {
                    assert.ok(Array.isArray(reportes), "Es un arreglo")
                    resolve(reportes)
                  })
                  .catch(error => {
                    reject(error)
                  })
            })
        });
    });
});


//FUNCIONES
function consultarReportesSiniestroAjustador(idEmpleado) {
  return new Promise((resolve, reject) => {
    let conexion = new Connection(Config);

    conexion.connect((error) => {
      if (error) {
        assert.ok(false, "Error de conexión")
        resolve()
      }
  
      let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(
        conexion
      );
      let consultarReportesAjustador =
        new ConstultarReportesSiniestroPorAsignacion(reporteSiniestroRepositorio);
  
      consultarReportesAjustador
        .run(idEmpleado)
        .then((reportes) => {
          resolve(reportes)
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