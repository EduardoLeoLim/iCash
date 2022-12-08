import { Connection, Request } from "tedious";
import { Config } from "./src/compartido/infrestructura/conexiones/Conexion.js";

let conexion = new Connection(Config)

let request = new Request("insert into Cobertura (nombre, precio, tipo) values ('nombre prueba', 10000, 'tipo prueba');", function(error) {
  if (error) {
    console.log("Error consulta" + error)

    conexion.rollbackTransaction(function(error) {
      if (error) {
        console.log("Rollback: " + error)
      }
    })
  } else {
    console.log("Terminado")
    conexion.commitTransaction(function(error) {
      if (error)
        console.log("Commit: " + error)
      conexion.close()
    })
  }
})

conexion.connect(function(error) {
  if (error) {
    console.log("Connect: " + error)
  } else {
    conexion.beginTransaction(function(error) {
      if (error) {
        console.log("Begin: " + error)
      } else {
        conexion.execSql(request)

      }
    })
  }
})


