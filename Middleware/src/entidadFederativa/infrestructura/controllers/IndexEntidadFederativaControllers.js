import { Router } from "express";
import { query } from "express-validator";
import validarCampos from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import consultarEntidadesFederativasController from "./ConsultarEntidadesFederativasController.js";

export default class IndexEntidadFederativaControllers {
  constructor() {
    this.routers = Router();
  } 

  loadControllers() {
    this.routers.get(
      "/entidadesFederativas",
      [query(["limit", "offset"]).optional().isInt(), validarCampos],
      consultarEntidadesFederativasController
    );
  }
}
