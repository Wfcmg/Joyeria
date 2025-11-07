// === 1. CAPTURAR CONTENEDOR ===
// Se obtiene el elemento principal del HTML donde se insertará el formulario de pago.
// Este contenedor debe tener el id "formulario-pago" en el documento.
const contenedor = document.getElementById("formulario-pago");


// === 2. CREAR FORMULARIO ===
// Se crea dinámicamente un elemento <form> para agrupar todos los campos de envío y pago.
const form = document.createElement("form");
form.id = "pagoForm"; // Se le asigna un id para manipularlo luego con JavaScript.


// === 3. TÍTULO DE ENVÍO ===
// Este título indica al usuario que va a ingresar sus datos personales de envío.
const tituloEnvio = document.createElement("h3");
tituloEnvio.textContent = "Datos de Envío";
tituloEnvio.style.color = "#6a5242";
tituloEnvio.style.marginBottom = "1.5rem";
form.appendChild(tituloEnvio);


// === 4. CAMPOS DE ENVÍO ===
// Se define un array de objetos con la información de cada campo del formulario (nombre, correo, dirección, etc.)
// Cada objeto tiene un label, un tipo y un id que luego se usa para crear los elementos dinámicamente.
const camposEnvio = [
  { label: "Nombre Completo", type: "text", id: "nombre" },
  { label: "Correo Electrónico", type: "email", id: "correo" },
  { label: "Teléfono", type: "tel", id: "telefono" },
  { label: "Dirección", type: "text", id: "direccion" },
  { label: "Ciudad", type: "text", id: "ciudad" },
  { label: "Código Postal", type: "text", id: "postal" }
];

// Se recorre el array y se crean dinámicamente los inputs con sus etiquetas.
camposEnvio.forEach(campo => {
  const div = document.createElement("div");
  div.classList.add("mb-3"); // Clase Bootstrap para margen inferior.

  const label = document.createElement("label");
  label.classList.add("form-label");
  label.textContent = campo.label; // Texto visible del campo.

  const input = document.createElement("input");
  input.type = campo.type;
  input.id = campo.id;
  input.classList.add("form-control"); // Clase visual estándar.

  // Se ensamblan los elementos en orden jerárquico.
  div.appendChild(label);
  div.appendChild(input);
  form.appendChild(div);
});


// === 5. TÍTULO DE PAGO ===
// Marca la segunda sección del formulario, dedicada al método de pago.
const tituloPago = document.createElement("h3");
tituloPago.textContent = "Método de Pago";
tituloPago.style.color = "#6a5242";
tituloPago.style.marginTop = "2rem";
tituloPago.style.marginBottom = "1rem";
form.appendChild(tituloPago);


// === 6. SELECCIÓN DE MÉTODO ===
// Se crea un menú desplegable <select> con distintas opciones de pago.
const divMetodo = document.createElement("div");
divMetodo.classList.add("mb-3");

const select = document.createElement("select");
select.classList.add("form-select");

// Se agregan las opciones de pago disponibles dentro del select.
["Tarjeta de Crédito / Débito", "PayPal", "Transferencia Bancaria"].forEach(opcion => {
  const option = document.createElement("option");
  option.textContent = opcion;
  select.appendChild(option);
});

divMetodo.appendChild(select);
form.appendChild(divMetodo);


// === 7. CAMPOS TARJETA ===
// Campo para que el usuario escriba su número de tarjeta.
const divTarjeta = document.createElement("div");
divTarjeta.classList.add("mb-3");

const labelTarjeta = document.createElement("label");
labelTarjeta.classList.add("form-label");
labelTarjeta.textContent = "Número de Tarjeta";

const inputTarjeta = document.createElement("input");
inputTarjeta.type = "text";
inputTarjeta.id = "tarjeta";
inputTarjeta.maxLength = 19; // Limita el número de caracteres (máximo 19 incluyendo espacios).
inputTarjeta.classList.add("form-control");

divTarjeta.appendChild(labelTarjeta);
divTarjeta.appendChild(inputTarjeta);
form.appendChild(divTarjeta);


// === 8. EXPIRACIÓN Y CVV ===
// Aquí se crean dos columnas: una para la fecha de expiración y otra para el CVV.
const divRow = document.createElement("div");
divRow.classList.add("row"); // Crea una fila visual con dos columnas.


// --- Columna de expiración ---
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


// --- Columna del CVV ---
const colCVV = document.createElement("div");
colCVV.classList.add("col-md-6", "mb-3");

const labelCVV = document.createElement("label");
labelCVV.classList.add("form-label");
labelCVV.textContent = "CVV";

