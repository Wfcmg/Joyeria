// === 1. CAPTURAR EL CONTENEDOR ===
const contenedor = document.getElementById("contenedor-login");

// === 2. CREAR TÍTULO ===
const titulo = document.createElement("h2");
titulo.textContent = "Iniciar Sesión";
titulo.classList.add("text-center", "mb-4");
titulo.style.color = "#5A4B40";
contenedor.appendChild(titulo);

// === 3. CREAR FORMULARIO ===
const form = document.createElement("form");
form.id = "loginForm";

// === 4. CAMPO CORREO ===
const divCorreo = document.createElement("div");
divCorreo.classList.add("mb-3");

const inputCorreo = document.createElement("input");
inputCorreo.type = "email";
inputCorreo.placeholder = "Correo Electrónico";
inputCorreo.classList.add("form-control");
inputCorreo.id = "correo";

divCorreo.appendChild(inputCorreo);
form.appendChild(divCorreo);

// === 5. CAMPO CONTRASEÑA ===
const divPass = document.createElement("div");
divPass.classList.add("mb-3");

const inputPass = document.createElement("input");
inputPass.type = "password";
inputPass.placeholder = "Contraseña";
inputPass.classList.add("form-control");
inputPass.id = "password";

divPass.appendChild(inputPass);
form.appendChild(divPass);

// === 6. OPCIÓN RECORDARME Y ENLACE ===
const divExtras = document.createElement("div");
divExtras.classList.add("d-flex", "justify-content-between", "mb-3");

const divCheck = document.createElement("div");

const check = document.createElement("input");
check.type = "checkbox";
check.id = "recordarme";

const labelCheck = document.createElement("label");
labelCheck.htmlFor = "recordarme";
labelCheck.textContent = "Recordarme";
labelCheck.style.fontSize = "0.9rem";

divCheck.appendChild(check);
divCheck.appendChild(labelCheck);

const enlaceOlvido = document.createElement("a");
enlaceOlvido.href = "#";
enlaceOlvido.textContent = "¿Olvidaste tu contraseña?";
enlaceOlvido.style.fontSize = "0.9rem";
enlaceOlvido.style.color = "#C9A14A";

divExtras.appendChild(divCheck);
divExtras.appendChild(enlaceOlvido);
form.appendChild(divExtras);

// === 7. BOTÓN DE ENVIAR ===
const boton = document.createElement("button");
boton.type = "submit";
boton.id = "btnLogin";
boton.textContent = "Iniciar Sesión";
boton.classList.add("btn", "boton-personalizado", "w-100");
form.appendChild(boton);

// === 8. ENLACE DE REGISTRO ===
const divRegistro = document.createElement("div");
divRegistro.classList.add("text-center", "mt-3");
divRegistro.style.fontSize = "0.9rem";
divRegistro.innerHTML = `¿No tienes cuenta? <a href="#" style="color:#C9A14A;">Regístrate aquí</a>`;
form.appendChild(divRegistro);

// === 9. AGREGAR FORMULARIO AL CONTENEDOR ===
contenedor.appendChild(form);

// === 10. EVENTO CLICK EN BOTÓN (DOM + ALERTA) ===
const button = document.getElementById("btnLogin");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Intentando iniciar sesión...");
});

// === 11. EVENTO SUBMIT ===
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const correo = inputCorreo.value.trim();
  const password = inputPass.value.trim();

  if (!correo || !password) {
    mostrarMensaje("Completa ambos campos antes de continuar.", false);
    return;
  }

  // Simulación de inicio de sesión con timer
  setTimeout(function() {
    mostrarMensaje("Inicio de sesión exitoso. Bienvenido/a a Brillo Eterno.", true);

    // Redirección con window.location.href
    setTimeout(function() {
      window.location.href = "index.html";
    }, 1500);
  }, 800);
});

// === 12. EVENTO INPUT EN CORREO (DOM ACTUALIZA) ===
inputCorreo.addEventListener("input", function() {
  console.log("Correo ingresado: " + this.value);
});

// === 13. FUNCIÓN PARA MOSTRAR MENSAJES ===
function mostrarMensaje(texto, exito) {
  const anterior = contenedor.querySelector(".alert");
  if (anterior) anterior.remove();

  const alerta = document.createElement("div");
  alerta.textContent = texto;
  alerta.className = `alert mt-3 ${exito ? "alert-success" : "alert-danger"}`;
  contenedor.appendChild(alerta);

  setTimeout(() => alerta.remove(), 2500);
}
