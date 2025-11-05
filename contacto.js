// Capturamos el contenedor principal del formulario
const contenedor = document.getElementById("formulario-contacto");

// === 1. CREAR FORMULARIO ===
const form = document.createElement("form");
form.id = "form_js";

// === 2. CAMPOS DEL FORMULARIO ===
const campos = [
  { label: "Nombre Completo", type: "text", id: "nombre" },
  { label: "Correo Electrónico", type: "email", id: "correo" },
  { label: "Teléfono", type: "tel", id: "telefono" },
  { label: "Asunto", type: "text", id: "asunto" }
];

// Crear inputs y agregarlos al formulario
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

// === 3. CAMPO MENSAJE ===
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

// === 4. BOTÓN DE ENVÍO ===
const boton = document.createElement("button");
boton.type = "submit";
boton.id = "btnEnviar";
boton.textContent = "Enviar Mensaje";
boton.classList.add("btn", "boton-personalizado", "w-100");
form.appendChild(boton);

// === 5. Insertar formulario al contenedor ===
contenedor.appendChild(form);

// === 6. EVENTO CLICK EN EL BOTÓN ===
const button = document.getElementById("btnEnviar");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Hiciste click en el botón");
});

// === 7. EVENTO SUBMIT DEL FORMULARIO ===
form.addEventListener("submit", function(event) {
  event.preventDefault(); // evita recargar la página

  // Capturamos los valores
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;

  // Mostramos alerta con los datos ingresados
  alert("Formulario enviado.\nNombre: " + nombre + "\nCorreo: " + correo + "\nMensaje: " + mensaje);
});

// === 8. EVENTO INPUT en el campo correo ===
const correoInput = document.getElementById("correo");
correoInput.addEventListener("input", function() {
  console.log("Escribiste: " + this.value);
});

// === 9. TIMER ELEMENT (mensaje automático) ===
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Consejo: Revisa tu correo antes de enviarlo.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 4000);
