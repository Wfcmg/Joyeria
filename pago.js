// ===============================
// 1️⃣ CREAR FORMULARIO DE PAGO (dinámico)
// ===============================

// Capturar el contenedor principal
const contenedor = document.getElementById("formulario-pago");

if (contenedor) {
  const form = document.createElement("form");
  form.id = "pagoForm";

  // === TÍTULO DATOS DE ENVÍO ===
  const tituloEnvio = document.createElement("h3");
  tituloEnvio.textContent = "Datos de Envío";
  tituloEnvio.style.color = "#6a5242";
  tituloEnvio.style.marginBottom = "1.5rem";
  form.appendChild(tituloEnvio);

  // === CAMPOS DE ENVÍO ===
  const camposEnvio = [
    { label: "Nombre Completo", type: "text", id: "nombre" },
    { label: "Correo Electrónico", type: "email", id: "correo" },
    { label: "Teléfono", type: "tel", id: "telefono" },
    { label: "Dirección", type: "text", id: "direccion" },
    { label: "Ciudad", type: "text", id: "ciudad" },
    { label: "Código Postal", type: "text", id: "postal" }
  ];

  camposEnvio.forEach(campo => {
    const div = document.createElement("div");
    div.classList.add("mb-3");

    const label = document.createElement("label");
    label.classList.add("form-label");
    label.textContent = campo.label;

    const input = document.createElement("input");
    input.type = campo.type;
    input.id = campo.id;
    input.classList.add("form-control");

    div.appendChild(label);
    div.appendChild(input);
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

  const select = document.createElement("select");
  select.classList.add("form-select");
  ["Tarjeta de Crédito / Débito", "PayPal", "Transferencia Bancaria"].forEach(opcion => {
    const option = document.createElement("option");
    option.textContent = opcion;
    select.appendChild(option);
  });

  divMetodo.appendChild(select);
  form.appendChild(divMetodo);

  // === CAMPOS TARJETA ===
  const divTarjeta = document.createElement("div");
  divTarjeta.classList.add("mb-3");

  const labelTarjeta = document.createElement("label");
  labelTarjeta.classList.add("form-label");
  labelTarjeta.textContent = "Número de Tarjeta";

  const inputTarjeta = document.createElement("input");
  inputTarjeta.type = "text";
  inputTarjeta.id = "tarjeta";
  inputTarjeta.maxLength = 19;
  inputTarjeta.placeholder = "#### #### #### ####";
  inputTarjeta.classList.add("form-control");

  divTarjeta.appendChild(labelTarjeta);
  divTarjeta.appendChild(inputTarjeta);
  form.appendChild(divTarjeta);

  // === EXPIRACIÓN Y CVV ===
  const divRow = document.createElement("div");
  divRow.classList.add("row");

  const colExp = document.createElement("div");
  colExp.classList.add("col-md-6", "mb-3");

  const labelExp = document.createElement("label");
  labelExp.classList.add("form-label");
  labelExp.textContent = "Expiración";

  const inputExp = document.createElement("input");
  inputExp.type = "text";
  inputExp.id = "expiracion";
  inputExp.placeholder = "MM/AA";
  inputExp.maxLength = 5;
  inputExp.classList.add("form-control");

  colExp.appendChild(labelExp);
  colExp.appendChild(inputExp);
  divRow.appendChild(colExp);

  const colCVV = document.createElement("div");
  colCVV.classList.add("col-md-6", "mb-3");

  const labelCVV = document.createElement("label");
  labelCVV.classList.add("form-label");
  labelCVV.textContent = "CVV";

  const inputCVV = document.createElement("input");
  inputCVV.type = "text";
  inputCVV.id = "cvv";
  inputCVV.maxLength = 3;
  inputCVV.classList.add("form-control");

  colCVV.appendChild(labelCVV);
  colCVV.appendChild(inputCVV);
  divRow.appendChild(colCVV);
  form.appendChild(divRow);

  // === BOTÓN DE ENVÍO ===
  const boton = document.createElement("button");
  boton.type = "submit";
  boton.id = "btnPagar";
  boton.textContent = "Confirmar y Pagar";
  boton.classList.add("btn", "boton-dorado", "w-100", "mt-3");
  form.appendChild(boton);

  // === INSERTAR FORMULARIO Y ELEMENTOS DE ANIMACIÓN ===
  contenedor.appendChild(form);

  const loading = document.createElement("div");
  loading.classList.add("loading", "text-center", "mt-3");
  loading.style.display = "none";
  loading.textContent = "Procesando pago...";
  contenedor.appendChild(loading);

  const response = document.createElement("div");
  response.classList.add("response", "text-center", "mt-3");
  response.style.display = "none";
  contenedor.appendChild(response);

  // ===============================
  // 2️⃣ VALIDACIÓN + ANIMACIÓN CON jQuery
  // ===============================
  $("#pagoForm").on("submit", function (event) {
    event.preventDefault();

    const nombre = $("#nombre").val().trim();
    const correo = $("#correo").val().trim();
    const direccion = $("#direccion").val().trim();
    const tarjeta = $("#tarjeta").val().trim();
    const expiracion = $("#expiracion").val().trim();
    const cvv = $("#cvv").val().trim();

    // === VALIDACIONES ===
    if (!nombre || !correo || !direccion || !tarjeta || !expiracion || !cvv) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Por favor, completa todos los campos antes de continuar.")
        .fadeIn();
      return;
    }

    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronCorreo.test(correo)) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("El formato del correo electrónico no es válido.")
        .fadeIn();
      return;
    }

    const patronTarjeta = /^[0-9]{13,19}$/;
    if (!patronTarjeta.test(tarjeta.replace(/\s/g, ""))) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("El número de tarjeta no es válido.")
        .fadeIn();
      return;
    }

    const patronExp = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!patronExp.test(expiracion)) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Formato de expiración inválido. Usa MM/AA.")
        .fadeIn();
      return;
    }

    const patronCVV = /^[0-9]{3}$/;
    if (!patronCVV.test(cvv)) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("El CVV debe tener 3 dígitos.")
        .fadeIn();
      return;
    }

    // === ANIMACIÓN: Ocultar formulario y mostrar carga ===
    $("#pagoForm").hide("slow");
    $(".response").hide();
    $(".loading").fadeIn().text("Procesando pago...");

    // === Simulación de procesamiento ===
    setTimeout(() => {
      $(".loading").hide();
      $(".response").removeClass().addClass("response alert alert-success")
        .text("¡Pago procesado exitosamente! Gracias por tu compra.")
        .fadeIn();

      // Mostrar el formulario otra vez
      setTimeout(() => {
        $(".response").fadeOut();
        $("#pagoForm")[0].reset();
        $("#pagoForm").show("slow");
      }, 3000);
    }, 2000);
  });

  // === FORMATO AUTOMÁTICO DE TARJETA ===
  inputTarjeta.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  });

  // === CONSEJO FINAL ===
  setTimeout(() => {
    const aviso = document.createElement("p");
    aviso.textContent = "💡 Consejo: Verifica tus datos antes de confirmar el pago.";
    aviso.classList.add("text-muted", "mt-2");
    form.appendChild(aviso);
  }, 3500);
}
