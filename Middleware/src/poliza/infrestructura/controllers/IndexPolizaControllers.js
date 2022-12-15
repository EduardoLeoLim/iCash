import { Router } from "express";
import { param } from "express-validator";
import validarCampos from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import consultarPolizasPorIdConductor from "./ConsultarPolizasPorIdConductor.js";

export default class IndexPolizaControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.get(
      "/conductores/:idConductor/polizas",
      [param("idConductor").isInt().toInt(), validarCampos],
      consultarPolizasPorIdConductor
    );
  }
}
