
// ===============================
// APLICACIÓN PRINCIPAL - CONTACTO
// ===============================

console.log("app.contacto.js cargado");

// Iniciar animaciones con AOS
AOS.init({ duration: 1000, once: true });

// Efecto de desvanecimiento del hero al hacer scroll
const hero = document.getElementById("hero");
window.addEventListener("scroll", () => {
  if (hero) {
    hero.classList.toggle("fade-out", window.scrollY > 100);
  }
});

// ===============================
// CONTROL DE SECCIONES
// ===============================
const tarjetas = document.getElementById("tarjetas-contacto");
const seccionContacto = document.getElementById("seccionContacto");
const seccionCita = document.getElementById("seccionCita");

const btnAbrirContacto = document.getElementById("btnAbrirContacto");
const btnAbrirCita = document.getElementById("btnAbrirCita");
const volverTarjetas1 = document.getElementById("volverTarjetas1");
const volverTarjetas2 = document.getElementById("volverTarjetas2");

console.log(" Elementos encontrados:", {
  tarjetas: !!tarjetas,
  seccionContacto: !!seccionContacto,
  seccionCita: !!seccionCita,
  btnAbrirContacto: !!btnAbrirContacto,
  btnAbrirCita: !!btnAbrirCita
});

// Mostrar formulario de contacto
if (btnAbrirContacto) {
  btnAbrirContacto.addEventListener("click", () => {
    console.log(" Click en Abrir Contacto");
    tarjetas.classList.add("d-none");
    seccionCita.classList.add("d-none");
    seccionContacto.classList.remove("d-none");
  });
}

// Mostrar formulario de cita
if (btnAbrirCita) {
  btnAbrirCita.addEventListener("click", () => {
    console.log(" Click en Abrir Cita");
    tarjetas.classList.add("d-none");
    seccionContacto.classList.add("d-none");
    seccionCita.classList.remove("d-none");
  });
}

// Volver a las tarjetas desde contacto
if (volverTarjetas1) {
  volverTarjetas1.addEventListener("click", () => {
    console.log(" Click en Volver desde Contacto");
    seccionContacto.classList.add("d-none");
    tarjetas.classList.remove("d-none");
  });
}

// Volver a las tarjetas desde cita
if (volverTarjetas2) {
  volverTarjetas2.addEventListener("click", () => {
    console.log(" Click en Volver desde Cita");
    seccionCita.classList.add("d-none");
    tarjetas.classList.remove("d-none");
  });
}

// ===============================
// INICIALIZAR CONTROLADORES MVC
// ===============================
console.log("⏳ Esperando jQuery...");

$(document).ready(function() {
  console.log(" jQuery listo - Iniciando controladores MVC");

  // Verificar que existen los controladores
  console.log("ContactoController existe:", typeof ContactoController !== 'undefined');
  console.log("CitaController existe:", typeof CitaController !== 'undefined');

  // Verificar que existen los contenedores
  const contenedorContacto = document.getElementById("formulario-contacto");
  const contenedorCita = document.getElementById("formulario-cita");

  console.log(" Contenedor contacto existe:", !!contenedorContacto);
  console.log(" Contenedor cita existe:", !!contenedorCita);

  // Inicializar controlador de contacto
  try {
    console.log("🔧 Iniciando ContactoController...");
    ContactoController.init();
    console.log(" ContactoController inicializado");
  } catch(e) {
    console.error(" Error al inicializar ContactoController:", e);
  }

  // Inicializar controlador de cita
  try {
    console.log("🔧 Iniciando CitaController...");
    CitaController.init();
    console.log(" CitaController inicializado");
  } catch(e) {
    console.error("Error al inicializar CitaController:", e);
  }

  // Verificar si los formularios se generaron
  setTimeout(() => {
    const formContacto = document.getElementById("form_js");
    const formCita = document.getElementById("formCita");
    console.log(" Formulario de contacto generado:", !!formContacto);
    console.log(" Formulario de cita generado:", !!formCita);
  }, 500);
});
