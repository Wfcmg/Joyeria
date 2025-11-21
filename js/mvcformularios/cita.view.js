// ===============================
// VISTA DE CITA
// ===============================
const CitaView = {
  contenedor: null,

  init: function(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
  },

  renderFormulario: function() {
    if (!this.contenedor) return;

    const formCita = document.createElement("form");
    formCita.id = "formCita";
    formCita.setAttribute("novalidate", true);

    const camposCita = [
      { label: "Nombre Completo", type: "text", id: "nombreCita", placeholder: "Ej: María González" },
      { label: "Correo Electrónico", type: "email", id: "correoCita", placeholder: "Ej: maria@ejemplo.com" },
      { label: "Fecha de la Cita", type: "date", id: "fechaCita", placeholder: "" },
      { label: "Hora de la Cita", type: "time", id: "horaCita", placeholder: "" }
    ];

    camposCita.forEach(campo => {
      const div = document.createElement("div");
      div.classList.add("mb-3");

      const label = document.createElement("label");
      label.classList.add("form-label");
      label.setAttribute("for", campo.id);
      label.innerHTML = campo.label + ' <span class="text-danger">*</span>';

      const input = document.createElement("input");
      input.type = campo.type;
      input.id = campo.id;
      if (campo.placeholder) input.placeholder = campo.placeholder;
      input.classList.add("form-control");

      const errorDiv = document.createElement("div");
      errorDiv.id = `error-${campo.id}`;
      errorDiv.classList.add("invalid-feedback");
      errorDiv.style.display = "none";

      div.appendChild(label);
      div.appendChild(input);
      div.appendChild(errorDiv);
      formCita.appendChild(div);
    });

    // Campo adicional (comentario opcional)
    const divComentario = document.createElement("div");
    divComentario.classList.add("mb-3");

    const labelComentario = document.createElement("label");
    labelComentario.classList.add("form-label");
    labelComentario.setAttribute("for", "comentarioCita");
    labelComentario.textContent = "Comentarios adicionales (opcional)";

    const textarea = document.createElement("textarea");
    textarea.classList.add("form-control");
    textarea.id = "comentarioCita";
    textarea.rows = 3;
    textarea.placeholder = "Comparte detalles adicionales sobre tu cita (opcional)";

    divComentario.appendChild(labelComentario);
    divComentario.appendChild(textarea);
    formCita.appendChild(divComentario);

    // Botón enviar
    const botonCita = document.createElement("button");
    botonCita.type = "submit";
    botonCita.id = "btnAgendar";
    botonCita.textContent = "Agendar Cita";
    botonCita.classList.add("btn", "boton-dorado", "w-100");
    formCita.appendChild(botonCita);

    this.contenedor.appendChild(formCita);
  },

  mostrarErrorCampo: function(campo, mensaje) {
    const input = $(`#${campo}`);
    const errorDiv = $(`#error-${campo}`);

    input.addClass("is-invalid");
    errorDiv.text(mensaje).show();
  },

  limpiarErrorCampo: function(campo) {
    const input = $(`#${campo}`);
    const errorDiv = $(`#error-${campo}`);

    input.removeClass("is-invalid").addClass("is-valid");
    errorDiv.hide();
  },

  mostrarTodosLosErrores: function(errores) {
    this.limpiarTodosLosErrores();

    for (let campo in errores) {
      if (errores[campo]) {
        this.mostrarErrorCampo(campo, errores[campo]);
      }
    }

    const primerError = $('.is-invalid').first();
    if (primerError.length) {
      $('html, body').animate({
        scrollTop: primerError.offset().top - 100
      }, 500);
    }
  },

  limpiarTodosLosErrores: function() {
    $('.form-control').removeClass("is-invalid is-valid");
    $('.invalid-feedback').hide();
  },

  mostrarExito: function(mensaje) {
    $(".response").removeClass().addClass("response alert alert-success")
      .html(`<strong> Éxito:</strong> ${mensaje}`)
      .fadeIn();
  },

  mostrarCargando: function(mensaje) {
    $("#formCita").hide("slow");
    $(".response").hide();
    $(".loading").fadeIn().text(mensaje);
  },

  ocultarCargando: function() {
    $(".loading").hide();
  },

  resetFormulario: function() {
    this.limpiarTodosLosErrores();
    $("#formCita")[0].reset();
    $("#formCita").show("slow");
    $(".response").fadeOut();
  },

  obtenerDatosFormulario: function() {
    return {
      nombreCita: $("#nombreCita").val().trim(),
      correoCita: $("#correoCita").val().trim(),
      fechaCita: $("#fechaCita").val().trim(),
      horaCita: $("#horaCita").val().trim(),
      comentarioCita: $("#comentarioCita").val().trim()
    };
  }
};
