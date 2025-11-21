// ===============================
// CONTROLADOR DE PAGO
// ===============================
const PagoController = {
  init: function() {
    PagoView.init("formulario-pago");
    PagoView.renderFormulario();
    this.bindEvents();
  },

  bindEvents: function() {
    const self = this;

    // Validación en tiempo real al salir del campo
    $("#formulario-pago").on("blur", "#nombre, #correo, #telefono, #direccion, #ciudad, #postal, #tarjeta, #expiracion, #cvv", function() {
      const campo = $(this).attr("id");
      const valor = $(this).val();
      self.validarCampoIndividual(campo, valor);
    });

    // Validación mientras escribe (si el campo tenía error)
    $("#formulario-pago").on("input", "#nombre, #correo, #telefono, #direccion, #ciudad, #postal, #tarjeta, #expiracion, #cvv", function() {
      const campo = $(this).attr("id");
      if ($(this).hasClass("is-invalid")) {
        const valor = $(this).val();
        self.validarCampoIndividual(campo, valor);
      }
    });

    // Envío del formulario
    $(document).on("submit", "#pagoForm", function(event) {
      event.preventDefault();
      self.procesarPago();
    });
  },

  validarCampoIndividual: function(campo, valor) {
    let validacion;

    switch(campo) {
      case "nombre":
        validacion = PagoModel.validarNombre(valor);
        break;
      case "correo":
        validacion = PagoModel.validarCorreo(valor);
        break;
      case "telefono":
        validacion = PagoModel.validarTelefono(valor);
        break;
      case "direccion":
        validacion = PagoModel.validarDireccion(valor);
        break;
      case "ciudad":
        validacion = PagoModel.validarCiudad(valor);
        break;
      case "postal":
        validacion = PagoModel.validarPostal(valor);
        break;
      case "tarjeta":
        validacion = PagoModel.validarTarjeta(valor);
        break;
      case "expiracion":
        validacion = PagoModel.validarExpiracion(valor);
        break;
      case "cvv":
        validacion = PagoModel.validarCVV(valor);
        break;
      default:
        return;
    }

    if (validacion.valido) {
      PagoView.limpiarErrorCampo(campo);
    } else {
      PagoView.mostrarErrorCampo(campo, validacion.mensaje);
    }
  },

  procesarPago: function() {
    const datos = PagoView.obtenerDatosFormulario();
    const validacion = PagoModel.validarTodo(datos);

    if (!validacion.valido) {
      PagoView.mostrarTodosLosErrores(validacion.errores);

      const numErrores = Object.keys(validacion.errores).length;
      const mensajeResumen = numErrores === 1
        ? " Hay 1 error en el formulario. Por favor corrígelo antes de continuar."
        : ` Hay ${numErrores} errores en el formulario. Por favor corrígelos antes de continuar.`;

      $(".response").removeClass().addClass("response alert alert-danger")
        .html(`<strong>${mensajeResumen}</strong>`)
        .fadeIn();

      return;
    }

    // Si todo es válido, proceder con el pago
    PagoModel.data = datos;
    PagoView.mostrarCargando("Procesando pago...");

    // Simulación del procesamiento
    setTimeout(() => {
      PagoView.ocultarCargando();
      PagoView.mostrarExito("¡Pago procesado exitosamente! Gracias por tu compra en Brillo Eterno.");

      // Reset después de 3 segundos
      setTimeout(() => {
        PagoView.resetFormulario();
        PagoModel.resetData();
      }, 3000);
    }, 2000);
  }
};
