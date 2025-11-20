const app = document.getElementById("app");

app.innerHTML =`
  <!-----------NAVBAR -------- -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar shadow-sm py-1 sticky-top">
    <div class="container-fluid px-4 d-flex align-items-center justify-content-between">
      <!-- Logo y nombre del sitio, que redirigen al inicio -->
      <a class="navbar-brand d-flex align-items-center fw-bold tittle-navbar" href="index.html" style="margin-left: 10px;">
        <!-- Imagen del logo -->
        <img src="img/logo_brilloeterno.png" alt="Logo Brillo Eterno" width="72" height="72" class="me-2" style="object-fit: contain;">
          <!-- Texto del nombre de la marca -->
          <span class="nombre-logo">Brillo Eterno</span>
      </a>

      <!-- Botón hamburguesa  -->
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

          <!-- Ícono del carrito  -->
          <li class="nav-item d-flex align-items-center mx-1 icono-carrito">
            <a class="nav-link p-0 icono" href="carrito.html" title="Carrito">
              <img src="img/icono_carrito.png" alt="Carrito" width="38" height="38" style="object-fit: contain;">
            </a>
          </li>

          <!-- Ícono del usuario -->
          <li class="nav-item d-flex align-items-center ms-2 icono-login-item">
            <a class="icono-login d-flex align-items-center justify-content-center" href="login.html" title="Login">
              <img src="img/icono_usuario.png" alt="Usuario" width="22" height="22" style="object-fit: contain;">
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- =============== HERO (SECCIÓN 2) =============== -->
  <section class="position-relative text-center d-flex align-items-center justify-content-center"
           style="height:90vh; background:url('img/Portada.jpg') center/cover no-repeat;">

    <!-- Oscurecedor -->
    <div class="position-absolute top-0 start-0 w-100 h-100"
         style="background:rgba(0,0,0,0.35);"></div>

    <!-- Texto -->
    <div class="position-relative text-white">
      <h1 class="display-4 fw-bold mb-3">La Elegancia que Perdura</h1>
      <p class="fs-5 mb-4">Anillos, Collares y Pulseras exclusivas</p>
      <a href="productos.html" class="btn boton-dorado px-4 py-2">Explorar Productos</a>
    </div>

  </section>
  <!-- =============== PRODUCTOS DESTACADOS =============== -->
  <section class="py-5 bg-light">
    <div class="container">

      <h2 class="text-center mb-4 fw-bold" style="color:#5A4B40;">
        Productos Destacados
      </h2>

      <div class="row g-4" id="destacados-container">
        <!-- Aquí se insertarán las cards dinámicas -->
      </div>

    </div>
  </section>

<!-- ================= CATEGORÍAS ================= -->
<section class="py-5">
  <div class="container">

    <h2 class="text-center mb-4 fw-bold" style="color:#5A4B40;">
      Encuentra tu estilo
    </h2>

    <div class="row g-4" id="categorias-container"></div>

  </div>
</section>
<!-- ================= FOOTER ================= -->
<footer id="contacto" class="footer text-center">
  <div class="container">

    <h5>Brillo Eterno</h5>

    <p>Av. Central 123, Quito - Ecuador</p>

    <p>Email: contacto@brilloeterno.com | Tel: +593 987 654 321</p>

    <!-- Íconos de redes sociales -->
    <div class="social-icons mt-3">

      <a href="#" class="mx-3">
        <i class="fab fa-facebook fa-2x"></i>
      </a>

      <a href="#" class="mx-3">
        <i class="fab fa-instagram fa-2x"></i>
      </a>

      <a href="#" class="mx-3">
        <i class="fab fa-whatsapp fa-2x"></i>
      </a>

    </div>

    <p class="mt-4 small">© 2025 Brillo Eterno. Todos los derechos reservados.</p>

  </div>
</footer>



`;
// ===================== PRODUCTOS DESTACADOS DINÁMICOS =====================

// 1. Obtener todos los productos del repositorio
const todos = ProductRepo.getAll();

// 2. Filtrar solo los destacados
const destacados = todos.filter(p => p.destacado === true);

// 3. Contenedor donde se van a insertar
const contenedor = document.getElementById("destacados-container");

// 4. Renderizar cada card
destacados.forEach(prod => {
  contenedor.innerHTML += `
    <div class="col-12 col-sm-6 col-md-3">
      <div class="card h-100 shadow-sm border-0">

       <div class="product-img" style="background-image:url('${prod.img}')"></div>


        <div class="card-body text-center">
          <h5 class="card-title" style="color:#5A4B40;">${prod.nombre}</h5>
        <a href="detalle.html?id=${prod.id}" class="btn boton-dorado px-4 py-2 mt-4">
          Ver detalle
        </a>

        </div>

      </div>
    </div>
  `;
});
// ====================== CATEGORÍAS ======================

const categorias = [
  { nombre: "Anillos", img: "img/anillo_oro.jpg" },
  { nombre: "Collares", img: "img/collar_plata.jpg" },
  { nombre: "Pulseras", img: "img/acero.jpg" },
  { nombre: "Aretes",   img: "img/producto4.jpg" },
  { nombre: "Relojes",  img: "img/producto5.jpg" }
];

const catContainer = document.getElementById("categorias-container");

categorias.forEach(cat => {

  catContainer.innerHTML += `
    <div class="col-6 col-md-4 col-lg-2 mx-auto">
      <div class="card border-0 shadow-sm categoria-card">

        <div class="categoria-img" style="background-image:url('${cat.img}')"></div>

        <div class="card-body text-center">
          <h5 class="fw-semibold" style="color:#5A4B40;">${cat.nombre}</h5>
        </div>

      </div>
    </div>
  `;
});
