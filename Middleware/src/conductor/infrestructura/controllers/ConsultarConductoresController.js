export default function ConsultarConductoresController(req, res) {
  console.log(req.body);

  res.status(200).send({ hola: 5 });
}
