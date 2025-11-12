// ===============================
// 1️⃣ CAPTURAR CONTENEDOR
// ===============================
const contenedor = document.getElementById("contenedor-registro");

if (contenedor) {
  const form = document.createElement("form");
  form.id = "formRegistro";
  form.classList.add("text-start");

  // ===============================
  // 2️⃣ CAMPOS DEL FORMULARIO
  // ===============================
  const campos = [
    { label: "Nombre Completo", type: "text", id: "nombre" },
    { label: "Correo Electrónico", type: "email", id: "correo" },
    { label: "Contraseña", type: "password", id: "contrasena" },
    { label: "Confirmar Contraseña", type: "password", id: "confirmar" }
  ];

  campos.forEach(campo => {
    const div = document.createElement("div");
    div.classList.add("mb-3");

    const label = document.createElement("label");
    label.classList.add("form-label");
    label.textContent = campo.label;
    label.style.color = "#5A4B40";
    label.style.fontWeight = "500";

    const input = document.createElement("input");
    input.type = campo.type;
    input.id = campo.id;
    input.classList.add("form-control");
    input.placeholder = campo.label;
    input.style.fontSize = "0.95rem";
    input.style.borderRadius = "10px";
    input.style.borderColor = "#C9A14A";

    div.appendChild(label);
    div.appendChild(input);
    form.appendChild(div);
  });

  // ===============================
  // 3️⃣ BOTÓN DE REGISTRO
  // ===============================
  const boton = document.createElement("button");
  boton.type = "submit";
  boton.id = "btnRegistrar";
  boton.textContent = "Crear Cuenta";
  boton.classList.add("btn", "w-100", "mt-3");
  boton.style.backgroundColor = "#C9A14A";
  boton.style.color = "#fff";
  boton.style.border = "none";
  boton.style.fontWeight = "600";
  boton.style.letterSpacing = "0.5px";
  boton.style.transition = "background 0.3s ease";
  boton.onmouseover = () => boton.style.backgroundColor = "#b08e3a";
  boton.onmouseout = () => boton.style.backgroundColor = "#C9A14A";
  form.appendChild(boton);

  // Texto de redirección al login
  const textoLogin = document.createElement("p");
  textoLogin.classList.add("text-muted", "mt-3", "text-center");
  textoLogin.style.fontSize = "0.9rem";
  textoLogin.innerHTML = `¿Ya tienes una cuenta? <a href="login.html" style="color:#C9A14A; font-weight:500; text-decoration:none;">Inicia sesión</a>`;
  form.appendChild(textoLogin);

  contenedor.appendChild(form);

  // ===============================
  // 4️⃣ MENSAJES Y ANIMACIONES
  // ===============================
  const loading = document.createElement("div");
  loading.classList.add("loading", "text-center", "mt-3");
  loading.style.display = "none";
  loading.textContent = "Creando tu cuenta...";
  contenedor.appendChild(loading);

  const response = document.createElement("div");
  response.classList.add("response", "text-center", "mt-3");
  response.style.display = "none";
  contenedor.appendChild(response);

  // ===============================
  // 5️⃣ VALIDACIÓN + ANIMACIÓN jQUERY
  // ===============================
  $("#formRegistro").on("submit", function (event) {
    event.preventDefault();

    const nombre = $("#nombre").val().trim();
    const correo = $("#correo").val().trim();
    const contrasena = $("#contrasena").val().trim();
    const confirmar = $("#confirmar").val().trim();

    if (!nombre || !correo || !contrasena || !confirmar) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Por favor, completa todos los campos.")
        .fadeIn();
      return;
    }

    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patronCorreo.test(correo)) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("El correo electrónico no es válido.")
        .fadeIn();
      return;
    }

    if (contrasena.length < 6) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("La contraseña debe tener al menos 6 caracteres.")
        .fadeIn();
      return;
    }

    if (contrasena !== confirmar) {
      $(".response").removeClass().addClass("response alert alert-danger")
        .text("Las contraseñas no coinciden.")
        .fadeIn();
      return;
    }

    // === Animación de carga ===
    $("#formRegistro").hide("slow");
    $(".response").hide();
    $(".loading").fadeIn().text("Creando tu cuenta...");

    setTimeout(() => {
      $(".loading").hide();
      $(".response").removeClass().addClass("response alert alert-success")
        .text("¡Registro exitoso! Redirigiendo al inicio de sesión...")
        .fadeIn();

      setTimeout(() => {
        $(".response").fadeOut();
        window.location.href = "login.html";
      }, 3000);
    }, 2000);
  });
}
