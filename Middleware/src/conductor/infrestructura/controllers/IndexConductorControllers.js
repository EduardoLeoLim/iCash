import { Router } from "express";
import ConsultarConductoresController from "./ConsultarConductoresController.js";
import registrarConductorController from "./RegistrarConductorController.js";

export default class IndexConductorControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.get("/conductores", ConsultarConductoresController);
    this.routers.post("/conductores", registrarConductorController);
  }
}
