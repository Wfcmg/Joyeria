// ===============================
// VISTA DE PAGO
// ===============================
const PagoView = {
  contenedor: null,

  init: function(contenedorId) {
    this.contenedor = document.getElementById(contenedorId);
  },

  renderFormulario: function() {
    if (!this.contenedor) return;

    const form = document.createElement("form");
    form.id = "pagoForm";
    form.setAttribute("novalidate", true);

    // === TÍTULO DATOS DE ENVÍO ===
    const tituloEnvio = document.createElement("h3");
    tituloEnvio.textContent = "Datos de Envío";
    tituloEnvio.style.color = "#6a5242";
    tituloEnvio.style.marginBottom = "1.5rem";
    form.appendChild(tituloEnvio);

    // === CAMPOS DE ENVÍO ===
    const camposEnvio = [
      { label: "Nombre Completo", type: "text", id: "nombre", placeholder: "Ej: Juan Pérez" },
      { label: "Correo Electrónico", type: "email", id: "correo", placeholder: "Ej: juan@ejemplo.com" },
      { label: "Teléfono", type: "tel", id: "telefono", placeholder: "Ej: 0987654321" },
      { label: "Dirección", type: "text", id: "direccion", placeholder: "Ej: Av. Principal 123 y Calle Secundaria" },
      { label: "Ciudad", type: "text", id: "ciudad", placeholder: "Ej: Quito" },
      { label: "Código Postal", type: "text", id: "postal", placeholder: "Ej: 170101" }
    ];

    camposEnvio.forEach(campo => {
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

      const errorDiv = document.createElement("div");
      errorDiv.id = `error-${campo.id}`;
      errorDiv.classList.add("invalid-feedback");
      errorDiv.style.display = "none";

      div.appendChild(label);
      div.appendChild(input);
      div.appendChild(errorDiv);
      form.appendChild(div);
    });

    // === TÍTULO MÉTODO DE PAGO ===
    const tituloPago = document.createElement("h3");
    tituloPago.textContent = "Método de Pago";
    tituloPago.style.color = "#6a5242";
    tituloPago.style.marginTop = "2rem";
    tituloPago.style.marginBottom = "1rem";
    form.appendChild(tituloPago);

    // === SELECCIÓN DE MÉTODO ===
    const divMetodo = document.createElement("div");
    divMetodo.classList.add("mb-3");

    const labelMetodo = document.createElement("label");
    labelMetodo.classList.add("form-label");
    labelMetodo.textContent = "Selecciona el método de pago";

    const select = document.createElement("select");
    select.id = "metodoPago";
    select.classList.add("form-select");

    ["Tarjeta de Crédito / Débito", "PayPal", "Transferencia Bancaria"].forEach(opcion => {
      const option = document.createElement("option");
      option.textContent = opcion;
      option.value = opcion;
      select.appendChild(option);
    });

    divMetodo.appendChild(labelMetodo);
    divMetodo.appendChild(select);
    form.appendChild(divMetodo);

    // === CAMPOS TARJETA ===
    const divTarjeta = document.createElement("div");
    divTarjeta.classList.add("mb-3");

    const labelTarjeta = document.createElement("label");
    labelTarjeta.classList.add("form-label");
    labelTarjeta.setAttribute("for", "tarjeta");
    labelTarjeta.innerHTML = 'Número de Tarjeta <span class="text-danger">*</span>';

    const inputTarjeta = document.createElement("input");
    inputTarjeta.type = "text";
    inputTarjeta.id = "tarjeta";
    inputTarjeta.maxLength = 19;
    inputTarjeta.placeholder = "#### #### #### ####";
    inputTarjeta.classList.add("form-control");

    const errorTarjeta = document.createElement("div");
    errorTarjeta.id = "error-tarjeta";
    errorTarjeta.classList.add("invalid-feedback");
    errorTarjeta.style.display = "none";

    divTarjeta.appendChild(labelTarjeta);
    divTarjeta.appendChild(inputTarjeta);
    divTarjeta.appendChild(errorTarjeta);
    form.appendChild(divTarjeta);

    // === EXPIRACIÓN Y CVV ===
    const divRow = document.createElement("div");
    divRow.classList.add("row");

    // Expiración
    const colExp = document.createElement("div");
    colExp.classList.add("col-md-6", "mb-3");

    const labelExp = document.createElement("label");
    labelExp.classList.add("form-label");
    labelExp.setAttribute("for", "expiracion");
    labelExp.innerHTML = 'Expiración <span class="text-danger">*</span>';

    const inputExp = document.createElement("input");
    inputExp.type = "text";
    inputExp.id = "expiracion";
    inputExp.placeholder = "MM/AA";
    inputExp.maxLength = 5;
    inputExp.classList.add("form-control");

    const errorExp = document.createElement("div");
    errorExp.id = "error-expiracion";
    errorExp.classList.add("invalid-feedback");
    errorExp.style.display = "none";

    colExp.appendChild(labelExp);
    colExp.appendChild(inputExp);
    colExp.appendChild(errorExp);
    divRow.appendChild(colExp);

    // CVV
    const colCVV = document.createElement("div");
    colCVV.classList.add("col-md-6", "mb-3");

    const labelCVV = document.createElement("label");
    labelCVV.classList.add("form-label");
    labelCVV.setAttribute("for", "cvv");
    labelCVV.innerHTML = 'CVV <span class="text-danger">*</span>';

    const inputCVV = document.createElement("input");
    inputCVV.type = "text";
    inputCVV.id = "cvv";
    inputCVV.maxLength = 4;
    inputCVV.placeholder = "123";
    inputCVV.classList.add("form-control");

    const errorCVV = document.createElement("div");
    errorCVV.id = "error-cvv";
    errorCVV.classList.add("invalid-feedback");
    errorCVV.style.display = "none";

    colCVV.appendChild(labelCVV);
    colCVV.appendChild(inputCVV);
    colCVV.appendChild(errorCVV);
    divRow.appendChild(colCVV);
    form.appendChild(divRow);

    // === BOTÓN DE ENVÍO ===
    const boton = document.createElement("button");
    boton.type = "submit";
    boton.id = "btnPagar";
    boton.textContent = "Confirmar y Pagar";
    boton.classList.add("btn", "boton-dorado", "w-100", "mt-3");
    form.appendChild(boton);

    this.contenedor.appendChild(form);

    // === ELEMENTOS DE RESPUESTA ===
    const loading = document.createElement("div");
    loading.classList.add("loading", "text-center", "mt-3");
    loading.style.display = "none";
    loading.textContent = "Procesando pago...";
    this.contenedor.appendChild(loading);

    const response = document.createElement("div");
    response.classList.add("response", "text-center", "mt-3");
    response.style.display = "none";
    this.contenedor.appendChild(response);

    // === FORMATO AUTOMÁTICO DE TARJETA ===
    inputTarjeta.addEventListener("input", function() {
      this.value = this.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
    });

    // === FORMATO AUTOMÁTICO DE EXPIRACIÓN ===
    inputExp.addEventListener("input", function() {
      let valor = this.value.replace(/\D/g, "");
      if (valor.length >= 2) {
        valor = valor.substring(0, 2) + "/" + valor.substring(2, 4);
      }
      this.value = valor;
    });

    // === SOLO NÚMEROS EN CVV ===
    inputCVV.addEventListener("input", function() {
      this.value = this.value.replace(/\D/g, "");
    });

    // === CONSEJO FINAL ===
    setTimeout(() => {
      const aviso = document.createElement("p");
      aviso.textContent = " Consejo: Verifica tus datos antes de confirmar el pago.";
      aviso.classList.add("text-muted", "mt-2", "small");
      form.appendChild(aviso);
    }, 3500);
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
    $('.form-control, .form-select').removeClass("is-invalid is-valid");
    $('.invalid-feedback').hide();
  },

  mostrarExito: function(mensaje) {
    $(".response").removeClass().addClass("response alert alert-success")
      .html(`<strong> Éxito:</strong> ${mensaje}`)
      .fadeIn();
  },

  mostrarCargando: function(mensaje) {
    $("#pagoForm").hide("slow");
    $(".response").hide();
    $(".loading").fadeIn().text(mensaje);
  },

  ocultarCargando: function() {
    $(".loading").hide();
  },

  resetFormulario: function() {
    this.limpiarTodosLosErrores();
    $("#pagoForm")[0].reset();
    $("#pagoForm").show("slow");
    $(".response").fadeOut();
  },

  obtenerDatosFormulario: function() {
    return {
      nombre: $("#nombre").val().trim(),
      correo: $("#correo").val().trim(),
      telefono: $("#telefono").val().trim(),
      direccion: $("#direccion").val().trim(),
      ciudad: $("#ciudad").val().trim(),
      postal: $("#postal").val().trim(),
      metodoPago: $("#metodoPago").val(),
      tarjeta: $("#tarjeta").val().trim(),
      expiracion: $("#expiracion").val().trim(),
      cvv: $("#cvv").val().trim()
    };
  }
};
