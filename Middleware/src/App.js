import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { IndexCoberturaControllers } from "./cobertura/infrestructura/controllers/IndexCoberturaControllers.js";
import { IndexConductorControllers } from "./conductor/infrestructura/controllers/IndexConductorControllers.js";

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

    //Dictamen

    //Empleado

    //Imagen

    //Involucrado

    //Plazo

    //Poliza

    //Reporte Siniestro

    //Usuario

    //Vehiculo
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Servidor en puerto " + this.app.get("port"));
    });
  }
}
