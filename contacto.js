// === CAPTURAMOS EL CONTENEDOR PRINCIPAL ===
// Aquí obtenemos (del documento HTML) el elemento que tiene el id "formulario-contacto".
// Ese será el lugar donde insertaremos todo el formulario creado con JavaScript.
const contenedor = document.getElementById("formulario-contacto");


// === 1. CREAR FORMULARIO ===
// Se crea dinámicamente un elemento <form> que será nuestro formulario.
// Luego le asignamos un id para poder identificarlo después en el código.
const form = document.createElement("form");
form.id = "form_js";


// === 2. CAMPOS DEL FORMULARIO ===
// Se define un arreglo (array) con los datos de cada campo del formulario.
// Cada campo tiene un "label" (texto visible), un "type" (tipo de input) y un "id" (identificador único).
const campos = [
  { label: "Nombre Completo", type: "text", id: "nombre" },
  { label: "Correo Electrónico", type: "email", id: "correo" },
  { label: "Teléfono", type: "tel", id: "telefono" },
  { label: "Asunto", type: "text", id: "asunto" }
];


// === Crear inputs y agregarlos al formulario ===
// Con un forEach recorremos cada elemento del array "campos".
// Por cada uno, generamos su estructura (div, label, input) y los añadimos al formulario.
campos.forEach(campo => {
  // Se crea un contenedor <div> con una clase de margen inferior.
  const div = document.createElement("div");
  div.classList.add("mb-3");

  // Se crea la etiqueta <label> con el texto que mostrará al usuario.
  const label = document.createElement("label");
  label.classList.add("form-label");
  label.textContent = campo.label;

  // Se crea el campo de entrada <input> y se le asignan sus propiedades.
  const input = document.createElement("input");
  input.type = campo.type;
  input.id = campo.id;
  input.classList.add("form-control");

  // Finalmente, se insertan el label y el input dentro del div, y ese div dentro del formulario.
  div.appendChild(label);
  div.appendChild(input);
  form.appendChild(div);
});


// === 3. CAMPO MENSAJE ===
// Aquí se crea manualmente un campo tipo textarea para que el usuario escriba su mensaje.
const divMensaje = document.createElement("div");
divMensaje.classList.add("mb-3");

const labelMensaje = document.createElement("label");
labelMensaje.classList.add("form-label");
labelMensaje.textContent = "Tu Mensaje";

const textarea = document.createElement("textarea");
textarea.classList.add("form-control");
textarea.id = "mensaje";
textarea.rows = 4; // define la altura (en líneas visibles)

divMensaje.appendChild(labelMensaje);
divMensaje.appendChild(textarea);
form.appendChild(divMensaje);


// === 4. BOTÓN DE ENVÍO ===
// Se crea un botón <button> para enviar el formulario.
const boton = document.createElement("button");
boton.type = "submit"; // indica que su función es enviar el formulario.
boton.id = "btnEnviar";
boton.textContent = "Enviar Mensaje";
boton.classList.add("btn", "boton-personalizado", "w-100"); // clases CSS para estilo.
form.appendChild(boton);


// === 5. Insertar formulario al contenedor ===
// Finalmente, todo el formulario construido se agrega dentro del contenedor principal del HTML.
contenedor.appendChild(form);


// === 6. EVENTO CLICK EN EL BOTÓN ===
// Capturamos el botón mediante su id y añadimos un evento que escucha los clics.
// Por ahora, solo muestra por consola información del evento (útil para pruebas).
const button = document.getElementById("btnEnviar");
button.addEventListener("click", function(event) {
  console.log(event);
});


// === 7. EVENTO SUBMIT DEL FORMULARIO ===
// Este evento se activa cuando el usuario envía el formulario.
// Se usa preventDefault() para evitar que la página se recargue automáticamente.
form.addEventListener("submit", function(event) {
  event.preventDefault(); // evita la recarga por defecto.

  // Capturamos los valores escritos por el usuario.
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const mensaje = document.getElementById("mensaje").value;

  // Mostramos una alerta básica (puede sustituirse luego por validaciones o mensajes visuales).
  alert("Formulario enviado");
});


// === 8. EVENTO INPUT en el campo correo ===
// Este evento detecta cada vez que el usuario escribe algo en el campo de correo.
// Muestra en consola lo que se va escribiendo, útil para validaciones o depuración.
const correoInput = document.getElementById("correo");
correoInput.addEventListener("input", function() {
  console.log("Escribiste: " + this.value);
});


// === 9. TIMER ELEMENT (mensaje automático) ===
// Después de 4 segundos (4000 ms), se ejecuta esta función.
// Crea un pequeño mensaje de consejo y lo agrega al final del formulario.
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Consejo: Revisa tu correo antes de enviarlo.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 4000);
