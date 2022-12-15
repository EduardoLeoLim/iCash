export default class IndexMarcaControllers {
    constructor() {
      this.routers = Router();
    } 
  
    loadControllers() {
      this.routers.get(
        "/marcas",
        [query(["limit", "offset"]).optional().isInt(), validarCampos],
        consultarEntidadesFederativasController
      );
    }
  }
  