import { Router } from "express";
import { registrarReporteSiniestroController } from "./RegistrarReporteSiniestroController.js";

export class IndexReporteSiniestroControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.post(
      "/conductor/reportesSiniestro",
      registrarReporteSiniestroController
    );
  }
}
