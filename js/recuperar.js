// === 1. CAPTURAR EL CONTENEDOR ===
// Se obtiene del documento HTML el elemento con id "contenedor-recuperar".
// Aquí se insertará dinámicamente todo el contenido del formulario.
const contenedor = document.getElementById("contenedor-recuperar");


// === 2. CREAR TÍTULO ===
// Se crea un título <h2> que indica al usuario la función de la página (restablecer contraseña).
// Se le aplican clases para centrarlo y darle espacio inferior, además de color personalizado.
const titulo = document.createElement("h2");
titulo.textContent = "Restablecer Contraseña";
titulo.classList.add("text-center", "mb-3");
titulo.style.color = "#5A4B40";
contenedor.appendChild(titulo); // Se agrega el título dentro del contenedor principal.


// === 3. TEXTO EXPLICATIVO ===
// Se genera un pequeño párrafo que explica brevemente lo que debe hacer el usuario.
// Es importante para guiar al usuario sobre la acción que realizará.
const texto = document.createElement("p");
texto.textContent = "Ingresa tu correo electrónico para recibir un enlace de recuperación.";
texto.classList.add("text-center", "mb-4");
texto.style.color = "#6a5242";
texto.style.fontSize = "0.95rem";
contenedor.appendChild(texto);


// === 4. CREAR FORMULARIO ===
// Se crea el elemento <form> donde se colocarán los campos y botones.
// Este formulario se manejará de forma dinámica (sin recargar la página).
const form = document.createElement("form");
form.id = "recuperarForm";


// === 5. CAMPO DE CORREO ===
// Se construye el campo para que el usuario ingrese su correo electrónico.
const divCorreo = document.createElement("div");
divCorreo.classList.add("mb-3");

const inputCorreo = document.createElement("input");
inputCorreo.type = "email"; // Tipo email para validación automática del navegador.
inputCorreo.placeholder = "Correo Electrónico"; // Texto guía dentro del campo.
inputCorreo.classList.add("form-control"); // Clase de Bootstrap para estilo uniforme.
inputCorreo.id = "correoRecuperar"; // ID único para poder capturar el valor.

divCorreo.appendChild(inputCorreo); // Se inserta el input dentro del div.
form.appendChild(divCorreo); // Y luego el div dentro del formulario.


// === 6. BOTÓN ENVIAR ===
// Se crea el botón que permitirá enviar la solicitud de recuperación.
const boton = document.createElement("button");
boton.type = "submit"; // Indica que este botón envía el formulario.
boton.id = "btnRecuperar";
boton.textContent = "Enviar Enlace";
boton.classList.add("btn", "boton-personalizado", "w-100"); // Estilos: botón personalizado y ancho completo.
form.appendChild(boton);


// === 7. ENLACE VOLVER AL LOGIN ===
// Se añade un enlace para regresar a la página de inicio de sesión.
// Esto mejora la navegación y usabilidad del sitio.
const volver = document.createElement("div");
volver.classList.add("text-center", "mt-3");
volver.style.fontSize = "0.9rem";
volver.innerHTML = `<a href="../login.html" style="color:#C9A14A;">Volver al inicio de sesión</a>`;
form.appendChild(volver);


// === 8. AGREGAR FORMULARIO AL CONTENEDOR ===
// Aquí se inserta el formulario completo dentro del contenedor principal del HTML.
contenedor.appendChild(form);


// === 9. EVENTO CLICK EN BOTÓN ===
// Captura el clic en el botón de enviar y muestra un mensaje rápido.
// Además, se imprime el evento completo en consola (útil para pruebas o depuración).
const button = document.getElementById("btnRecuperar");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Procesando solicitud de recuperación...");
});


// === 10. EVENTO SUBMIT DEL FORMULARIO ===
// Este evento controla el envío del formulario y valida los datos antes de simular el envío del enlace de recuperación.
form.addEventListener("submit", function(event) {
  event.preventDefault(); // evita la recarga por defecto

  const correo = inputCorreo.value.trim();

  // === VALIDACIONES ===

  // 1. Verificar que el campo no esté vacío
  if (!correo) {
    mostrarMensaje("Por favor, ingresa tu correo electrónico.", false);
    return;
  }

  // 2. Validar formato del correo electrónico
  const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!patronCorreo.test(correo)) {
    mostrarMensaje("El formato del correo electrónico no es válido.", false);
    return;
  }

  // === SIMULACIÓN DE ENVÍO ===
  setTimeout(function() {
    mostrarMensaje("Se ha enviado un enlace de recuperación a tu correo.", true);

    // Redirección después de unos segundos
    setTimeout(function() {
      window.location.href = "login.html";
    }, 2000);
  }, 1000);
});


// === 11. EVENTO INPUT (DOM ACTUALIZA EN TIEMPO REAL) ===
// Este evento detecta lo que el usuario va escribiendo en el campo de correo.
// Muestra en la consola cada valor ingresado en tiempo real.
inputCorreo.addEventListener("input", function() {
  console.log("Correo ingresado: " + this.value);
});


// === 12. FUNCIÓN PARA MOSTRAR MENSAJES ===
// Función reutilizable para mostrar mensajes dinámicos (de error o éxito).
// Usa un div con clases de alerta de Bootstrap, y lo elimina automáticamente tras 2.5 segundos.
function mostrarMensaje(texto, exito) {
  const anterior = contenedor.querySelector(".alert"); // Si hay una alerta previa, se elimina.
  if (anterior) anterior.remove();

  const alerta = document.createElement("div");
  alerta.textContent = texto;
  alerta.className = `alert mt-3 ${exito ? "alert-success" : "alert-danger"}`; // Éxito o error.
  contenedor.appendChild(alerta);

  // Se borra automáticamente después de 2.5 segundos.
  setTimeout(() => alerta.remove(), 2500);
}


// === 13. TIMER EXTRA ===
// Después de 3.5 segundos, aparece un pequeño mensaje en pantalla con una recomendación.
// Sirve como recordatorio amable para el usuario.
setTimeout(function() {
  const aviso = document.createElement("p");
  aviso.textContent = "Asegúrate de escribir correctamente tu correo antes de enviarlo.";
  aviso.classList.add("text-muted", "mt-2");
  form.appendChild(aviso);
}, 3500);
