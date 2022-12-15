export default function validarImagenes(req, res, next) {
  if (!req.files)
    return res.status(400).json({ msg: "No se encontraron imágenes" });
  let imagenesKey = Object.keys(req.files);
  let imagenes = [];

  for (let i = 0; i < imagenesKey.length; i++) {
    let imagen = req.files[imagenesKey[i]];
    if (imagen.mimetype !== "image/jpeg" && imagen.mimetype !== "image/png") {
      return res.status(400).json({ msg: "Formato de imagen no válido" });
    }
    imagenes.push(imagen);
  }

  if (!(imagenesKey.length > 3 && imagenesKey.length < 9))
    return res
      .status(400)
      .json({ msg: "El número de imágenes debe ser mayor a 3 y menor a 9" });

  req.files = imagenes;

  next();
}
