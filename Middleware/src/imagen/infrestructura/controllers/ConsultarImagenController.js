import * as path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default function consultarImagenController(req, res) {
  const nombre = req.params.nombre;
  const pathImagen = path.join(__dirname, `../../../../imagenes/${nombre}`);

  res.sendFile(pathImagen);
}
