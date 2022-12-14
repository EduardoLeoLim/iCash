import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import morgan from "morgan";
import IndexCoberturaControllers from "./cobertura/infrestructura/controllers/IndexCoberturaControllers.js";
import IndexConductorControllers from "./conductor/infrestructura/controllers/IndexConductorControllers.js";
import IndexEntidadFederativaControllers from "./entidadfederativa/infrestructura/controllers/IndexEntidadFederativaControllers.js";
import IndexMuncipioControllers from "./municipio/infrestructura/controllers/IndexMunicipioControllers.js";
import IndexUsuarioControllers from "./usuario/infrestructura/controllers/IndexUsuarioControllers.js";
import IndexReporteSiniestroControllers from "./reportesiniestro/infrestructura/controllers/IndexReporteSiniestroControllers.js";
import IndexDictamenControllers from "./dictamen/infrestructura/controllers/IndexDictamenControllers.js";
import IndexImagenControllers from "./imagen/infrestructura/controllers/IndexImagenControllers.js";

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
    this.app.use(cors());
    dotenv.config();

    const fileUploadOptions = {};
    this.app.use(fileUpload(fileUploadOptions));
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
    let dictamenControllers = new IndexDictamenControllers();
    dictamenControllers.loadControllers();
    this.app.use(dictamenControllers.routers);

    //Empleado

    //Imagen
    let imagenControllers = new IndexImagenControllers();
    imagenControllers.loadControllers();
    this.app.use(imagenControllers.routers);

    //Involucrado

    //Plazo

    //Poliza

    //Reporte Siniestro
    let reporteSiniestroController = new IndexReporteSiniestroControllers();
    reporteSiniestroController.loadControllers();
    this.app.use(reporteSiniestroController.routers);

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
