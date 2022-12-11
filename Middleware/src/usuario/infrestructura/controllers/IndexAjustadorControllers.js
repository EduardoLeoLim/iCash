import { Router } from "express";
import { body, query } from "express-validator";
import { validarCampos } from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import { auntenticacionAjustadorController } from "./AuntenticacionAjustadorController.js";

export class IndexAjustadorControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.post(
      "/ajustador/login",
      [body(["nombreUsuario", "claveAcceso"]).isString(), validarCampos],
      auntenticacionAjustadorController
    );
  }
}