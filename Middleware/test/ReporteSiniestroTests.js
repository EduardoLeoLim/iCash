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

        it('Debe retornar un 200, ya que sí hay un reporte de siniestro', function() {
          return new Promise((resolve,reject) => {
            consultarDetallesDeReporteController(2)
                .then((reportes) => {
                  assert.equal(reportes, 200)
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

function consultarDetallesDeReporteController(idReporte) {
  return new Promise((resolve, reject) => {
    const idReporte = req.params.idReporte;
  let conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log("Error: ", err);
      resolve();
      return;
    }

    let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(
      conexion
    );
    let imagenRepositorio = new SqlServerImagenRepositorio(conexion);
    let coberturaRepositorio = new SqlServerCoberturaRepositorio(conexion);
    let polizaRepositorio = new SqlServerPolizaRepositorio(conexion);
    let plazoRepositorio = new SqlServerPlazoRepositorio(conexion);
    let involucradoRepositorio = new SqlServerInvolucradoRepositorio(conexion);
    let vehiculoRepositorio = new SqlServerVehiculoRepositorio(conexion);

    let consultarReporteSiniestroPorId = new ConsultarReporteSiniestroPorId(
      reporteSiniestroRepositorio
    );
    let consultarImagenesDeReporte = new ConsultarImagenesDeReporte(
      imagenRepositorio
    );
    let consultarCoberturaPorId = new ConsultarCoberturaPorId(
      coberturaRepositorio
    );
    let consultarPolizaPorId = new ConsultarPolizaPorId(polizaRepositorio);
    let consultarPlazoPorId = new ConsultarPlazoPorId(plazoRepositorio);
    let consultarInvolucradosPorIdReporte =
      new ConsultarInvolucradosPorIdReporte(involucradoRepositorio);
    let consultarVehiculoPorId = new ConsultarVehiculoPorId(
      vehiculoRepositorio
    );

    const detallesReporte = {};

    consultarReporteSiniestroPorId
      .run(idReporte)
      .then((reporteSiniestro) => {
        detallesReporte.poliza = reporteSiniestro.idPoliza;
        detallesReporte.id = reporteSiniestro.id;
        detallesReporte.nombre = reporteSiniestro.nombre;
        detallesReporte.estatus = reporteSiniestro.estatus;
        detallesReporte.fechaRegistro = reporteSiniestro.fecha;
        detallesReporte.horaAccidente = reporteSiniestro.hora;
        detallesReporte.latitud = reporteSiniestro.latitud;
        detallesReporte.longitud = reporteSiniestro.longitud;

        return detallesReporte;
      })
      .then((detallesReporte) => {
        const fotos = [];

        return consultarImagenesDeReporte
          .ejecutar(detallesReporte.id)
          .then((imagenes) => {
            console.log(imagenes);
            imagenes.forEach((imagen) => {
              fotos.push(imagen.urlImagen);
            });

            detallesReporte.fotos = fotos;
            return detallesReporte;
          });
      })
      .then((detallesReporte) => {
        return consultarPolizaPorId
          .ejecutar(detallesReporte.poliza)
          .then((poliza) => {
            const datosPoliza = {
              id: poliza.id,
              cobertura: poliza.idCobertura,
              plazo: poliza.idPlazo,
              precioFinal: poliza.precioFinal,
            };
            detallesReporte.poliza = datosPoliza;

            return detallesReporte;
          });
      })
      .then((detallesReporte) => {
        return consultarCoberturaPorId
          .run(detallesReporte.poliza.cobertura)
          .then((cobertura) => {
            const coberturaDatos = {
              nombre: cobertura.nombre,
              tipo: cobertura.tipo,
            };
            detallesReporte.poliza.cobertura = coberturaDatos;
            return detallesReporte;
          });
      })
      .then((detallesReporte) => {
        return consultarPlazoPorId
          .ejecutar(detallesReporte.poliza.plazo)
          .then((plazo) => {
            const plazoDatos = {
              nombre: plazo.nombre,
              tipo: plazo.tipo,
            };
            detallesReporte.poliza.plazo = plazoDatos;
            return detallesReporte;
          });
      })
      .then((detallesReporte) => {
        return consultarInvolucradosPorIdReporte
          .ejecutar(detallesReporte.id)
          .then((involucrados) => {
            const involucradosDatos = [];
            involucrados.forEach((involucrado) => {
              const involucradoDatos = {
                id: involucrado.id,
                nombre: involucrado.nombre,
                vehiculo: involucrado.idVehiculo,
              };
              involucradosDatos.push(involucradoDatos);
            });
            detallesReporte.involucrados = involucradosDatos;
            return detallesReporte;
          });
      })
      .then((detallesReporte) => {
        let promesas = [];
        detallesReporte.involucrados.forEach((involucrado) => {
          if (involucrado.vehiculo && involucrado.vehiculo != null) {
            promesas.push(
              consultarVehiculoPorId.ejecutar(involucrado.vehiculo)
            );
          }
        });
        return Promise.all(promesas).then((vehiculos) => {
          detallesReporte.involucrados.forEach((involucrado) => {
            console.log(vehiculos);
            if (involucrado.vehiculo && involucrado.vehiculo != null) {
              involucrado.vehiculo = vehiculos.find((vehiculoLoop) => {
                return vehiculoLoop.id == involucrado.vehiculo;
              });
            }
          });
          return detallesReporte;
        });
      })
      .then((detallesReporte) => {
        resolve(200);
      })
      .catch((error) => {
        resolve(500);
      })
      .finally(() => {
        conexion.close();
      });
  });
  });
}