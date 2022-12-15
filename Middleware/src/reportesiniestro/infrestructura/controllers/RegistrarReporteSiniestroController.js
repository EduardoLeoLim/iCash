import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import SqlServerDictamenRepositorio from "../../../dictamen/infrestructura/persistencia/SqlServerDictamenRepositorio.js";
import SqlServerReporteSiniestroRepositorio from "../persistencia/SqlServerReporteSiniestroRepositorio.js";
import SqlServerPolizaRepositorio from "../../../poliza/infrestructura/persistencia/SqlServerPolizaRepositorio.js";
import SqlServerMunicipioRepositorio from "../../../municipio/infrestructura/persistencia/SqlServerMunicipioRepositorio.js";
import ConsultarMunicipioPorClave from "../../../municipio/aplicacion/ConsultarMunicipioPorClave.js";
import ConsultarPolizaPorId from "../../../poliza/aplicacion/ConsultarPolizaPorId.js";
import ConsultarMarcarPorId from "../../../marca/aplicacion/ConsultarMarcarPorId.js";
import SqlServerMarcaRepositorio from "../../../marca/infrestructura/persistencia/SqlServerMarcaRepositorio.js";
import SqlServerConductorRepositorio from "../../../conductor/infrestructura/persistencia/SqlServerConductorRepositorio.js";
import ConsultarConductorPorId from "../../../conductor/aplicacion/ConsultarConductorPorId.js";
import RegistrarReporteSiniestro from "../../aplicacion/RegistrarReporteSiniestro.js";
import SqlServerImagenRepositorio from "../../../imagen/infrestructura/persistencia/SqlServerImagenRepositorio.js";
import RegistrarImagen from "../../../imagen/aplicacion/RegistrarImagen.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import SqlServerInvolucradoRepositorio from "../../../involucrado/infrestructura/persistencia/SqlServerInvolucradoRepositorio.js";
import SqlServerVehiculoRepositorio from "../../../vehiculo/infrestructura/persistencia/SqlServerVehiculoRepositorio.js";
import RegistradorInvolucrado from "../../../involucrado/aplicacion/RegistradorInvolucrado.js";
import RegistradorVehiculo from "../../../vehiculo/aplicacion/RegistradorVehiculo.js";
import RegistrarInvolucradoDeReporte from "../../../involucrado/aplicacion/RegistrarInvolucradoDeReporte.js";
import SqlServerEntidadFederativaRepositorio from "../../../entidadfederativa/infrestructura/persistencia/SqlServerEntidadFederativaRepositorio.js";
import ConsultarEntidadFederativaPorClave from "../../../entidadfederativa/aplicacion/ConsultarEntidadFederativaPotClave.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

