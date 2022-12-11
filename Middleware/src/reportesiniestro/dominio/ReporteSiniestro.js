export default class ReporteSiniestro {
  constructor(
    nombre,
    estatus,
    fechaRegistro,
    horaAccidente,
    idMunicipio,
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
    this.fecha = fechaRegistro;
    this.hora = horaAccidente;
    this.idMunicipio = idMunicipio;
    this.latitud = latitud;
    this.longitud = longitud;
    this.conductor = {
      id: idConductor,
      nombre: nombreConductor + " " + apellidoPaterno + " " + apellidoMaterno,
    };
    this.id = id;
  }
}
