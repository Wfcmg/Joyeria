// Vista de productos - Todo implementado con jQuery

$(document).ready(function() {

  // Estado global
  let estado = {
    orden: 'recomendado',
    filtros: { categorias: new Set(), materiales: new Set() },
    base: window.ProductRepo.getAll()
  };

  // Construir facetas con jQuery
  function buildFacets(productos) {
    const categorias = new Set();
    const materiales = new Set();

    $.each(productos, function(index, p) {
      if (p.categoria) categorias.add(p.categoria);
      if (p.material) materiales.add(p.material);
    });

    return { categorias, materiales };
  }

  // Ordenar productos con jQuery
  function sortProducts(lista, criterio) {
    const copia = $.extend(true, [], lista);

    if (criterio === 'precio_asc') {
      return copia.sort(function(a, b) {
        return a.precio - b.precio;
      });
    } else if (criterio === 'precio_desc') {
      return copia.sort(function(a, b) {
        return b.precio - a.precio;
      });
    } else {
      return copia;
    }
  }

  // Aplicar filtros con jQuery
  function applyFilters(lista, filtros) {
    return $.grep(lista, function(p) {
      const cumpleCategoria = filtros.categorias.size === 0 ||
        filtros.categorias.has(p.categoria);

      const cumpleMaterial = filtros.materiales.size === 0 ||
        filtros.materiales.has(p.material);

      return cumpleCategoria && cumpleMaterial;
    });
  }

  // Formatear a USD
  function formatUSD(n) {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(n);
  }

  // Calcular total de inventario con jQuery
  function calcularTotalInventarioActivos(lista) {
    let total = 0;

    $.each(lista, function(index, p) {
      if (p.estado) {
        total += p.precio * p.stock;
      }
    });

    return total;
  }

  // Render layout completo con jQuery
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

    $('#app').html(template);
  }

  // Render filtros dinámicos con jQuery
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

  // Render grilla de productos con jQuery
  function renderCard(p) {
    return `
      <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
        <div class="card producto-card shadow-sm">
          <div class="producto-imagen">
            <img src="${p.img}" alt="${p.nombre}" />
          </div>
          <div class="card-body text-center">
            <h5 class="product-name">${p.nombre}</h5>
            <div class="product-meta">${p.material}</div>
            <div class="product-price">${formatUSD(p.precio)}</div>
            <a class="btn boton-personalizado mt-2" href="detalle.html#${p.id}">Ver detalle</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderGrid(lista) {
    const $grid = $('#grid-productos');
    const $msgVacio = $('#msg-vacio');

    if (lista.length === 0) {
      $grid.hide().empty().fadeIn(300);
      $msgVacio.removeClass('d-none');
    } else {
      $msgVacio.addClass('d-none');

      let html = '';
      $.each(lista, function(index, p) {
        html += renderCard(p);
      });

      $grid.hide().html(html).fadeIn(300);
    }
  }

  // Actualizar vista completa con jQuery
  function updateView() {
    const listaFiltrada = applyFilters(estado.base, estado.filtros);
    const listaOrdenada = sortProducts(listaFiltrada, estado.orden);

    renderGrid(listaOrdenada);

    const texto = listaOrdenada.length + ' resultado' + (listaOrdenada.length !== 1 ? 's' : '');

    $('#resultado-conteo').fadeOut(120, function() {
      $(this).text(texto).fadeIn(120);
    });

    const total = calcularTotalInventarioActivos(estado.base);
    console.log("Total inventario (activos): $" + total.toFixed(2));
  }

  // Bind eventos con jQuery
  function bindEvents() {

    // Ordenar
    $('#ordenar-select').on('change', function() {
      estado.orden = $(this).val();
      updateView();
    });

    // Filtros con delegación
    $('#sidebar-filtros').on('change', 'input[type="checkbox"]', function() {
      const $checkbox = $(this);
      const valor = $checkbox.val();
      const name = $checkbox.attr('name');
      const checked = $checkbox.is(':checked');

      if (name === 'cat[]') {
        if (checked) {
          estado.filtros.categorias.add(valor);
        } else {
          estado.filtros.categorias.delete(valor);
        }
      } else if (name === 'mat[]') {
        if (checked) {
          estado.filtros.materiales.add(valor);
        } else {
          estado.filtros.materiales.delete(valor);
        }
      }

      updateView();
    });

    // Limpiar filtros
    $('#btn-limpiar-filtros').on('click', function() {
      estado.filtros.categorias.clear();
      estado.filtros.materiales.clear();
      estado.orden = 'recomendado';

      $('#ordenar-select').val('recomendado');
      $('#sidebar-filtros').find('input[type="checkbox"]').prop('checked', false);

      updateView();
    });
  }

  // Inicialización con jQuery
  function init() {
    renderLayout();

    const facets = buildFacets(estado.base);
    renderFilters(facets);

    updateView();
    bindEvents();
  }

  init();

});
