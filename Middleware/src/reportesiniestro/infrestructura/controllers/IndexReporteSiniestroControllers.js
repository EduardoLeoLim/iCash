import { Router } from "express";
import { body, param } from "express-validator";
import validarCampos from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import consultarDetallesDeReporteController from "./ConsultarDetallesDeReporteController.js";
import consultarReportesSiniestroAjustador from "./ConsultarReportesSiniestroAjustador.js";
import registrarReporteSiniestroController from "./RegistrarReporteSiniestroController.js";
import { validarToken } from "../../../compartido/infrestructura/utils/Token.js";
import validarInvolucrados from "../../../compartido/infrestructura/utils/ValidarInvolucrados.js";
import validarImagenes from "../../../compartido/infrestructura/utils/ValidarImagenes.js";

export default class IndexReporteSiniestroControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.post(
      "/conductores/reportesSiniestro",
      validarToken,
      [
        body(["latitud", "longitud"]).isFloat().toFloat(),
        body("nombre").not().isEmpty().trim().escape(),
        body([
          "claveEntidadFederativa",
          "claveMunicipio",
          "idPoliza",
          "idConductor",
        ])
          .isInt()
          .toInt(),
        body("horaAccidente").isISO8601().toDate(),
        body("involucrados").isJSON(),
        validarCampos,
        validarInvolucrados,
        validarImagenes,
      ],
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
