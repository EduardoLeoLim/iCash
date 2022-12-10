export default function registrarReporteSiniestroController(req, res) {
  console.log(req.body);
  console.log(req.files);
  res.status(201).json();
}
