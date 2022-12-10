import jwt from "jsonwebtoken";

export function generarToken(usuario) {
  return jwt.sign({ usuario }, process.env.SECRET, { expiresIn: "30m" });
}

export function validarToken(req, res, next) {
  const accessToken = req.headers["authorization"];
  if (!accessToken) return res.status(401).send("Acceso denegado");

  jwt.verify(accessToken, process.env.SECRET, (error, usuario) => {
    if (error)
      return res
        .status(401)
        .send("Acceso denegado, token expirado o incorrecto");
    next();
  });
}
