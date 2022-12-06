import { Router } from "express";
import { body, query } from "express-validator";
import { validarCampos } from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import { auntenticacionConductorController } from "./AuntenticacionConductorController.js";

export class IndexUsuarioControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.post(
      "/conductor/login",
      [body([
        "nombreUsuario",
        "claveAcceso"
      ]).isString(), validarCampos],
      auntenticacionConductorController
    );
  }
}