import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import SqlServerReporteSiniestroRepositorio from "../persistencia/SqlServerReporteSiniestroRepositorio.js";
import SqlServerImagenRepositorio from './../../../imagen/infrestructura/persistencia/SqlServerImagenRepositorio.js';
import SqlServerCoberturaRepositorio from './../../../cobertura/infrestructura/persistencia/SqlServerCoberturaRepositorio.js';
import SqlServerPolizaRepositorio from './../../../poliza/infrestructura/persistencia/SqlServerPolizaRepositorio.js';
import SqlServerPlazoRepositorio from './../../../plazo/infrestructura/persistencia/SqlServerPlazoRepositorio.js';
import SqlServerInvolucradoRepositorio from './../../../involucrado/infrestructura/persistencia/SqlServerInvolucradoRepositorio.js';
import SqlServerVehiculoRepositorio from './../../../vehiculo/infrestructura/persistencia/SqlServerVehiculoRepositorio.js';
import ConsultarReporteSiniestroPorId from './../../aplicacion/ConsultarReporteSiniestroPorId.js';
import ConsultarImagenesDeReporte from './../../../imagen/aplicacion/ConsultarImagenesDeReporte.js';
import ConsultarCoberturaPorId from './../../../cobertura/aplicacion/ConsultarCoberturaPorId.js';
import ConsultarPlazoPorId from './../../../plazo/aplicacion/ConsultarPlazoPorId.js';
import ConsultarInvolucradosPorIdReporte from './../../../involucrado/aplicacion/ConsultarInvolucradosPorIdReporte.js';
import ConsultarVehiculoPorId from './../../../vehiculo/aplicacion/ConsultarVehiculoPorId.js';
import ConsultarPolizaPorId from './../../../poliza/aplicacion/ConsultarPolizaPorId.js';

export default function consultarDetallesDeReporteController( req, res) {
    const idReporte = req.params.idReporte;
    let conexion = new Connection(Config);

    conexion.connect((err) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).json();
            return;
        }

        let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(conexion);
        let imagenRepositorio = new SqlServerImagenRepositorio(conexion);
        let coberturaRepositorio = new SqlServerCoberturaRepositorio(conexion);
        let polizaRepositorio = new SqlServerPolizaRepositorio(conexion);
        let plazoRepositorio = new SqlServerPlazoRepositorio(conexion);
        let involucradoRepositorio = new SqlServerInvolucradoRepositorio(conexion);
        let vehiculoRepositorio = new SqlServerVehiculoRepositorio(conexion);

        let consultarReporteSiniestroPorId = new ConsultarReporteSiniestroPorId(reporteSiniestroRepositorio);
        let consultarImagenesDeReporte = new ConsultarImagenesDeReporte(imagenRepositorio);
        let consultarCoberturaPorId = new ConsultarCoberturaPorId(coberturaRepositorio);
        let consultarPolizaPorId = new ConsultarPolizaPorId(polizaRepositorio);
        let consultarPlazoPorId = new ConsultarPlazoPorId(plazoRepositorio);
        let consultarInvolucradosPorIdReporte = new ConsultarInvolucradosPorIdReporte(involucradoRepositorio);
        let consultarVehiculoPorId = new ConsultarVehiculoPorId(vehiculoRepositorio);

        const detallesReporte = {};

        consultarReporteSiniestroPorId.run(idReporte)
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
        }).then((detallesReporte) => {
            const fotos = [];
            
            return consultarImagenesDeReporte.ejecutar(detallesReporte.id)
            .then((imagenes) => {
                console.log(imagenes);
                imagenes.forEach((imagen) => {
                    
                    fotos.push(imagen.urlImagen);
                });

                detallesReporte.fotos = fotos;
                return detallesReporte;
            })
        }).then((detallesReporte) => {
             return consultarPolizaPorId.ejecutar(detallesReporte.poliza)
             .then((poliza) => {
                
                const datosPoliza = {
                    id: poliza.id,
                    cobertura: poliza.idCobertura,
                    plazo: poliza.idPlazo,
                    precioFinal: poliza.precioFinal,
                }
                detallesReporte.poliza = datosPoliza;
                
                return detallesReporte;
            })   
        }).then((detallesReporte) => {
            return consultarCoberturaPorId.run(detallesReporte.poliza.cobertura)
            .then((cobertura) => {

                const coberturaDatos ={
                    nombre: cobertura.nombre, 
                    tipo: cobertura.tipo
                }
                detallesReporte.poliza.cobertura = coberturaDatos;
                return detallesReporte;
            })
        }).then((detallesReporte) => {
            return consultarPlazoPorId.ejecutar(detallesReporte.poliza.plazo)
            .then((plazo) => {
                const plazoDatos = {
                    nombre: plazo.nombre,
                    tipo: plazo.tipo
                }
                detallesReporte.poliza.plazo = plazoDatos;
                return detallesReporte;
            })
        }).then((detallesReporte) => {
            return consultarInvolucradosPorIdReporte.ejecutar(detallesReporte.id)
            .then((involucrados) => {
                const involucradosDatos = [];
                involucrados.forEach((involucrado) => {
                    const involucradoDatos = {
                        id: involucrado.id,
                        nombre: involucrado.nombre,
                        vehiculo: involucrado.idVehiculo
                    }
                    involucradosDatos.push(involucradoDatos);
                });
                detallesReporte.involucrados = involucradosDatos;
                return detallesReporte;
            })
        }).then((detallesReporte) => {
            detallesReporte.involucrados.forEach((involucrado) => {
                consultarVehiculoPorId.ejecutar(involucrado.vehiculo)
                .then((vehiculo) => {
                    const vehiculoDatos = {
                        id: vehiculo.id,
                        marca: vehiculo.marca,
                        modelo: vehiculo.modelo,
                        anio: vehiculo.anio,
                        placas: vehiculo.placas
                    }
                    involucrado.vehiculo = vehiculoDatos;
                    
                })  
            })
            //return vehiculos;
            res.status(200).json(detallesReporte);
        })
});
}