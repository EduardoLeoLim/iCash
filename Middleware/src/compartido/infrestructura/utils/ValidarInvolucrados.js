export default function validarInvolucrados(req, res, next) {
  const involucrados = JSON.parse(req.body.involucrados);

  if (!Array.isArray(involucrados))
    return res.status(400).json({ msg: "Involucrados debe ser un arreglo" });

  for (let i = 0; i < involucrados.length; i++) {
    if (!involucrados[i].nombre)
      return res.status(400).json({ msg: "Nombre es requerido" });

    if (involucrados[i].vehiculo) {
      const vehiculo = involucrados[i].vehiculo;
      if (!vehiculo.año || !Number.isInteger(vehiculo.año))
        return res.status(400).json({ msg: "Año es requerido" });
      if (!vehiculo.idMarca || !Number.isInteger(vehiculo.idMarca))
        return res
          .status(400)
          .json({ msg: "IdMarca es requerido y debe ser un número entero" });
      if (!vehiculo.modelo || !(typeof vehiculo.modelo === "string"))
        return res
          .status(400)
          .json({ msg: "Modelo es requerido y debe ser una cadena de texto" });
      if (!vehiculo.numPlacas || !(typeof vehiculo.numPlacas === "string"))
        return res.status(400).json({
          msg: "NumPlacas es requerido y debe ser una cadena de texto",
        });
      if (!vehiculo.color || !(typeof vehiculo.color === "string"))
        return res
          .status(400)
          .json({ msg: "Color es requerido y debe ser una cadena de texto" });
      if (!vehiculo.numSerie || !(typeof vehiculo.numSerie === "string"))
        return res.status(400).json({
          msg: "NumSerie es requerido y debe ser una cadena de texto",
        });
    }
  }

  req.body.involucrados = involucrados;
  next();
}
