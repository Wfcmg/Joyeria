// --- VIEW: NAVBAR ---
window.NavbarView = (function () {

  function template() {
    return `
    <!-----------NAVBAR -------- -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar shadow-sm py-1 sticky-top">
      <div class="container-fluid px-4 d-flex align-items-center justify-content-between">

        <!-- Logo y nombre del sitio, que redirigen al inicio -->
        <a class="navbar-brand d-flex align-items-center fw-bold tittle-navbar" href="index.html" style="margin-left: 10px;">
          <img src="img/logo_brilloeterno.png" alt="Logo Brillo Eterno" width="72" height="72" class="me-2" style="object-fit: contain;">
          <span class="nombre-logo">Brillo Eterno</span>
        </a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav align-items-center">

            <li class="nav-item mx-2">
              <a class="nav-link enlace" href="index.html">Inicio</a>
            </li>

            <li class="nav-item mx-2">
              <a class="nav-link enlace" href="productos.html">Productos</a>
            </li>

            <li class="nav-item mx-2">
              <a class="nav-link enlace" href="contacto.html">Contacto</a>
            </li>

            <li class="nav-item d-flex align-items-center mx-1 icono-carrito">
              <a class="nav-link p-0 icono" href="carrito.html" title="Carrito">
                <img src="img/icono_carrito.png" alt="Carrito" width="38" height="38" style="object-fit: contain;">
              </a>
            </li>

            <li class="nav-item d-flex align-items-center ms-2 icono-login-item">
              <a class="icono-login d-flex align-items-center justify-content-center" href="login.html" title="Login">
                <img src="img/icono_usuario.png" alt="Usuario" width="22" height="22" style="object-fit: contain;">
              </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
    `;
  }

  return { get: template };

})();
