// === 1. CAPTURAR CONTENEDOR ===
const contenedor = document.getElementById("formulario-pago");

// === 2. CREAR FORMULARIO ===
const form = document.createElement("form");
form.id = "pagoForm";

// === 3. TÍTULO DE ENVÍO ===
const tituloEnvio = document.createElement("h3");
tituloEnvio.textContent = "Datos de Envío";
tituloEnvio.style.color = "#6a5242";
tituloEnvio.style.marginBottom = "1.5rem";
form.appendChild(tituloEnvio);

// === 4. CAMPOS DE ENVÍO ===
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

// === 5. TÍTULO DE PAGO ===
const tituloPago = document.createElement("h3");
tituloPago.textContent = "Método de Pago";
tituloPago.style.color = "#6a5242";
tituloPago.style.marginTop = "2rem";
tituloPago.style.marginBottom = "1rem";
form.appendChild(tituloPago);

// === 6. SELECCIÓN DE MÉTODO ===
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

// === 7. CAMPOS TARJETA ===
const divTarjeta = document.createElement("div");
divTarjeta.classList.add("mb-3");
const labelTarjeta = document.createElement("label");
labelTarjeta.classList.add("form-label");
labelTarjeta.textContent = "Número de Tarjeta";
const inputTarjeta = document.createElement("input");
inputTarjeta.type = "text";
inputTarjeta.id = "tarjeta";
inputTarjeta.maxLength = 19;
inputTarjeta.classList.add("form-control");
divTarjeta.appendChild(labelTarjeta);
divTarjeta.appendChild(inputTarjeta);
form.appendChild(divTarjeta);

// === 8. EXPIRACIÓN Y CVV ===
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

// === 9. BOTÓN DE PAGO ===
const boton = document.createElement("button");
boton.type = "submit";
boton.id = "btnPagar";
boton.textContent = "Confirmar y Pagar";
boton.classList.add("btn", "boton-personalizado", "w-100", "mt-3");
form.appendChild(boton);

// === 10. AGREGAR FORMULARIO AL DOM ===
contenedor.appendChild(form);

// === 11. EVENTO CLICK EN BOTÓN ===
const button = document.getElementById("btnPagar");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Procesando pago...");
});

// === 12. EVENTO SUBMIT ===
form.addEventListener("submit", function(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const tarjeta = document.getElementById("tarjeta").value.trim();

  if (!nombre || !correo || !direccion || !tarjeta) {
    mostrarMensaje("Por favor, completa todos los campos requeridos.", false);
    return;
  }

  // Simulación de procesamiento
  setTimeout(function() {
    mostrarMensaje("Pago procesado exitosamente. ¡Gracias por tu compra!", true);

    // Redirección al home
    setTimeout(function() {
      window.location.href = "index.html";
    }, 2000);
  }, 1000);
});

// === 13. EVENTO INPUT EN TARJETA ===
inputTarjeta.addEventListener("input", function() {
  console.log("Número de tarjeta ingresado: " + this.value);
});

// === 14. FUNCIÓN PARA MOSTRAR MENSAJES ===
function mostrarMensaje(texto, exito) {
  const anterior = contenedor.querySelector(".alert");
  if (anterior) anterior.remove();

  const alerta = document.createElement("div");
  alerta.textContent = texto;
  alerta.className = `alert mt-3 ${exito ? "alert-success" : "alert-danger"}`;
  contenedor.appendChild(alerta);

  setTimeout(() => alerta.remove(), 2500);
}

// === 15. TIMER EXTRA (TIP DOM) ===
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Consejo: Verifica los datos antes de confirmar el pago.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 3000);
