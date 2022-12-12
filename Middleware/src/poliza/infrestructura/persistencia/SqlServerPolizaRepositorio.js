
import Poliza from './../../dominio/Poliza';
import ApplicationError from './../../../compartido/aplicacion/excepciones/ApplicationError';
export default class SqlServerPolizaRepositorio {
    constructor(conexion){
        this.conexion = conexion;
    }

    buscar = (criteria) =>
    new Promise((resolve, reject) => {
      let polizas = [];

      let criteriaParser = new SqlServerCriteriaParser([], "Poliza", criteria);
      let { consulta, parameters } = criteriaParser.parse();

      console.log(consulta);

      let request = new Request(consulta, (err, rowCount) => {
        if (err) {
          console.log("Error PolizaRepositorio: " + err);
          reject(new ApplicationError(500, "Error base de datos"));
        } else {
          console.log(rowCount + " filas");
          resolve(polizas);
        }
      });

      parameters.forEach((parameter) => {
        request.addParameter(
          parameter.get("param"),
          TYPES.VarChar,
          parameter.get("value")
        );
      });

      request.on("row", (columnas) => {
        let nombre = columnas.nombre.value;
        let id = columnas.id.value;
        let idPlazo = columnas.idPlazo.value;
        let idCobertura = columnas.idCobertura.value;
        let precioFinal = columnas.precioFinal.value;
        let idConductor = columnas.idConductor.value;

        let poliza = new Poliza(nombre, precioFinal, idConductor, idPlazo, idCobertura, id);
        
        polizas.push(poliza);
      });

      this.conexion.execSql(request);
    });
}