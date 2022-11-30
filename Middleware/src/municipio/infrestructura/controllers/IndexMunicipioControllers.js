import { Router } from "express";
import { param } from "express-validator";
import { validarCampos } from "../../../compartido/infrestructura/utils/ValidarCampos.js";
import { consultarMunicipiosController } from "./ConsultarMunicipiosController.js";

export class IndexMuncipioControllers {
    constructor() {
        this.routers = Router();
    }

    loadControllers(){
        this.routers.get("/entidadesFederativas/:claveEntidadFederativa/municipios", [param("claveEntidadFederativa").isInt(), validarCampos], consultarMunicipiosController)
    }
}