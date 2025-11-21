// ===============================
// CONTROLADOR DE CONTACTO
// ===============================
const ContactoController = {
  init: function() {
    ContactoView.init("formulario-contacto");
    ContactoView.renderFormulario();
    this.bindEvents();
  },

  bindEvents: function() {
    const self = this;

    // Validación en tiempo real al salir del campo (blur)
    $("#formulario-contacto").on("blur", "#nombre, #correo, #telefono, #asunto, #mensaje", function() {
      const campo = $(this).attr("id");
      const valor = $(this).val();
      self.validarCampoIndividual(campo, valor);
    });

    // Validación mientras escribe (opcional, más suave)
    $("#formulario-contacto").on("input", "#nombre, #correo, #telefono, #asunto, #mensaje", function() {
      const campo = $(this).attr("id");
      // Solo limpiar el error si el campo tenía error previo
      if ($(this).hasClass("is-invalid")) {
        const valor = $(this).val();
        self.validarCampoIndividual(campo, valor);
      }
    });

    // Envío del formulario
    $(document).on("submit", "#form_js", function(event) {
      event.preventDefault();
      self.enviarFormulario();
    });
  },

  validarCampoIndividual: function(campo, valor) {
    let validacion;

    switch(campo) {
      case "nombre":
        validacion = ContactoModel.validarNombre(valor);
        break;
      case "correo":
        validacion = ContactoModel.validarCorreo(valor);
        break;
      case "telefono":
        validacion = ContactoModel.validarTelefono(valor);
        break;
      case "asunto":
        validacion = ContactoModel.validarAsunto(valor);
        break;
      case "mensaje":
        validacion = ContactoModel.validarMensaje(valor);
        break;
      default:
        return;
    }

    if (validacion.valido) {
      ContactoView.limpiarErrorCampo(campo);
    } else {
      ContactoView.mostrarErrorCampo(campo, validacion.mensaje);
    }
  },

  enviarFormulario: function() {
    const datos = ContactoView.obtenerDatosFormulario();
    const validacion = ContactoModel.validarTodo(datos);

    if (!validacion.valido) {
      // Mostrar TODOS los errores simultáneamente
      ContactoView.mostrarTodosLosErrores(validacion.errores);

      // Contar errores
      const numErrores = Object.keys(validacion.errores).length;
      const mensajeResumen = numErrores === 1
        ? " Hay 1 error en el formulario. Por favor corrígelo antes de continuar."
        : ` Hay ${numErrores} errores en el formulario. Por favor corrígelos antes de continuar.`;

      $(".response").removeClass().addClass("response alert alert-danger")
        .html(`<strong>${mensajeResumen}</strong>`)
        .fadeIn();

      return;
    }

    // Si todo es válido, proceder con el envío
    ContactoModel.data = datos;
    ContactoView.mostrarCargando("Enviando tu mensaje...");

    // Simulación del envío
    setTimeout(() => {
      ContactoView.ocultarCargando();
      ContactoView.mostrarExito("¡Tu mensaje ha sido enviado correctamente! Nos pondremos en contacto contigo pronto.");

      // Reset después de 3 segundos
      setTimeout(() => {
        ContactoView.resetFormulario();
        ContactoModel.resetData();
      }, 3000);
    }, 2000);
  }
};
