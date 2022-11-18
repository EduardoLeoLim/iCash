import { ApplicationError } from "./ApplicationError.js";

export class ResourceNotFoundError extends ApplicationError {
  constructor(message) {
    if (message) {
      super(404, message);
    } else {
      super(404, "Recurso no encontrado");
    }
  }
}
