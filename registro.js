// === 1. CAPTURAR CONTENEDOR ===
// Se obtiene el elemento del documento HTML donde se va a insertar el formulario de pago.
// Ese contenedor tiene el id "formulario-pago".
const contenedor = document.getElementById("formulario-pago");


// === 2. CREAR FORMULARIO ===
// Se crea dinámicamente un elemento <form> para construir el formulario desde JavaScript.
// Así no se escribe directamente en HTML, sino que se genera por DOM.
const form = document.createElement("form");
form.id = "pagoForm"; // Se le asigna un id para identificarlo más adelante.


// === 3. TÍTULO DE ENVÍO ===
// Se agrega un encabezado para separar la sección de datos personales o de envío.
const tituloEnvio = document.createElement("h3");
tituloEnvio.textContent = "Datos de Envío"; // Texto visible del título.
tituloEnvio.style.color = "#6a5242"; // Color personalizado.
tituloEnvio.style.marginBottom = "1.5rem"; // Espaciado inferior.
form.appendChild(tituloEnvio);


// === 4. CAMPOS DE ENVÍO ===
// Se definen los campos básicos que el cliente debe llenar antes de pagar.
// Cada campo tiene etiqueta (label), tipo de input y un id único.
const camposEnvio = [
  { label: "Nombre Completo", type: "text", id: "nombre" },
  { label: "Correo Electrónico", type: "email", id: "correo" },
  { label: "Teléfono", type: "tel", id: "telefono" },
  { label: "Dirección", type: "text", id: "direccion" },
  { label: "Ciudad", type: "text", id: "ciudad" },
  { label: "Código Postal", type: "text", id: "postal" }
];

// Se recorre el arreglo y se crean dinámicamente los campos con sus etiquetas y estilos.
camposEnvio.forEach(campo => {
  const div = document.createElement("div");
  div.classList.add("mb-3"); // Espaciado vertical.

  const label = document.createElement("label");
  label.classList.add("form-label");
  label.textContent = campo.label;

  const input = document.createElement("input");
  input.type = campo.type;
  input.id = campo.id;
  input.classList.add("form-control");

  // Se ensamblan los elementos en el orden correcto dentro del formulario.
  div.appendChild(label);
  div.appendChild(input);
  form.appendChild(div);
});


// === 5. TÍTULO DE PAGO ===
// Se crea una nueva sección para los datos del método de pago.
const tituloPago = document.createElement("h3");
tituloPago.textContent = "Método de Pago";
tituloPago.style.color = "#6a5242";
tituloPago.style.marginTop = "2rem";
tituloPago.style.marginBottom = "1rem";
form.appendChild(tituloPago);


// === 6. SELECCIÓN DE MÉTODO ===
// Se genera un menú desplegable con tres opciones de pago.
// Esto permite al usuario elegir entre tarjeta, PayPal o transferencia.
const divMetodo = document.createElement("div");
divMetodo.classList.add("mb-3");
const select = document.createElement("select");
select.classList.add("form-select");

// Se agregan las opciones una por una dentro del <select>.
["Tarjeta de Crédito / Débito", "PayPal", "Transferencia Bancaria"].forEach(opcion => {
  const option = document.createElement("option");
  option.textContent = opcion;
  select.appendChild(option);
});

divMetodo.appendChild(select);
form.appendChild(divMetodo);


// === 7. CAMPOS TARJETA ===
// Campo específico para el número de tarjeta, visible solo si se usa ese método de pago.
const divTarjeta = document.createElement("div");
divTarjeta.classList.add("mb-3");

const labelTarjeta = document.createElement("label");
labelTarjeta.classList.add("form-label");
labelTarjeta.textContent = "Número de Tarjeta";

const inputTarjeta = document.createElement("input");
inputTarjeta.type = "text";
inputTarjeta.id = "tarjeta";
inputTarjeta.maxLength = 19; // Limita la cantidad de dígitos permitidos.
inputTarjeta.classList.add("form-control");

divTarjeta.appendChild(labelTarjeta);
divTarjeta.appendChild(inputTarjeta);
form.appendChild(divTarjeta);


// === 8. EXPIRACIÓN Y CVV ===
// Se crean dos columnas dentro de una fila: una para la fecha de expiración y otra para el CVV.
const divRow = document.createElement("div");
divRow.classList.add("row");


