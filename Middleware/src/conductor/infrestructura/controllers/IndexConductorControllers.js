import { Router } from "express";
import { ConsultarConductoresController } from "./ConsultarConductoresController.js";
import { RegistrarConductorController } from "./RegistrarConductorController.js";

export class IndexConductorControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.get("/conductores", ConsultarConductoresController);
    this.routers.post("/conductores", RegistrarConductorController);
  }
}
