// ===============================
// 1️⃣ CONFIGURACIÓN INICIAL (AOS + HERO SCROLL)
// ===============================

// Iniciar animaciones con AOS
AOS.init({ duration: 1000, once: true });

// Efecto de desvanecimiento del hero al hacer scroll
const hero = document.getElementById("hero");
window.addEventListener("scroll", () => {
  if (hero) {
    hero.classList.toggle("fade-out", window.scrollY > 100);
  }
});


// ===============================
// 2️⃣ CONTROL DE SECCIONES (tarjetas, formularios de contacto y citas)
// ===============================

const tarjetas = document.getElementById("tarjetas-contacto");
const seccionContacto = document.getElementById("seccionContacto");
const seccionCita = document.getElementById("seccionCita");

const btnAbrirContacto = document.getElementById("btnAbrirContacto");
const btnAbrirCita = document.getElementById("btnAbrirCita");
const volverTarjetas1 = document.getElementById("volverTarjetas1");
const volverTarjetas2 = document.getElementById("volverTarjetas2");

// Mostrar formulario de contacto
if (btnAbrirContacto) {
  btnAbrirContacto.addEventListener("click", () => {
    tarjetas.classList.add("d-none");
    seccionCita.classList.add("d-none");
    seccionContacto.classList.remove("d-none");
  });
}

// Mostrar formulario de cita
if (btnAbrirCita) {
  btnAbrirCita.addEventListener("click", () => {
    tarjetas.classList.add("d-none");
    seccionContacto.classList.add("d-none");
    seccionCita.classList.remove("d-none");
  });
}

// Volver a las tarjetas desde contacto
if (volverTarjetas1) {
  volverTarjetas1.addEventListener("click", () => {
    seccionContacto.classList.add("d-none");
    tarjetas.classList.remove("d-none");
  });
}

// Volver a las tarjetas desde cita
if (volverTarjetas2) {
  volverTarjetas2.addEventListener("click", () => {
    seccionCita.classList.add("d-none");
    tarjetas.classList.remove("d-none");
  });
}



// ===============================
// 3️⃣ FORMULARIO DE CONTACTO (creación dinámica + validación + jQuery animado)
// ===============================

// Capturar contenedor
const contenedor = document.getElementById("formulario-contacto");

// Crear formulario dinámico
if (contenedor) {
  const form = document.createElement("form");
  form.id = "form_js";
  form.setAttribute("novalidate", true); // ← desactiva validación automática del navegador


  // Campos base
  const campos = [
    { label: "Nombre Completo", type: "text", id: "nombre" },
    { label: "Correo Electrónico", type: "email", id: "correo" },
    { label: "Teléfono", type: "tel", id: "telefono" },
    { label: "Asunto", type: "text", id: "asunto" }
  ];


  campos.forEach(campo => {
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

  // Campo mensaje
  const divMensaje = document.createElement("div");
  divMensaje.classList.add("mb-3");

  const labelMensaje = document.createElement("label");
  labelMensaje.classList.add("form-label");
  labelMensaje.textContent = "Tu Mensaje";

  const textarea = document.createElement("textarea");
  textarea.classList.add("form-control");
  textarea.id = "mensaje";
  textarea.rows = 4;

  divMensaje.appendChild(labelMensaje);
  divMensaje.appendChild(textarea);
  form.appendChild(divMensaje);

  // Botón enviar
  const boton = document.createElement("button");
  boton.type = "submit";
  boton.id = "btnEnviar";
  boton.textContent = "Enviar Mensaje";
  boton.classList.add("btn", "boton-dorado", "w-100");
  form.appendChild(boton);

  // Agregar formulario al contenedor
  contenedor.appendChild(form);


  // === VALIDACIONES + ANIMACIÓN jQuery ===
  $("#form_js").on("submit", function (event) {
    event.preventDefault();

    const nombre = $("#nombre").val().trim();
    const correo = $("#correo").val().trim();
    const telefono = $("#telefono").val().trim();
    const asunto = $("#asunto").val().trim();
    const mensaje = $("#mensaje").val().trim();

    // Validaciones
    if (!nombre || !correo || !telefono || !asunto || !mensaje) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Por favor, completa todos los campos antes de enviar.")
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

    const patronTelefono = /^[0-9]{9,}$/;
    if (!patronTelefono.test(telefono)) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("El número de teléfono debe tener al menos 9 dígitos.")
        .fadeIn();
      return;
    }

    if (mensaje.length < 10) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("El mensaje debe tener al menos 10 caracteres.")
        .fadeIn();
      return;
    }

    // Ocultar formulario y mostrar mensaje de carga
    $("#form_js").hide("slow");
    $(".response").hide();
    $(".loading").fadeIn().text("Enviando...");

    // Simulación del envío con setTimeout
    setTimeout(() => {
      $(".loading").hide();
      $(".response").removeClass().addClass("response alert alert-success")
        .text("¡Mensaje enviado correctamente! Gracias por contactarnos.")
        .fadeIn();

      // Mostrar el formulario de nuevo después de 3 segundos
      setTimeout(() => {
        $(".response").fadeOut();
        $("#form_js")[0].reset();
        $("#form_js").show("slow");
      }, 3000);
    }, 2000);
  });

  // Mensaje automático
  setTimeout(function () {
    const aviso = document.createElement("p");
    aviso.textContent = "Consejo: Revisa tu correo antes de enviarlo.";
    aviso.classList.add("text-muted", "mt-2");
    form.appendChild(aviso);
  }, 4000);
}



