import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { IndexCoberturaControllers } from "./cobertura/infrestructura/controllers/IndexCoberturaControllers.js";
import { IndexConductorControllers } from "./conductor/infrestructura/controllers/IndexConductorControllers.js";
import { IndexEntidadFederativaControllers } from "./entidadfederativa/infrestructura/controllers/IndexEntidadFederativaControllers.js";
import { IndexMuncipioControllers } from "./municipio/infrestructura/controllers/IndexMunicipioControllers.js";
import { IndexUsuarioControllers } from "./usuario/infrestructura/controllers/IndexUsuarioControllers.js";

export class App {
  constructor() {
    this.app = express();
    this.config();
    this.routers();
  }

  config() {
    this.app.set("port", process.env.PORT || 8000);
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use(helmet());
  }

  routers() {
    //Cobertura
    let coberturaControllers = new IndexCoberturaControllers();
    coberturaControllers.loadControllers();
    this.app.use(coberturaControllers.routers);

    //Conductor
    let conductorControlllers = new IndexConductorControllers();
    conductorControlllers.loadControllers();
    this.app.use(conductorControlllers.routers);

    //EntidadFederativa
    let entidadFederativaControllers = new IndexEntidadFederativaControllers();
    entidadFederativaControllers.loadControllers();
    this.app.use(entidadFederativaControllers.routers);

    //Municipio
    let municipioController = new IndexMuncipioControllers();
    municipioController.loadControllers();
    this.app.use(municipioController.routers);

    //Dictamen

    //Empleado

    //Imagen

    //Involucrado

    //Plazo

    //Poliza

    //Reporte Siniestro

    //Usuario
    let usuariosController = new IndexUsuarioControllers();
    usuariosController.loadControllers();
    this.app.use(usuariosController.routers);
    //Vehiculo
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Servidor en puerto " + this.app.get("port"));
    });
  }
}
