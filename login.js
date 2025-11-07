// === 1. CAPTURAR EL CONTENEDOR ===
// Se obtiene el elemento del HTML donde se mostrará el formulario de login.
// Este contenedor debe existir en el HTML con el id "contenedor-login".
const contenedor = document.getElementById("contenedor-login");


// === 2. CREAR TÍTULO ===
// Se crea un título <h2> para encabezar el formulario de inicio de sesión.
// Se define su texto, se agregan clases de estilo y se aplica color.
const titulo = document.createElement("h2");
titulo.textContent = "Iniciar Sesión";
titulo.classList.add("text-center", "mb-4");
titulo.style.color = "#5A4B40";
contenedor.appendChild(titulo); // finalmente se agrega dentro del contenedor principal.


// === 3. CREAR FORMULARIO ===
// Aquí se crea el elemento <form> donde irán los campos del login.
// Se le asigna un id para poder manipularlo luego (por ejemplo, en los eventos).
const form = document.createElement("form");
form.id = "loginForm";


// === 4. CAMPO CORREO ===
// Se genera la estructura de un campo de entrada para el correo electrónico.
const divCorreo = document.createElement("div");
divCorreo.classList.add("mb-3"); // clase Bootstrap para dar separación vertical.

const inputCorreo = document.createElement("input");
inputCorreo.type = "email"; // tipo email para validación automática del navegador.
inputCorreo.placeholder = "Correo Electrónico";
inputCorreo.classList.add("form-control");
inputCorreo.id = "correo";

// Se insertan los elementos en orden: input dentro del div, y el div dentro del formulario.
divCorreo.appendChild(inputCorreo);
form.appendChild(divCorreo);


// === 5. CAMPO CONTRASEÑA ===
// Se crea el campo para ingresar la contraseña del usuario.
const divPass = document.createElement("div");
divPass.classList.add("mb-3");

const inputPass = document.createElement("input");
inputPass.type = "password"; // oculta los caracteres al escribir.
inputPass.placeholder = "Contraseña";
inputPass.classList.add("form-control");
inputPass.id = "password";

divPass.appendChild(inputPass);
form.appendChild(divPass);


// === 6. OPCIÓN RECORDARME Y ENLACE ===
// Se crea una sección con dos elementos: el checkbox de "Recordarme" y el enlace de “¿Olvidaste tu contraseña?”.
// Se usa flexbox para distribuirlos horizontalmente.
const divExtras = document.createElement("div");
divExtras.classList.add("d-flex", "justify-content-between", "mb-3");

// Subcontenedor del checkbox
const divCheck = document.createElement("div");

// Input tipo checkbox
const check = document.createElement("input");
check.type = "checkbox";
check.id = "recordarme";

// Etiqueta del checkbox
const labelCheck = document.createElement("label");
labelCheck.htmlFor = "recordarme";
labelCheck.textContent = "Recordarme";
labelCheck.style.fontSize = "0.9rem";

// Se agregan el checkbox y su etiqueta al div.
divCheck.appendChild(check);
divCheck.appendChild(labelCheck);

// Enlace de “¿Olvidaste tu contraseña?”
const enlaceOlvido = document.createElement("a");
enlaceOlvido.href = "#";
enlaceOlvido.textContent = "¿Olvidaste tu contraseña?";
enlaceOlvido.style.fontSize = "0.9rem";
enlaceOlvido.style.color = "#C9A14A";

// Finalmente se agregan ambos elementos al contenedor general.
divExtras.appendChild(divCheck);
divExtras.appendChild(enlaceOlvido);
form.appendChild(divExtras);


// === 7. BOTÓN DE ENVIAR ===
// Botón principal del formulario, encargado de ejecutar el inicio de sesión.
const boton = document.createElement("button");
boton.type = "submit"; // envía el formulario.
boton.id = "btnLogin";
boton.textContent = "Iniciar Sesión";
boton.classList.add("btn", "boton-personalizado", "w-100"); // estilos personalizados + ancho completo.
form.appendChild(boton);


// === 8. ENLACE DE REGISTRO ===
// Se añade una pequeña línea inferior con un enlace para registrarse, en caso de no tener cuenta.
const divRegistro = document.createElement("div");
divRegistro.classList.add("text-center", "mt-3");
divRegistro.style.fontSize = "0.9rem";
divRegistro.innerHTML = `¿No tienes cuenta? <a href="#" style="color:#C9A14A;">Regístrate aquí</a>`;
form.appendChild(divRegistro);


// === 9. AGREGAR FORMULARIO AL CONTENEDOR ===
// Aquí finalmente insertamos el formulario ya completo dentro del contenedor del login.
contenedor.appendChild(form);


// === 10. EVENTO CLICK EN BOTÓN (DOM + ALERTA) ===
// Se detecta cuando el usuario hace clic en el botón de iniciar sesión.
// En este caso, se muestra en consola el evento y se lanza una alerta informativa.
const button = document.getElementById("btnLogin");
button.addEventListener("click", function(event) {
  console.log(event);
  alert("Intentando iniciar sesión...");
});


// === 11. EVENTO SUBMIT ===
// Controla el envío del formulario. Previene la recarga automática del navegador.
// Luego valida que los campos no estén vacíos y simula un proceso de inicio de sesión.
form.addEventListener("submit", function(event) {
  event.preventDefault(); // evita la recarga por defecto del formulario.

  // Se obtienen los valores de los campos, eliminando espacios innecesarios con trim().
  const correo = inputCorreo.value.trim();
  const password = inputPass.value.trim();

  // Validación simple: si falta algún campo, se muestra un mensaje de error.
  if (!correo || !password) {
    mostrarMensaje("Completa ambos campos antes de continuar.", false);
    return;
  }

  // Simulación del proceso de inicio de sesión (como si verificara los datos con un servidor).
  setTimeout(function() {
    mostrarMensaje("Inicio de sesión exitoso. Bienvenido/a a Brillo Eterno.", true);

    // Luego de mostrar el mensaje, se redirige automáticamente a la página principal.
    setTimeout(function() {
      window.location.href = "index.html";
    }, 1500);
  }, 800);
});


// === 12. EVENTO INPUT EN CORREO (DOM ACTUALIZA) ===
// Detecta mientras el usuario escribe su correo y lo muestra en consola.
// Es útil para validaciones o para hacer comprobaciones en tiempo real.
inputCorreo.addEventListener("input", function() {
  console.log("Correo ingresado: " + this.value);
});


// === 13. FUNCIÓN PARA MOSTRAR MENSAJES ===
// Esta función muestra mensajes temporales (de éxito o error) en pantalla.
// Crea un elemento <div> con la clase alert y lo elimina después de 2.5 segundos.
function mostrarMensaje(texto, exito) {
  // Si ya existe un mensaje previo, se elimina para no duplicar alertas.
  const anterior = contenedor.querySelector(".alert");
  if (anterior) anterior.remove();

  // Se crea el nuevo mensaje con su estilo según el tipo (éxito o error).
  const alerta = document.createElement("div");
  alerta.textContent = texto;
  alerta.className = `alert mt-3 ${exito ? "alert-success" : "alert-danger"}`;

  // Se agrega dentro del contenedor principal.
  contenedor.appendChild(alerta);

  // Y se elimina automáticamente luego de 2.5 segundos.
  setTimeout(() => alerta.remove(), 2500);
}
