// Esperar a que el DOM exista
document.addEventListener("DOMContentLoaded", () => {
  // 1) Datos (5 productos). Ajusta rutas de imágenes según tu carpeta /img
  const productos = [
    {
      id: "p1",
      nombre: 'Anillo "Eternidad Solitaria"',
      descripcion: "Compromiso clásico. Diamante de corte brillante.",
      img: "img/producto1.jpg",
      precio: 1299.99,
      stock: 5,
      estado: true
    },
    {
      id: "p2",
      nombre: 'Colgante "Aura de Esmeralda"',
      descripcion: "Vibrante esmeralda central y sofisticación.",
      img: "img/producto2.jpg",
      precio: 999.99,
      stock: 7,
      estado: true
    },
    {
      id: "p3",
      nombre: 'Brazalete "Luz Constelación"',
      descripcion: "Fila de diamantes sutilmente brillantes.",
      img: "img/producto3.jpg",
      precio: 849.99,
      stock: 8,
      estado: true
    },
    {
      id: "p4",
      nombre: 'Pendientes "Perla Serena"',
      descripcion: "Perlas cultivadas con lustre perfecto.",
      img: "img/producto4.jpg",
      precio: 459.99,
      stock: 12,
      estado: true
    },
    {
      id: "p5",
      nombre: 'Reloj "Tempo Rosado"',
      descripcion: "Oro rosa, nácar iridiscente y diseño impecable.",
      img: "img/producto5.jpg",
      precio: 699.99,
      stock: 6,
      estado: true
    }
  ];

  // 2) Render base: navbar + encabezado + contenedor de grid + footer
  const app = document.getElementById("app");
  app.innerHTML = `
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light custom-navbar shadow-sm">
      <div class="container">
        <a class="navbar-brand fw-bold tittle-navbar" href="index.html">Brillo Eterno</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link active" href="productos.html">Productos</a></li>
            <li class="nav-item"><a class="btn btn-contacto ms-2" href="contacto.html">Contacto</a></li>
            <li class="nav-item"><a class="btn btn-contacto ms-2" href="carrito.html">Carrito</a></li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- ENCABEZADO -->
    <section class="text-center py-5">
      <h1 class="titulo-productos">Nuestra Colección</h1>
      <p class="subtitulo-productos">Joyas diseñadas con elegancia y perfección</p>
    </section>

    <!-- GALERÍA -->
    <section class="container productos mb-5">
      <div class="row g-4" id="grid-productos"></div>
      <div class="text-end mt-3">
        <strong id="total-inventario" class="text-muted"></strong>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer text-center py-3">
      <p>2025 Brillo Eterno. Todos los derechos reservados.</p>
    </footer>
  `;

  // 3) Render de tarjetas desde JS
  const grid = document.getElementById("grid-productos");

  const renderProductoCard = (p) => `
    <div class="col-md-4 col-lg-3">
      <div class="card producto-card shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.nombre}">
        <div class="card-body text-center">
          <h5 class="card-title">${p.nombre}</h5>
          <p class="card-text">${p.descripcion}</p>
          <a class="btn boton-personalizado" href="detalle.html#${p.id}">Ver detalle</a>
        </div>
      </div>
    </div>
  `;

  grid.innerHTML = productos.map(renderProductoCard).join("");

  // 4) Cálculo de total (ejemplo de lógica pedida en clase)
  const calcularTotalInventarioActivos = (lista) =>
    lista.filter(p => p.estado).reduce((acc, p) => acc + p.precio * p.stock, 0);

  const total = calcularTotalInventarioActivos(productos);
  // Lo mostramos en pantalla y también en consola
  const totalEl = document.getElementById("total-inventario");
  totalEl.textContent = `Total inventario (activos): $${total.toFixed(2)}`;
  console.log("Total inventario (activos): $" + total.toFixed(2));
});
