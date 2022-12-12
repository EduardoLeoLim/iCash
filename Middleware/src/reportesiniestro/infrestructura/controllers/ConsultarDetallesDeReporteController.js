import { Connection } from "tedious";
import { Config } from "../../../compartido/infrestructura/conexiones/Conexion.js";
import SqlServerReporteSiniestroRepositorio from "../persistencia/SqlServerReporteSiniestroRepositorio.js";

export default function consultarDetallesDeReporteController( req, res) {
    const idReporte = req.params.idReporte;
    let conexion = new Connection(Config);

    conexion.connect((err) => {
        if (err) {
            console.log("Error: ", err);
            res.status(500).json();
            return;
        }

        let reporteSiniestroRepositorio = new SqlServerReporteSiniestroRepositorio(conexion);

    }
}