export default function registrarReporteSiniestroController(req, res) {

  console.log("entro al controlador");


  const imagenes = req.files;
  const {
    nombre,
    claveEntidadFederativa,
    claveMunicipio,
    horaAccidente,
    latitud,
    longitud,
    idPoliza,
    idConductor,
    involucrados,
  } = req.body;

  const conexion = new Connection(Config);

  conexion.connect((err) => {
    if (err) {
      console.log(err);
      return res.status(500).json();
    }

    console.log("conexion exitosa");

    let condutorRepositorio = new SqlServerConductorRepositorio(conexion);
    let polizaRepositorio = new SqlServerPolizaRepositorio(conexion);
    let entidadFederativaRepositorio =
      new SqlServerEntidadFederativaRepositorio(conexion);
    let municipioRepositorio = new SqlServerMunicipioRepositorio(conexion);
    let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(
      conexion
    );
    let imagenRepositorio = new SqlServerImagenRepositorio(conexion);
    let involucradoRepositorio = new SqlServerInvolucradoRepositorio(conexion);
    let vehiculoRepositorio = new SqlServerVehiculoRepositorio(conexion);

    let marcaRepositorio = new SqlServerMarcaRepositorio(conexion);
    let consultarConductor = new ConsultarConductorPorId(condutorRepositorio);
    let consultarPoliza = new ConsultarPolizaPorId(polizaRepositorio);
    let consultarEntidadFederativa = new ConsultarEntidadFederativaPorClave(
      entidadFederativaRepositorio
    );
    let consultarMunicipio = new ConsultarMunicipioPorClave(
      municipioRepositorio
    );
    let registrarReporteSiniestro = new RegistrarReporteSiniestro(
      reporteSiniestroRepositorio
    );
    let registrarImagen = new RegistrarImagen(imagenRepositorio);

    let registradorInvolucrado = new RegistradorInvolucrado(
      involucradoRepositorio
    );
    let regostradprVehiculo = new RegistradorVehiculo(vehiculoRepositorio);

    let consultarMarca = new ConsultarMarcarPorId(marcaRepositorio);

    let registrarVehiculoyInvolucrado = new RegistrarInvolucradoDeReporte(
      registradorInvolucrado,
      regostradprVehiculo,
      consultarMarca
    );

    conexion.beginTransaction((err) => {
      if (err) {
        console.log(err);
        return res.status(500).json("Error de base de datos");
      }

      console.log("Inicia transaccion");

      consultarPoliza
        .ejecutar(idPoliza)
        .then((poliza) => {
          return consultarConductor.ejecutar(idConductor);
        })
        .then((conductor) => {
          return consultarEntidadFederativa.run(claveEntidadFederativa);
        })
        .then((entidadFederativa) => {
          return consultarMunicipio.run(entidadFederativa.id, claveMunicipio);
        })
        .then((municipio) => {
          return registrarReporteSiniestro.ejecutar(
            nombre,
            horaAccidente,
            latitud,
            longitud,
            municipio.id,
            idPoliza
          );
        })
        .then((idReporteSiniestro) => {
          let imagen = imagenes[0];

          if (imagen) {
            return new Promise((resolve, reject) => {
               registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 1 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                 imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                    resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
          // let promesas = [];
          // for (let i = 0; i < imagenes.length; i++) {
          //   let promesa = registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + (i + 1) + imagenes[0].name.split(".").pop() )
          //   promesas.push(promesa);
          // }
          // return Promise.all(promesas).then((urlImagenes) => {
          //   console.log(urlImagenes);
          //   return idReporteSiniestro;
          // });
        })
        .then((idReporteSiniestro) => {
          let imagen = imagenes[1];

          if (imagen) {
            return new Promise((resolve, reject) => {
              registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 2 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                  resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
        })
        .then((idReporteSiniestro) => {
          let imagen = imagenes[2];

          if (imagen) {
            return new Promise((resolve, reject) => {
              registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 3 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                  resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
        })

        .then((idReporteSiniestro) => {
          let imagen = imagenes[3];

          if (imagen) {
            return new Promise((resolve, reject) => {
              registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 4 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                  resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
        })

        .then((idReporteSiniestro) => {
          let imagen = imagenes[4];

          if (imagen) {
            return new Promise((resolve, reject) => {
              registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 5 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                  resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
        })

        .then((idReporteSiniestro) => {
          let imagen = imagenes[5];

          if (imagen) {
            return new Promise((resolve, reject) => {
              registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 6 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                  resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
        })

        .then((idReporteSiniestro) => {
          let imagen = imagenes[6];

          if (imagen) {
            return new Promise((resolve, reject) => {
              registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 7 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                  resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
        })

        .then((idReporteSiniestro) => {
          let imagen = imagenes[7];

          if (imagen) {
            return new Promise((resolve, reject) => {
              registrarImagen.ejecutar(idReporteSiniestro, idReporteSiniestro + "-" + 8 + "." + imagen.name.split(".").pop() ).then((urlImagen) => {
                imagen.mv(path.join(__dirname, "../../../../imagenes/" + urlImagen), (err) => {
                  if (err) {
                    console.log(err);
                    console.log("Error al guardar la imagen");
                  }
                  resolve(idReporteSiniestro);
                })
              });
            })
          }
          return idReporteSiniestro;
        })
        .then((idReporteSiniestro) => {
          let promesas = [];
          (async () => {
            for (let i = 0; i < involucrados.length; i++) {
              let involucrado = involucrados[i];
              await registrarVehiculoyInvolucrado.run(involucrado,idReporteSiniestro);
            }
            conexion.commitTransaction((err) => {
              if (err) {
                throw err;
              }
              conexion.close();
              return res.status(201).json();
            });
          })()

          // (async () => {
          //   for (let promesa of promesas) {
          //     await promesa();
          //   }
          // })();
        })
        .catch((err) => {
          console.log(err);
          if (err.status) {
            return res.status(err.status).json(err);
          } else {
            return res.status(500).json(err);
          }
        });
    });
  });

}

const regitroInvolucrado = (involucrado, idReporteSiniestro) => {
  return new Promise((resolve) => {

  })

}