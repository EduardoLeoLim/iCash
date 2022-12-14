import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import * as fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function consultarImagenController(req, res) {
  const nombre = req.params.nombre;
  const pathImagen = path.join(__dirname, `../../../../imagenes/${nombre}`);
  if (!fs.existsSync(pathImagen)) {
    return res.sendStatus(404);
  }

  res.sendFile(pathImagen);
}
