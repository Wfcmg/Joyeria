// === 1. CAPTURAR EL CONTENEDOR ===
const contenedor = document.getElementById("contenedor-registro");

// === 2. TÍTULO ===
const titulo = document.createElement("h2");
titulo.textContent = "Crear Cuenta";
titulo.classList.add("text-center", "mb-4");
titulo.style.color = "#5A4B40";
contenedor.appendChild(titulo);

// === 3. CREAR FORMULARIO ===
const form = document.createElement("form");
form.id = "registroForm";

// === 4. CAMPOS PRINCIPALES ===
const campos = [
  { type: "text", placeholder: "Nombre Completo", id: "nombre" },
  { type: "email", placeholder: "Correo Electrónico", id: "correo" },
  { type: "password", placeholder: "Contraseña", id: "password" }
];

// Crear inputs con clases e IDs
campos.forEach(campo => {
  const div = document.createElement("div");
  div.classList.add("mb-3");

  const input = document.createElement("input");
  input.type = campo.type;
  input.id = campo.id;
  input.placeholder = campo.placeholder;
  input.classList.add("form-control");
  input.required = true;

  div.appendChild(input);
  form.appendChild(div);
});

// === 5. CHECKBOX DE TÉRMINOS ===
const divCheck = document.createElement("div");
divCheck.classList.add("form-check", "mb-3");

const inputCheck = document.createElement("input");
inputCheck.type = "checkbox";
inputCheck.classList.add("form-check-input");
inputCheck.id = "terminos";
inputCheck.required = true;

const labelCheck = document.createElement("label");
labelCheck.classList.add("form-check-label");
labelCheck.htmlFor = "terminos";
labelCheck.style.fontSize = "0.9rem";
labelCheck.innerHTML = `Acepto los <a href="#" style="color: #C9A14A;">términos y condiciones</a>`;

divCheck.appendChild(inputCheck);
divCheck.appendChild(labelCheck);
form.appendChild(divCheck);

// === 6. BOTÓN DE ENVÍO ===
const boton = document.createElement("button");
boton.type = "submit";
boton.id = "btnRegistro";
boton.textContent = "Registrarse";
boton.classList.add("btn", "boton-personalizado", "w-100");
form.appendChild(boton);

// === 7. ENLACE INFERIOR ===
const divEnlace = document.createElement("div");
divEnlace.classList.add("text-center", "mt-3");
divEnlace.style.fontSize = "0.9rem";
divEnlace.innerHTML = `¿Ya tienes cuenta? <a href="login.html" style="color:#C9A14A;">Inicia sesión aquí</a>`;
form.appendChild(divEnlace);

// === 8. AGREGAR FORMULARIO AL CONTENEDOR ===
contenedor.appendChild(form);

// === 9. EVENTO CLICK EN BOTÓN ===
const button = document.getElementById("btnRegistro");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Intentando crear la cuenta...");
});

// === 10. EVENTO SUBMIT ===
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const password = document.getElementById("password").value.trim();
  const acepta = document.getElementById("terminos").checked;

  if (!nombre || !correo || !password || !acepta) {
    mostrarMensaje("Por favor, completa todos los campos y acepta los términos.", false);
    return;
  }

  // Simular registro con un temporizador
  setTimeout(function() {
    mostrarMensaje("Registro exitoso. ¡Bienvenido a Brillo Eterno!", true);

    // Redirección (a login)
    setTimeout(function() {
      window.location.href = "login.html";
    }, 2000);
  }, 1000);
});

// === 11. EVENTO INPUT EN CORREO ===
const correoInput = document.getElementById("correo");
correoInput.addEventListener("input", function() {
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

// === 13. TIMER EXTRA (DOM ACTUALIZADO) ===
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Consejo: Usa un correo válido y una contraseña segura.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 3000);
