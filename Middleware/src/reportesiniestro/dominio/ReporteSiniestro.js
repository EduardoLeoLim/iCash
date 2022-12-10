export default class ReporteSiniestro {
  constructor(
    nombre,
    estatus,
    fecha,
    latitud,
    longitud,
    nombreConductor,
    apellidoPaterno,
    apellidoMaterno,
    idConductor,
    id
  ) {
    this.nombre = nombre;
    this.estatus = estatus;
    this.fecha = fecha;
    this.latitud = latitud;
    this.longitud = longitud;
    this.conductor = {
      id: idConductor,
      nombre: nombreConductor + " " + apellidoPaterno + " " + apellidoMaterno,
    };
    this.id = id;
  }
}
