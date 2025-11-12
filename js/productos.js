// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // ========== DATOS EXTENDIDOS ==========
  const productos = [
    {
      id: "p1",
      nombre: 'Anillo "Eternidad Solitaria"',
      descripcion: "Compromiso clásico. Diamante de corte brillante.",
      img: "img/producto1.jpg",
      precio: 1299.99,
      stock: 5,
      estado: true,
      categoria: "Anillo",
      material: "Oro blanco"
    },
    {
      id: "p2",
      nombre: 'Colgante "Aura de Esmeralda"',
      descripcion: "Vibrante esmeralda central y sofisticación.",
      img: "img/producto2.jpg",
      precio: 999.99,
      stock: 7,
      estado: true,
      categoria: "Collar",
      material: "Oro blanco"
    },
    {
      id: "p3",
      nombre: 'Brazalete "Luz Constelación"',
      descripcion: "Fila de diamantes sutilmente brillantes.",
      img: "img/producto3.jpg",
      precio: 849.99,
      stock: 8,
      estado: true,
      categoria: "Pulsera",
      material: "Plata"
    },
    {
      id: "p4",
      nombre: 'Pendientes "Perla Serena"',
      descripcion: "Perlas cultivadas con lustre perfecto.",
      img: "img/producto4.jpg",
      precio: 459.99,
      stock: 12,
      estado: true,
      categoria: "Aretes",
      material: "Plata"
    },
    {
      id: "p5",
      nombre: 'Reloj "Tempo Rosado"',
      descripcion: "Oro rosa, nácar iridiscente y diseño impecable.",
      img: "img/producto5.jpg",
      precio: 699.99,
      stock: 6,
      estado: true,
      categoria: "Reloj",
      material: "Oro rosa"
    }
  ];

  // ==========  ESTADO GLOBAL ==========
  let estado = {
    orden: 'recomendado',
    filtros: { categorias: new Set(), materiales: new Set() },
    base: productos.slice()
  };

  // ========== FUNCIONES PURAS ==========

  function buildFacets(productos) {
    const categorias = new Set();
    const materiales = new Set();

    productos.forEach(p => {
      if (p.categoria) categorias.add(p.categoria);
      if (p.material) materiales.add(p.material);
    });

    return { categorias, materiales };
  }

  function sortProducts(lista, criterio) {
    const copia = [...lista];

    switch(criterio) {
      case 'precio_asc':
        return copia.sort((a, b) => a.precio - b.precio);
      case 'precio_desc':
        return copia.sort((a, b) => b.precio - a.precio);
      case 'recomendado':
      default:
        return copia;
    }
  }

  function applyFilters(lista, filtros) {
    return lista.filter(p => {
      // Si no hay filtros de categoría, o el producto cumple
      const cumpleCategoria = filtros.categorias.size === 0 ||
        filtros.categorias.has(p.categoria);

      // Si no hay filtros de material, o el producto cumple
      const cumpleMaterial = filtros.materiales.size === 0 ||
        filtros.materiales.has(p.material);

      return cumpleCategoria && cumpleMaterial;
    });
  }

  function formatUSD(n) {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(n);
  }

  function calcularTotalInventarioActivos(lista) {
    return lista
      .filter(p => p.estado)
      .reduce((acc, p) => acc + p.precio * p.stock, 0);
  }

  // ========== RENDER LAYOUT COMPLETO ==========

  function renderLayout() {
    const app = document.getElementById("app");
    app.innerHTML = `
      <!-- ========================================================= -->
      <!-- ====================== NAVBAR ============================ -->
      <!-- ========================================================= -->
      <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar shadow-sm py-1 sticky-top">
        <div class="container-fluid px-4 d-flex align-items-center justify-content-between">
          <!-- Logo y nombre del sitio -->
          <a class="navbar-brand d-flex align-items-center fw-bold tittle-navbar" href="index.html" style="margin-left: 10px;">
            <img src="img/logo_brilloeterno.png" alt="Logo Brillo Eterno" width="72" height="72" class="me-2" style="object-fit: contain;">
            <span class="nombre-logo">Brillo Eterno</span>
          </a>

          <!-- Botón hamburguesa -->
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
          </button>

          <!-- Enlaces -->
          <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul class="navbar-nav align-items-center">
              <li class="nav-item mx-2"><a class="nav-link enlace" href="index.html">Inicio</a></li>
              <li class="nav-item mx-2"><a class="nav-link enlace active" href="productos.html">Productos</a></li>
              <li class="nav-item mx-2"><a class="nav-link enlace" href="contacto.html">Contacto</a></li>

              <!-- Icono del carrito -->
              <li class="nav-item d-flex align-items-center mx-1 icono-carrito">
                <a class="nav-link p-0 icono" href="carrito.html" title="Carrito">
                  <img src="img/icono_carrito.png" alt="Carrito" width="38" height="38" style="object-fit: contain;">
                </a>
              </li>

              <!-- Icono usuario -->
              <li class="nav-item d-flex align-items-center ms-2 icono-login-item">
                <a class="icono-login d-flex align-items-center justify-content-center" href="login.html" title="Login">
                  <img src="img/icono_usuario.png" alt="Usuario" width="22" height="22" style="object-fit: contain;">
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <!-- ENCABEZADO -->
      <section class="text-center py-5">
        <h1 class="titulo-productos">Nuestra Colección</h1>
        <p class="subtitulo-productos">Joyas diseñadas con elegancia y perfección</p>
      </section>

      <!-- TOOLBAR -->
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

      <!-- LAYOUT PRODUCTOS -->
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

      <!-- ================= FOOTER ================= -->
      <footer id="contacto" class="footer text-center">
        <div class="container">
          <h5>Brillo Eterno</h5>
          <p>Av. Central 123, Quito - Ecuador</p>
          <p>Email: contacto@brilloeterno.com | Tel: +593 987 654 321</p>

          <!-- Redes -->
          <div class="social-icons mt-3">
            <a href="#" class="mx-3"><i class="fab fa-facebook fa-2x"></i></a>
            <a href="#" class="mx-3"><i class="fab fa-instagram fa-2x"></i></a>
            <a href="#" class="mx-3"><i class="fab fa-whatsapp fa-2x"></i></a>
          </div>

          <p class="mt-4 small">© 2025 Brillo Eterno. Todos los derechos reservados.</p>
        </div>
      </footer>
    `;
  }

  // ========== RENDER FILTROS DINÁMICOS ==========

  function renderFilters(facets) {
    const cat = [...facets.categorias].sort();
    const mat = [...facets.materiales].sort();

    document.getElementById('filtro-categoria').innerHTML =
      cat.map(v => `<label class="item"><input type="checkbox" value="${v}" name="cat[]"> ${v}</label>`).join('');

    document.getElementById('filtro-material').innerHTML =
      mat.map(v => `<label class="item"><input type="checkbox" value="${v}" name="mat[]"> ${v}</label>`).join('');
  }

  // ========== RENDER GRILLA DE PRODUCTOS ==========

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
    const grid = document.getElementById('grid-productos');
    const msgVacio = document.getElementById('msg-vacio');

    if (lista.length === 0) {
      grid.innerHTML = '';
      msgVacio.classList.remove('d-none');
    } else {
      msgVacio.classList.add('d-none');
      grid.innerHTML = lista.map(renderCard).join('');
    }
  }

  // ========== ACTUALIZAR VISTA COMPLETA ==========

  function updateView() {
    const listaFiltrada = applyFilters(estado.base, estado.filtros);
    const listaOrdenada = sortProducts(listaFiltrada, estado.orden);

    renderGrid(listaOrdenada);

    document.getElementById('resultado-conteo').textContent =
      `${listaOrdenada.length} resultado${listaOrdenada.length !== 1 ? 's' : ''}`;

    // Calcular total de inventario solo en consola
    const total = calcularTotalInventarioActivos(estado.base);
    console.log("Total inventario (activos): $" + total.toFixed(2));
  }

  // ========== BIND EVENTOS ==========

  function bindEvents() {
    // Ordenar
    document.getElementById('ordenar-select').addEventListener('change', (e) => {
      estado.orden = e.target.value;
      updateView();
    });

    // Filtros (delegación)
    document.getElementById('sidebar-filtros').addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const valor = e.target.value;
        const name = e.target.name;

        if (name === 'cat[]') {
          if (e.target.checked) {
            estado.filtros.categorias.add(valor);
          } else {
            estado.filtros.categorias.delete(valor);
          }
        } else if (name === 'mat[]') {
          if (e.target.checked) {
            estado.filtros.materiales.add(valor);
          } else {
            estado.filtros.materiales.delete(valor);
          }
        }

        updateView();
      }
    });

    // Limpiar filtros
    document.getElementById('btn-limpiar-filtros').addEventListener('click', () => {
      estado.filtros.categorias.clear();
      estado.filtros.materiales.clear();
      estado.orden = 'recomendado';

      document.getElementById('ordenar-select').value = 'recomendado';

      document.querySelectorAll('#sidebar-filtros input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
      });

      updateView();
    });
  }

  // ========== INICIALIZACIÓN ==========

  renderLayout();
  renderFilters(buildFacets(estado.base));
  updateView();
  bindEvents();
});
