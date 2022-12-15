import { Router } from "express";
import { query } from "express-validator";
import { validarCampos } from "../../middlewares/validar-campos.js";
import { consultarMarcaController } from "./ConsultarMarcaController.js";

export default class IndexMarcaControllers {
    constructor() {
      this.routers = Router();
    } 
  
    loadControllers() {
      this.routers.get(
        "/marcas",
        [query(["limit", "offset"]).optional().isInt(), validarCampos],
        consultarMarcaController
      );
    }
  }
  