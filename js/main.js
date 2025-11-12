// ==========================
// FUNCIÓN PRINCIPAL PARA CREAR TODAS LAS SECCIONES DE LA PÁGINA
// ==========================

// Se obtiene el contenedor general del HTML donde se construirá toda la página
const app = document.getElementById("app");


app.innerHTML = `
<!-- ========================================================= -->
<!-- ====================== NAVBAR ============================ -->
<!-- ========================================================= -->
<!-- Es la barra superior fija que contiene el logo y las secciones principales -->
<nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar shadow-sm py-1 sticky-top">
  <div class="container-fluid px-4 d-flex align-items-center justify-content-between">
    <!-- Logo y nombre del sitio, que redirigen al inicio -->
    <a class="navbar-brand d-flex align-items-center fw-bold tittle-navbar" href="index.html" style="margin-left: 10px;">
      <!-- Imagen del logo -->
      <img src="img/logo_brilloeterno.png" alt="Logo Brillo Eterno" width="72" height="72" class="me-2" style="object-fit: contain;">
      <!-- Texto del nombre de la marca -->
      <span class="nombre-logo">Brillo Eterno</span>
    </a>

    <!-- Botón hamburguesa para pantallas pequeñas (activa o colapsa el menú) -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Contenedor que agrupa los enlaces de navegación -->
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav align-items-center">
        <!-- Enlace al inicio -->
        <li class="nav-item mx-2"><a class="nav-link enlace" href="index.html">Inicio</a></li>
        <!-- Enlace a productos -->
        <li class="nav-item mx-2"><a class="nav-link enlace" href="productos.html">Productos</a></li>
        <!-- Enlace a la página de contacto -->
        <li class="nav-item mx-2"><a class="nav-link enlace" href="contacto.html">Contacto</a></li>

        <!-- Ícono del carrito (con imagen personalizada) -->
        <li class="nav-item d-flex align-items-center mx-1 icono-carrito">
          <a class="nav-link p-0 icono" href="carrito.html" title="Carrito">
            <img src="img/icono_carrito.png" alt="Carrito" width="38" height="38" style="object-fit: contain;">
          </a>
        </li>

        <!-- Ícono del usuario (login o perfil) -->
        <li class="nav-item d-flex align-items-center ms-2 icono-login-item">
          <a class="icono-login d-flex align-items-center justify-content-center" href="login.html" title="Login">
            <img src="img/icono_usuario.png" alt="Usuario" width="22" height="22" style="object-fit: contain;">
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  <!-- ================= HERO ================= -->
  <!-- Sección principal con imagen de fondo y texto destacado -->
  <section id="inicio" class="hero1">
    <div class="hero-text">
      <h1>Colección Destacada</h1>
      <p>Anillos, Collares y Pulseras Exclusivas</p>
      <button class="btn boton-dorado">Explorar Productos</button>
    </div>
  </section>

  <!-- ================= COLECCIONES ================= -->
  <!-- Sección con las tres categorías principales de productos -->
  <section id="colecciones" class="colecciones text-center animate-on-scroll">
    <div class="container">
      <h2>Nuestras Colecciones</h2>
      <div class="row g-4" id="colecciones-container"></div>
    </div>
  </section>

  <!-- ================= PRODUCTOS ================= -->
  <!-- Sección donde se mostrarán las tarjetas dinámicas de productos -->
  <section id="productos" class="productos-section text-center">
    <div class="container">
      <h2>Productos Destacados</h2>
      <div class="row g-4" id="productos-destacados"></div>
    </div>
  </section>

  <!-- ================= FRASE INSPIRADORA ================= -->
  <section class="frase animate-on-scroll">
    <p>La belleza es eterna. Descubre tu brillo.</p>
  </section>

  <!-- ================= FOOTER ================= -->
  <!-- Pie de página con información de contacto y redes sociales -->
  <footer id="contacto" class="footer text-center">
    <div class="container">
      <h5>Brillo Eterno</h5>
      <p>Av. Central 123, Quito - Ecuador</p>
      <p>Email: contacto@brilloeterno.com | Tel: +593 987 654 321</p>

      <!-- Íconos de redes sociales -->
      <div class="social-icons mt-3">
        <a href="#" class="mx-3"><i class="fab fa-facebook fa-2x"></i></a>
        <a href="#" class="mx-3"><i class="fab fa-instagram fa-2x"></i></a>
        <a href="#" class="mx-3"><i class="fab fa-whatsapp fa-2x"></i></a>
      </div>

      <p class="mt-4 small">© 2025 Brillo Eterno. Todos los derechos reservados.</p>
    </div>
  </footer>
`;

// ==========================
// SECCIÓN DE COLECCIONESs
// ==========================

// Se definen los objetos que representan las categorías principales
const colecciones = [
  { img: "img/oro.jpg", titulo: "Oro", texto: "Elegancia eterna y brillo incomparable." },
  { img: "img/plata.jpg", titulo: "Plata", texto: "Reflejo puro y sofisticado de tu estilo." },
  { img: "img/acero.jpg", titulo: "Acero", texto: "Resistencia, modernidad y brillo único." }
];

// Se obtiene el contenedor donde se insertarán las tarjetas
const coleccionesContainer = document.getElementById("colecciones-container");

// Se recorre el arreglo y se crea una tarjeta por cada colección
colecciones.forEach(col => {
  const div = document.createElement("div");
  div.classList.add("col-md-4"); // Clase Bootstrap para tamaño medio
  div.innerHTML = `
    <div class="metal-card">
      <img src="${col.img}" alt="Colección ${col.titulo}" class="imagen-metal">
      <div class="overlay">
        <h3>${col.titulo}</h3>
        <p>${col.texto}</p>
      </div>
    </div>`;
  coleccionesContainer.appendChild(div);
});

// ==========================
// SECCIÓN DE PRODUCTOS DESTACADOS
// ==========================

// Se define un arreglo de productos destacados con su nombre, precio e imagen
const productos = [
  { nombre: "Anillo de Oro", precio: 120.00, imagen: "img/anillo_oro.jpg" },
  { nombre: "Collar de Plata", precio: 85.50, imagen: "img/collar_plata.jpg" },
  { nombre: "Pulsera de Acero", precio: 60.00, imagen: "img/pulsera_acero.jpg" },
  { nombre: "Aretes Premium", precio: 95.00, imagen: "img/aretes_premium.jpg" }
];

// Contenedor donde se insertarán las tarjetas dinámicas de productos
const contenedorProductos = document.getElementById('productos-destacados');

// Se crean las tarjetas de producto dinámicamente
productos.forEach(prod => {
  const card = document.createElement('div');
  card.classList.add('col-md-3', 'text-center', 'animate-on-scroll'); // Diseño responsive

  // Contenido HTML de cada producto
  card.innerHTML = `
    <div class="product-mini" style="background-image: url('${prod.imagen}'); background-size: cover; background-position: center;">
      <div class="overlay-producto">
        <h4>${prod.nombre}</h4>
        <p>$${prod.precio.toFixed(2)}</p>
      </div>
    </div>
    <p class="product-title">${prod.nombre}</p>
  `;

  contenedorProductos.appendChild(card);
});

// ==========================
// ANIMACIONES AL HACER SCROLL
// ==========================

// Selecciona todos los elementos que tendrán la animación de aparición
const elements = document.querySelectorAll('.animate-on-scroll');

// Cada vez que el usuario haga scroll, se evalúa qué elementos son visibles
window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    // Si el elemento está dentro del área visible de la ventana, se activa la animación
    if (rect.top < window.innerHeight - 100) el.classList.add('active');
  });
});