const inputCVV = document.createElement("input");
inputCVV.type = "text";
inputCVV.id = "cvv";
inputCVV.maxLength = 3; // El CVV tiene 3 dígitos.
inputCVV.classList.add("form-control");

colCVV.appendChild(labelCVV);
colCVV.appendChild(inputCVV);
divRow.appendChild(colCVV);

// Se agrega la fila completa al formulario.
form.appendChild(divRow);


// === 9. BOTÓN DE PAGO ===
// Botón principal que confirma y procesa el pago.
const boton = document.createElement("button");
boton.type = "submit";
boton.id = "btnPagar";
boton.textContent = "Confirmar y Pagar";
boton.classList.add("btn", "boton-personalizado", "w-100", "mt-3");
form.appendChild(boton);


// === 10. AGREGAR FORMULARIO AL DOM ===
// Finalmente, se inserta el formulario completo dentro del contenedor del HTML.
contenedor.appendChild(form);


// === 11. EVENTO CLICK EN BOTÓN ===
// Detecta cuando el usuario da clic en el botón de pago.
// Por ahora muestra el evento en consola y un mensaje de alerta temporal.
const button = document.getElementById("btnPagar");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Procesando pago...");
});


// === 12. EVENTO SUBMIT ===
// Este evento controla el envío del formulario, valida los campos y simula el procesamiento del pago.
form.addEventListener("submit", function(event) {
  event.preventDefault(); // evita que la página se recargue por defecto

  // Capturamos los valores ingresados por el usuario
  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const tarjeta = document.getElementById("tarjeta").value.trim();
  const expiracion = document.getElementById("expiracion").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // === VALIDACIONES ===

  // 1. Verificar que los campos obligatorios no estén vacíos
  if (!nombre || !correo || !direccion || !tarjeta || !expiracion || !cvv) {
    mostrarMensaje("Por favor, completa todos los campos antes de continuar.", false);
    return;
  }

  // 2. Validar formato del correo electrónico
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronCorreo.test(correo)) {
    mostrarMensaje("El formato del correo electrónico no es válido.", false);
    return;
  }

  // 3. Validar número de tarjeta (mínimo 13 y máximo 19 dígitos)
  const patronTarjeta = /^[0-9]{13,19}$/;
  if (!patronTarjeta.test(tarjeta.replace(/\s/g, ""))) {
    mostrarMensaje("El número de tarjeta no es válido.", false);
    return;
  }

  // 4. Validar formato de fecha de expiración (MM/AA)
  const patronExp = /^(0[1-9]|1[0-2])\/\d{2}$/;
  if (!patronExp.test(expiracion)) {
    mostrarMensaje("La fecha de expiración debe tener el formato MM/AA.", false);
    return;
  }

  // 5. Validar CVV (3 dígitos)
  const patronCVV = /^[0-9]{3}$/;
  if (!patronCVV.test(cvv)) {
    mostrarMensaje("El código CVV debe tener 3 dígitos.", false);
    return;
  }

  // === SIMULACIÓN DE PROCESAMIENTO ===
  setTimeout(function() {
    mostrarMensaje("Pago procesado exitosamente. ¡Gracias por tu compra!", true);

    // Redirección después de 2 segundos
    setTimeout(function() {
      window.location.href = "index.html";
    }, 2000);
  }, 1000);
});


// === 13. EVENTO INPUT EN TARJETA ===
// Detecta cuando el usuario escribe en el campo de la tarjeta.
// Muestra en consola lo que se va ingresando (útil para pruebas o validaciones).
inputTarjeta.addEventListener("input", function() {
  console.log("Número de tarjeta ingresado: " + this.value);
});


// === 14. FUNCIÓN PARA MOSTRAR MENSAJES ===
// Función reutilizable para mostrar alertas dinámicas en pantalla (éxito o error).
function mostrarMensaje(texto, exito) {
  // Elimina una alerta anterior si ya existe, para evitar duplicados.
  const anterior = contenedor.querySelector(".alert");
  if (anterior) anterior.remove();

  // Crea una nueva alerta con estilo Bootstrap y texto personalizado.
  const alerta = document.createElement("div");
  alerta.textContent = texto;
  alerta.className = `alert mt-3 ${exito ? "alert-success" : "alert-danger"}`;
  contenedor.appendChild(alerta);

  // Se elimina automáticamente después de 2.5 segundos.
  setTimeout(() => alerta.remove(), 2500);
}


// === 15. TIMER EXTRA (TIP DOM) ===
// Después de 3 segundos aparece un mensaje de recomendación para el usuario.
// Este mensaje se agrega visualmente al final del formulario.
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Consejo: Verifica los datos antes de confirmar el pago.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 3000);
