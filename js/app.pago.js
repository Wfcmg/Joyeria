// ===============================
// APLICACIÓN PRINCIPAL - PAGO
// ===============================

// Iniciar animaciones con AOS (si está disponible)
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 1000, once: true });
}

document.addEventListener("DOMContentLoaded", () => {
  NavbarController.render("navbar");
  FooterController.render("footer");

  // Y aquí lo tuyo:
  const contacto = new ContactoController();
  contacto.init();

  const cita = new CitaController();
  cita.init();
});


// Efecto de desvanecimiento del hero al hacer scroll (si existe)
const hero = document.getElementById("hero");
if (hero) {
  window.addEventListener("scroll", () => {
    hero.classList.toggle("fade-out", window.scrollY > 100);
  });
}

// ===============================
// INICIALIZAR CONTROLADOR DE PAGO
// ===============================
$(document).ready(function() {
  console.log(" Iniciando sistema de pago MVC");

  // Verificar que el contenedor existe
  const contenedorPago = document.getElementById("formulario-pago");
  console.log(" Contenedor de pago existe:", !!contenedorPago);

  // Inicializar controlador de pago
  try {
    console.log("🔧 Iniciando PagoController...");
    PagoController.init();
    console.log(" PagoController inicializado correctamente");
  } catch(e) {
    console.error(" Error al inicializar PagoController:", e);
  }

  // Verificar si el formulario se generó
  setTimeout(() => {
    const formPago = document.getElementById("pagoForm");
    console.log("Formulario de pago generado:", !!formPago);
  }, 500);
});
