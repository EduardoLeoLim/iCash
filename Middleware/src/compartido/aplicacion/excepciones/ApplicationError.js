export class ApplicationError extends Error {
  constructor(status, error) {
    if (error) {
      super(error);
    } else {
      super("Error de aplicación");
    }

    if (status) {
      this.status = status;
    } else {
      this.status = 500;
    }

    this.error = error;
  }
}
