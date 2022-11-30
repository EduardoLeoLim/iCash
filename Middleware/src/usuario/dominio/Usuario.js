export class Usuario {
  constructor(
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    nombreUsuario,
    claveAcceso,
    estado,
    id
  ) {
    this.nombre = nombre;
    this.apellidoPaterno = apellidoPaterno;
    this.apellidoMaterno = apellidoMaterno;
    this.nombreUsuario = nombreUsuario;
    this.claveAcceso = claveAcceso;
    this.estado = estado;
    this.id = id;
  }
}
