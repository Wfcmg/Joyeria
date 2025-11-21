// ===============================
// CONTROLADOR DE CITA
// ===============================
const CitaController = {
  init: function() {
    CitaView.init("formulario-cita");
    CitaView.renderFormulario();
    this.bindEvents();
  },

  bindEvents: function() {
    const self = this;

    // Validación en tiempo real al salir del campo
    $("#formulario-cita").on("blur", "#nombreCita, #correoCita, #fechaCita, #horaCita", function() {
      const campo = $(this).attr("id");
      const valor = $(this).val();
      self.validarCampoIndividual(campo, valor);
    });

    // Validación mientras escribe
    $("#formulario-cita").on("input", "#nombreCita, #correoCita, #fechaCita, #horaCita", function() {
      const campo = $(this).attr("id");
      if ($(this).hasClass("is-invalid")) {
        const valor = $(this).val();
        self.validarCampoIndividual(campo, valor);
      }
    });

    // Envío del formulario
    $(document).on("submit", "#formCita", function(event) {
      event.preventDefault();
      self.agendarCita();
    });
  },

  validarCampoIndividual: function(campo, valor) {
    let validacion;

    switch(campo) {
      case "nombreCita":
        validacion = CitaModel.validarNombre(valor);
        break;
      case "correoCita":
        validacion = CitaModel.validarCorreo(valor);
        break;
      case "fechaCita":
        validacion = CitaModel.validarFecha(valor);
        break;
      case "horaCita":
        validacion = CitaModel.validarHora(valor);
        break;
      default:
        return;
    }

    if (validacion.valido) {
      CitaView.limpiarErrorCampo(campo);
    } else {
      CitaView.mostrarErrorCampo(campo, validacion.mensaje);
    }
  },

  agendarCita: function() {
    const datos = CitaView.obtenerDatosFormulario();
    const validacion = CitaModel.validarTodo(datos);

    if (!validacion.valido) {
      CitaView.mostrarTodosLosErrores(validacion.errores);

      const numErrores = Object.keys(validacion.errores).length;
      const mensajeResumen = numErrores === 1
        ? " Hay 1 error en el formulario. Por favor corrígelo antes de continuar."
        : ` Hay ${numErrores} errores en el formulario. Por favor corrígelos antes de continuar.`;

      $(".response").removeClass().addClass("response alert alert-danger")
        .html(`<strong>${mensajeResumen}</strong>`)
        .fadeIn();

      return;
    }

    CitaModel.data = datos;
    CitaView.mostrarCargando("Agendando tu cita...");

    setTimeout(() => {
      CitaView.ocultarCargando();
      CitaView.mostrarExito("¡Tu cita ha sido agendada correctamente! Te esperamos en Brillo Eterno.");

      setTimeout(() => {
        CitaView.resetFormulario();
        CitaModel.resetData();
      }, 3000);
    }, 2000);
  }
};
