class ResponseStructure {
  constructor(status = 200, message = "", data = {}) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  // Método estático para respuestas exitosas
  static success(data = {}, message = "Operación exitosa") {
    return new ResponseStructure(200, message, data);
  }

  // Método estático para respuestas de error
  static error(message = "Ocurrió un error", status = 500) {
    return new ResponseStructure(status, message, {});
  }
}

module.exports = ResponseStructure;
