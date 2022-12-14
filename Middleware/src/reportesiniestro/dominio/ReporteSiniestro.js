export default class ReporteSiniestro {
  constructor(
    nombre,
    estatus,
    fechaRegistro,
    horaAccidente,
    idMunicipio,
    latitud,
    longitud,
    idEmpleado,
    idDictamen,
    idPoliza,
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
    this.idEmpleado = idEmpleado;
    this.idDictamen = idDictamen;
    this.idPoliza = idPoliza;
    this.conductor = {
      id: idConductor,
      nombre: nombreConductor + " " + apellidoPaterno + " " + apellidoMaterno,
    };
    this.id = id;
  }

  dictaminar = (idDictamen) => {
    this.idDictamen = idDictamen;
    this.estatus = "Dictaminado";
  };

  asignarAjustador = (idAjustador) => {
    this.idEmpleado = idAjustador;
  };
}
