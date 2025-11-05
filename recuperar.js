// === 1. CAPTURAR EL CONTENEDOR ===
const contenedor = document.getElementById("contenedor-recuperar");

// === 2. CREAR TÍTULO ===
const titulo = document.createElement("h2");
titulo.textContent = "Restablecer Contraseña";
titulo.classList.add("text-center", "mb-3");
titulo.style.color = "#5A4B40";
contenedor.appendChild(titulo);

// === 3. TEXTO EXPLICATIVO ===
const texto = document.createElement("p");
texto.textContent = "Ingresa tu correo electrónico para recibir un enlace de recuperación.";
texto.classList.add("text-center", "mb-4");
texto.style.color = "#6a5242";
texto.style.fontSize = "0.95rem";
contenedor.appendChild(texto);

// === 4. CREAR FORMULARIO ===
const form = document.createElement("form");
form.id = "recuperarForm";

// === 5. CAMPO DE CORREO ===
const divCorreo = document.createElement("div");
divCorreo.classList.add("mb-3");

const inputCorreo = document.createElement("input");
inputCorreo.type = "email";
inputCorreo.placeholder = "Correo Electrónico";
inputCorreo.classList.add("form-control");
inputCorreo.id = "correoRecuperar";

divCorreo.appendChild(inputCorreo);
form.appendChild(divCorreo);

// === 6. BOTÓN ENVIAR ===
const boton = document.createElement("button");
boton.type = "submit";
boton.id = "btnRecuperar";
boton.textContent = "Enviar Enlace";
boton.classList.add("btn", "boton-personalizado", "w-100");
form.appendChild(boton);

// === 7. ENLACE VOLVER AL LOGIN ===
const volver = document.createElement("div");
volver.classList.add("text-center", "mt-3");
volver.style.fontSize = "0.9rem";
volver.innerHTML = `<a href="login.html" style="color:#C9A14A;">Volver al inicio de sesión</a>`;
form.appendChild(volver);

// === 8. AGREGAR FORMULARIO AL CONTENEDOR ===
contenedor.appendChild(form);

// === 9. EVENTO CLICK EN BOTÓN ===
const button = document.getElementById("btnRecuperar");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Procesando solicitud de recuperación...");
});

// === 10. EVENTO SUBMIT DEL FORMULARIO ===
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const correo = inputCorreo.value.trim();
  if (!correo) {
    mostrarMensaje("Por favor, ingresa tu correo electrónico.", false);
    return;
  }

  // Simular envío de correo con timer
  setTimeout(function() {
    mostrarMensaje("Se ha enviado un enlace de recuperación a tu correo.", true);

    // Redirección después de unos segundos
    setTimeout(function() {
      window.location.href = "login.html";
    }, 2000);
  }, 1000);
});

// === 11. EVENTO INPUT (DOM ACTUALIZA EN TIEMPO REAL) ===
inputCorreo.addEventListener("input", function() {
  console.log("Correo ingresado: " + this.value);
});

// === 12. FUNCIÓN PARA MOSTRAR MENSAJES ===
function mostrarMensaje(texto, exito) {
  const anterior = contenedor.querySelector(".alert");
  if (anterior) anterior.remove();

  const alerta = document.createElement("div");
  alerta.textContent = texto;
  alerta.className = `alert mt-3 ${exito ? "alert-success" : "alert-danger"}`;
  contenedor.appendChild(alerta);

  setTimeout(() => alerta.remove(), 2500);
}

// === 13. TIMER EXTRA ===
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Asegúrate de escribir correctamente tu correo antes de enviarlo.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 3500);