// --- Columna de Expiración ---
const colExp = document.createElement("div");
colExp.classList.add("col-md-6", "mb-3");
const labelExp = document.createElement("label");
labelExp.classList.add("form-label");
labelExp.textContent = "Expiración";
const inputExp = document.createElement("input");
inputExp.type = "text";
inputExp.id = "expiracion";
inputExp.placeholder = "MM/AA"; // Formato esperado.
inputExp.maxLength = 5;
inputExp.classList.add("form-control");
colExp.appendChild(labelExp);
colExp.appendChild(inputExp);
divRow.appendChild(colExp);


// --- Columna del CVV ---
const colCVV = document.createElement("div");
colCVV.classList.add("col-md-6", "mb-3");
const labelCVV = document.createElement("label");
labelCVV.classList.add("form-label");
labelCVV.textContent = "CVV";
const inputCVV = document.createElement("input");
inputCVV.type = "text";
inputCVV.id = "cvv";
inputCVV.maxLength = 3; // El CVV suele tener 3 dígitos.
inputCVV.classList.add("form-control");
colCVV.appendChild(labelCVV);
colCVV.appendChild(inputCVV);
divRow.appendChild(colCVV);

form.appendChild(divRow);


// === 9. BOTÓN DE PAGO ===
// Se crea el botón principal para enviar el formulario y procesar el pago.
const boton = document.createElement("button");
boton.type = "submit";
boton.id = "btnPagar";
boton.textContent = "Confirmar y Pagar";
boton.classList.add("btn", "boton-personalizado", "w-100", "mt-3");
form.appendChild(boton);


// === 10. AGREGAR FORMULARIO AL DOM ===
// Se inserta el formulario completo dentro del contenedor visible del HTML.
contenedor.appendChild(form);


// === 11. EVENTO CLICK EN BOTÓN ===
// Escucha cuando el usuario hace clic en el botón de pago.
// Muestra un aviso en consola y una alerta como simulación del inicio del proceso.
const button = document.getElementById("btnPagar");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Procesando pago...");
});


// === 12. EVENTO SUBMIT ===
// Este evento se activa cuando el usuario envía el formulario.
// Se evita la recarga automática, se validan campos y se simula el procesamiento del pago.
form.addEventListener("submit", function(event) {
  event.preventDefault();

  // Captura de valores escritos por el usuario.
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const tarjeta = document.getElementById("tarjeta").value.trim();

  // Validación simple: si algún campo importante está vacío, se muestra una alerta de error.
  if (!nombre || !correo || !direccion || !tarjeta) {
    mostrarMensaje("Por favor, completa todos los campos requeridos.", false);
    return;
  }

  // Simula el procesamiento del pago con un retardo de 1 segundo.
  setTimeout(function() {
    mostrarMensaje("Pago procesado exitosamente. ¡Gracias por tu compra!", true);

    // Luego redirige automáticamente al inicio después de 2 segundos.
    setTimeout(function() {
      window.location.href = "index.html";
    }, 2000);
  }, 1000);
});


// === 13. EVENTO INPUT EN TARJETA ===
// Detecta en tiempo real los caracteres que se ingresan en el campo de la tarjeta.
// Ideal para validaciones o pruebas de formato.
inputTarjeta.addEventListener("input", function() {
  console.log("Número de tarjeta ingresado: " + this.value);
});


// === 14. FUNCIÓN PARA MOSTRAR MENSAJES ===
// Función genérica que crea mensajes dinámicos (éxito o error) y los elimina después de unos segundos.
function mostrarMensaje(texto, exito) {
  // Si ya hay una alerta en pantalla, se elimina antes de mostrar la nueva.
  const anterior = contenedor.querySelector(".alert");
  if (anterior) anterior.remove();

  // Se crea una nueva alerta con estilo Bootstrap.
  const alerta = document.createElement("div");
  alerta.textContent = texto;
  alerta.className = `alert mt-3 ${exito ? "alert-success" : "alert-danger"}`;
  contenedor.appendChild(alerta);

  // La alerta desaparece automáticamente después de 2.5 segundos.
  setTimeout(() => alerta.remove(), 2500);
}


// === 15. TIMER EXTRA (TIP DOM) ===
// Añade un mensaje de recomendación 3 segundos después de cargar el formulario.
// Esto demuestra el uso del temporizador y la manipulación del DOM.
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Consejo: Verifica los datos antes de confirmar el pago.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 3000);
