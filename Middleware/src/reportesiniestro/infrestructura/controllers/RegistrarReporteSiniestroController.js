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

  conexion.on("connect", (err) => {
    if (err) {
      console.log(err);
      return res.status(500).json();
    }

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
          let promesas = [];
          imagenes.forEach((imagen, indice) => {
            let promesa = registrarImagen
              .ejecutar(
                idReporteSiniestro,
                idReporteSiniestro +
                  "-" +
                  (indice + 1) +
                  imagen.name.split(".").pop()
              )
              .then((urlImagen) => {
                const pathImagen = path.join(__dirname, "../../../", urlImagen);
                imagen.mv(pathImagen, (err) => {
                  if (err) {
                    console.log(err);
                    return res.status(500).json("Error al guardar la imagen");
                  }
                });
              });

            promesas.push(promesa);
          });
          return Promise.all(promesas).then(() => {
            return idReporteSiniestro;
          });
        })
        .then((idReporteSiniestro) => {
          let promesas = [];

          involucrados.forEach((involucrado) => {
            let promesa = registrarVehiculoyInvolucrado.ejecutar(
              involucrado,
              idReporteSiniestro
            );
            promesas.push(promesa);
          });

          return Promise.all(promesas);
        })
        .then(() => {
          conexion.commit((err) => {
            if (err) {
              console.log(err);
              return res.status(500).json("Error de base de datos");
            }

            conexion.close();
            return res.status(201).json();
          });
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json("Error de base de datos");
        });
    });
  });
}
