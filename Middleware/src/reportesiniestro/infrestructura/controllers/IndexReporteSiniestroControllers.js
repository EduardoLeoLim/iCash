import { Router } from "express";
import { param } from "express-validator";
import validarCampos from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import consultarDetallesDeReporteController from "./ConsultarDetallesDeReporteController.js";
import consultarReportesSiniestroAjustador from "./ConsultarReportesSiniestroAjustador.js";
import registrarReporteSiniestroController from "./RegistrarReporteSiniestroController.js";
import { validarToken } from "../../../compartido/infrestructura/utils/Token.js";

export default class IndexReporteSiniestroControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.post(
      "/conductor/reportesSiniestro",
      registrarReporteSiniestroController
    );

    this.routers.get(
      "/ajustadores/:idEmpleado/reportesSiniestro",
      [param("idEmpleado").isInt(), validarCampos],
      consultarReportesSiniestroAjustador
    );

    this.routers.get(
      "/reportesSiniestro/:idReporte",
      //validarToken,
      [param("idReporte").isInt(), validarCampos],
      consultarDetallesDeReporteController
    );
  }
}
