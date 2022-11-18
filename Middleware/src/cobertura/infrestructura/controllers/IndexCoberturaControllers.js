import { Router } from "express";
import { param } from "express-validator";
import { validarCampos } from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import { consultarCoberturaPorIdController } from "./ConsultarCoberturaPorIdController.js";
import { consultarCoberturasController } from "./ConsultarCoberturasController.js";

export class IndexCoberturaControllers {
  constructor() {
    this.routers = Router();
  }

  loadControllers() {
    this.routers.get("/coberturas", consultarCoberturasController);
    this.routers.get(
      "/coberturas/:id",
      [param("id").isInt(), validarCampos],
      consultarCoberturaPorIdController
    );
  }
}