// ===============================
// 4️⃣ FORMULARIO DE CITA (creación dinámica + validación + animación)
// ===============================

const contenedorCita = document.getElementById("formulario-cita");

if (contenedorCita) {
  const formCita = document.createElement("form");
  formCita.id = "formCita";

  // Campos base
  const camposCita = [
    { label: "Nombre Completo", type: "text", id: "nombreCita" },
    { label: "Correo Electrónico", type: "email", id: "correoCita" },
    { label: "Fecha de la Cita", type: "date", id: "fechaCita" },
    { label: "Hora de la Cita", type: "time", id: "horaCita" }
  ];

  camposCita.forEach(campo => {
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
    formCita.appendChild(div);
  });

  // Campo adicional (comentario opcional)
  const divComentario = document.createElement("div");
  divComentario.classList.add("mb-3");

  const labelComentario = document.createElement("label");
  labelComentario.classList.add("form-label");
  labelComentario.textContent = "Comentarios adicionales (opcional)";

  const textarea = document.createElement("textarea");
  textarea.classList.add("form-control");
  textarea.id = "comentarioCita";
  textarea.rows = 3;

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

  // Insertar en el contenedor
  contenedorCita.appendChild(formCita);

  // === VALIDACIONES + ANIMACIÓN jQuery ===
  $("#formCita").on("submit", function (event) {
    event.preventDefault();

    const nombreCita = $("#nombreCita").val().trim();
    const correoCita = $("#correoCita").val().trim();
    const fechaCita = $("#fechaCita").val().trim();
    const horaCita = $("#horaCita").val().trim();

    if (!nombreCita || !correoCita || !fechaCita || !horaCita) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Por favor, completa todos los campos obligatorios.")
        .fadeIn();
      return;
    }

    if (!patronCorreo.test(correo)) {
      $("#correo").addClass("is-invalid"); // marca el campo en rojo
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Por favor, ingresa un correo electrónico válido (debe contener '@').")
        .fadeIn();
      return;
    } else {
      $("#correo").removeClass("is-invalid"); // limpia el error si ya está bien
    }

    const hoy = new Date();
    const fechaIngresada = new Date(fechaCita + "T00:00");
    if (fechaIngresada < hoy.setHours(0, 0, 0, 0)) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("La fecha no puede ser anterior al día de hoy.")
        .fadeIn();
      return;
    }

    const patronHora = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!patronHora.test(horaCita)) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Selecciona una hora válida.")
        .fadeIn();
      return;
    }

    // Simulación del envío
    $("#formCita").hide("slow");
    $(".response").hide();
    $(".loading").fadeIn().text("Agendando cita...");

    setTimeout(() => {
      $(".loading").hide();
      $(".response").removeClass().addClass("response alert alert-success")
        .text("¡Cita agendada correctamente! Gracias por confiar en Brillo Eterno.")
        .fadeIn();

      setTimeout(() => {
        $(".response").fadeOut();
        $("#formCita")[0].reset();
        $("#formCita").show("slow");
      }, 3000);
    }, 2000);
  });
}
