import { Router } from "express";
import { consultarEntidadesFederativasController } from "./ConsultarEntidadesFederativasController.js";

export class IndexEntidadFederativaControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.get(
      "/entidadesFederativas",
      consultarEntidadesFederativasController
    );
  }
}
