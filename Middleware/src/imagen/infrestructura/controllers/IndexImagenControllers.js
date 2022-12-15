import { Router } from "express";
import consultarImagenController from "./ConsultarImagenController.js";

export default class IndexImagenControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.get(
      "/reportesSiniestro/imagenes/:nombre",
      consultarImagenController
    );
  }
}
