import { Router } from "express";
import { body, param } from "express-validator";
import validarCampos from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import  registrarDictamenReporteController from "./RegistrarDictamenReporteController.js";
import { validarToken } from "../../../compartido/infrestructura/utils/Token.js";

export default class IndexDictamenControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.post(
      "/ajustador/:idReporteSiniestro/dictaminar",
      validarToken,
      [param("idReporteSiniestro").isInt(),body("descripcion").isString().isLength({min:1,max:250}),
      body("fecha").isDate(),validarCampos],
      registrarDictamenReporteController
    );
  }
}
