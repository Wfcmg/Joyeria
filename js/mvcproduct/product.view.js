// Vista de productos - Renderizado del DOM con jQuery

window.ProductView = (function() {

  let $app;

  // Inicializar referencias del DOM
  function init() {
    $app = $('#app');
  }

  // Render del layout completo
  function renderLayout() {
    const template = `
      <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar shadow-sm py-1 sticky-top">
        <div class="container-fluid px-4 d-flex align-items-center justify-content-between">
          <a class="navbar-brand d-flex align-items-center fw-bold tittle-navbar" href="index.html" style="margin-left: 10px;">
            <img src="img/logo_brilloeterno.png" alt="Logo Brillo Eterno" width="72" height="72" class="me-2" style="object-fit: contain;">
            <span class="nombre-logo">Brillo Eterno</span>
          </a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav align-items-center">
              <li class="nav-item mx-2"><a class="nav-link enlace" href="index.html">Inicio</a></li>
              <li class="nav-item mx-2"><a class="nav-link enlace active" href="productos.html">Productos</a></li>
              <li class="nav-item mx-2"><a class="nav-link enlace" href="contacto.html">Contacto</a></li>

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

      <section class="text-center py-5">
        <h1 class="titulo-productos">Nuestra Colección</h1>
        <p class="subtitulo-productos">Joyas diseñadas con elegancia y perfección</p>
      </section>

      <section id="toolbar-productos" class="container">
        <div id="resultado-conteo">0 resultados</div>
        <div class="d-flex align-items-center gap-2">
          <label for="ordenar-select" class="me-1">Ordenar por:</label>
          <select id="ordenar-select" class="form-select form-select-sm" style="width: 210px;">
            <option value="recomendado">Recomendado</option>
            <option value="precio_asc">Precio ascendente</option>
            <option value="precio_desc">Precio descendente</option>
          </select>
        </div>
      </section>

      <section class="container mt-3 mb-5">
        <div class="layout-productos">
          <aside id="sidebar-filtros">
            <div class="filtro-grupo">
              <h6>Categoría</h6>
              <div id="filtro-categoria"></div>
            </div>
            <hr>
            <div class="filtro-grupo">
              <h6>Material</h6>
              <div id="filtro-material"></div>
            </div>
            <hr>
            <button id="btn-limpiar-filtros" type="button">Limpiar filtros</button>
          </aside>

          <div>
            <div class="row g-4" id="grid-productos"></div>
            <div id="msg-vacio" class="d-none">Sin resultados con los filtros seleccionados.</div>
          </div>
        </div>
      </section>

      <footer id="contacto" class="footer text-center">
        <div class="container">
          <h5>Brillo Eterno</h5>
          <p>Av. Central 123, Quito - Ecuador</p>
          <p>Email: contacto@brilloeterno.com | Tel: +593 987 654 321</p>

          <div class="social-icons mt-3">
            <a href="#" class="mx-3"><i class="fab fa-facebook fa-2x"></i></a>
            <a href="#" class="mx-3"><i class="fab fa-instagram fa-2x"></i></a>
            <a href="#" class="mx-3"><i class="fab fa-whatsapp fa-2x"></i></a>
          </div>

          <p class="mt-4 small">© 2025 Brillo Eterno. Todos los derechos reservados.</p>
        </div>
      </footer>
    `;

    $app.html(template);
  }

  // Render de filtros dinámicos con jQuery
  function renderFilters(facets) {
    const categorias = [];
    const materiales = [];

    facets.categorias.forEach(function(val) {
      categorias.push(val);
    });

    facets.materiales.forEach(function(val) {
      materiales.push(val);
    });

    categorias.sort();
    materiales.sort();

    let catHTML = '';
    $.each(categorias, function(index, v) {
      catHTML += '<label class="item"><input type="checkbox" value="' + v + '" name="cat[]"> ' + v + '</label>';
    });

    let matHTML = '';
    $.each(materiales, function(index, v) {
      matHTML += '<label class="item"><input type="checkbox" value="' + v + '" name="mat[]"> ' + v + '</label>';
    });

    $('#filtro-categoria').html(catHTML);
    $('#filtro-material').html(matHTML);
  }

  // Render de una tarjeta de producto
  function renderCard(p) {
    const precioFormateado = window.ProductUtils.formatUSD(p.precio);

    return '<div class="col-12 col-sm-6 col-lg-4 col-xl-3">' +
      '<div class="card producto-card shadow-sm">' +
      '<div class="producto-imagen">' +
      '<img src="' + p.img + '" alt="' + p.nombre + '">' +
      '</div>' +
      '<div class="card-body text-center">' +
      '<h5 class="product-name">' + p.nombre + '</h5>' +
      '<div class="product-meta">' + p.material + '</div>' +
      '<div class="product-price">' + precioFormateado + '</div>' +
      '<a class="btn boton-personalizado mt-2" href="detalle.html#' + p.id + '">Ver detalle</a>' +
      '</div>' +
      '</div>' +
      '</div>';
  }

  // Render de la grilla completa de productos
  function renderGrid(lista) {
    const $grid = $('#grid-productos');
    const $msgVacio = $('#msg-vacio');

    if (lista.length === 0) {
      $msgVacio.removeClass('d-none');
      $grid.hide().empty().fadeIn(300);
      return;
    }

    $msgVacio.addClass('d-none');

    let html = '';
    $.each(lista, function(index, p) {
      html += renderCard(p);
    });

    $grid.hide().html(html).fadeIn(300);
  }

  // Actualizar contador de resultados con animación
  function updateCounter(total) {
    const texto = total + ' resultado' + (total !== 1 ? 's' : '');

    $('#resultado-conteo').fadeOut(120, function() {
      $(this).text(texto).fadeIn(120);
    });
  }

  // Actualizar el selector de ordenamiento
  function updateOrdenSelect(orden) {
    $('#ordenar-select').val(orden);
  }

  // Limpiar checkboxes de filtros
  function clearFilterCheckboxes() {
    $('#sidebar-filtros').find('input[type="checkbox"]').prop('checked', false);
  }

  // API pública
  return {
    init: init,
    renderLayout: renderLayout,
    renderFilters: renderFilters,
    renderGrid: renderGrid,
    updateCounter: updateCounter,
    updateOrdenSelect: updateOrdenSelect,
    clearFilterCheckboxes: clearFilterCheckboxes
  };

})();
