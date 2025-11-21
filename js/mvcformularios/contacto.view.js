// ===============================
// VISTA DE CONTACTO
// ===============================
const ContactoView = {
  contenedor: null,

  init: function(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
  },

  renderFormulario: function() {
    if (!this.contenedor) return;

    const form = document.createElement("form");
    form.id = "form_js";
    form.setAttribute("novalidate", true); // Desactivar validación nativa

    const campos = [
      { label: "Nombre Completo", type: "text", id: "nombre", placeholder: "Ej: Juan Pérez" },
      { label: "Correo Electrónico", type: "email", id: "correo", placeholder: "Ej: juan@ejemplo.com" },
      { label: "Teléfono", type: "tel", id: "telefono", placeholder: "Ej: 0987654321" },
      { label: "Asunto", type: "text", id: "asunto", placeholder: "Ej: Consulta sobre productos" }
    ];

    campos.forEach(campo => {
      const div = document.createElement("div");
      div.classList.add("mb-3");

      const label = document.createElement("label");
      label.classList.add("form-label");
      label.setAttribute("for", campo.id);
      label.innerHTML = campo.label + ' <span class="text-danger">*</span>';

      const input = document.createElement("input");
      input.type = campo.type;
      input.id = campo.id;
      input.placeholder = campo.placeholder;
      input.classList.add("form-control");

      // Contenedor para mensajes de error
      const errorDiv = document.createElement("div");
      errorDiv.id = `error-${campo.id}`;
      errorDiv.classList.add("invalid-feedback");
      errorDiv.style.display = "none";

      div.appendChild(label);
      div.appendChild(input);
      div.appendChild(errorDiv);
      form.appendChild(div);
    });

    // Campo mensaje
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("mb-3");

    const labelMensaje = document.createElement("label");
    labelMensaje.classList.add("form-label");
    labelMensaje.setAttribute("for", "mensaje");
    labelMensaje.innerHTML = 'Tu Mensaje <span class="text-danger">*</span>';

    const textarea = document.createElement("textarea");
    textarea.classList.add("form-control");
    textarea.id = "mensaje";
    textarea.rows = 4;
    textarea.placeholder = "Escribe tu mensaje aquí (mínimo 10 caracteres)";

    const errorMensaje = document.createElement("div");
    errorMensaje.id = "error-mensaje";
    errorMensaje.classList.add("invalid-feedback");
    errorMensaje.style.display = "none";

    divMensaje.appendChild(labelMensaje);
    divMensaje.appendChild(textarea);
    divMensaje.appendChild(errorMensaje);
    form.appendChild(divMensaje);

    // Botón enviar
    const boton = document.createElement("button");
    boton.type = "submit";
    boton.id = "btnEnviar";
    boton.textContent = "Enviar Mensaje";
    boton.classList.add("btn", "boton-dorado", "w-100");
    form.appendChild(boton);

    this.contenedor.appendChild(form);

    // Mensaje automático después de 4 segundos
    setTimeout(() => {
      const aviso = document.createElement("p");
      aviso.textContent = " Consejo: Todos los campos son obligatorios. Revisa tu información antes de enviar.";
      aviso.classList.add("text-muted", "mt-2", "small");
      form.appendChild(aviso);
    }, 4000);
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
    // Limpiar todos los errores primero
    this.limpiarTodosLosErrores();

    // Mostrar cada error
    for (let campo in errores) {
      if (errores[campo]) {
        this.mostrarErrorCampo(campo, errores[campo]);
      }
    }

    // Hacer scroll al primer error
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
    $("#form_js").hide("slow");
    $(".response").hide();
    $(".loading").fadeIn().text(mensaje);
  },

  ocultarCargando: function() {
    $(".loading").hide();
  },

  resetFormulario: function() {
    this.limpiarTodosLosErrores();
    $("#form_js")[0].reset();
    $("#form_js").show("slow");
    $(".response").fadeOut();
  },

  obtenerDatosFormulario: function() {
    return {
      nombre: $("#nombre").val().trim(),
      correo: $("#correo").val().trim(),
      telefono: $("#telefono").val().trim(),
      asunto: $("#asunto").val().trim(),
      mensaje: $("#mensaje").val().trim()
    };
  }
};
