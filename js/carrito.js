function mostrarCarrito() {
  const contenedor = document.getElementById("contenedor-carrito");
  contenedor.innerHTML = "";

  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center">
        <h3>No hay productos en el carrito.</h3>
        <a href="productos.html" class="btn boton-personalizado mt-3">Ir a Productos</a>
      </div>
    `;
    return;
  }

  let subtotal = 0;
  const row = document.createElement("div");
  row.className = "row g-4";

  // Columna izquierda - productos
  const colIzq = document.createElement("div");
  colIzq.className = "col-12 col-lg-7";
  colIzq.innerHTML = `<h3 class="mb-4">Artículos Seleccionados</h3>`;

  carrito.forEach(p => {
    subtotal += p.precio * p.cantidad;
    colIzq.innerHTML += `
      <div class="card mb-3 shadow-sm border-0">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col-3 col-md-2 text-center">
              <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid rounded">
            </div>
            <div class="col-5 col-md-6">
              <h5 class="card-title mb-1 fs-6">${p.nombre}</h5>
              <p class="text-muted mb-0 fw-bold">$${p.precio.toFixed(2)}</p>
            </div>
            <div class="col-4 col-md-4">
              <div class="input-group input-group-sm">
                <button class="btn btn-outline-secondary" onclick="actualizarCantidad('${p.nombre}', -1)">−</button>
                <input type="text" class="form-control text-center" value="${p.cantidad}" readonly>
                <button class="btn btn-outline-secondary" onclick="actualizarCantidad('${p.nombre}', 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  });

  // Totales
  const iva = subtotal * 0.15;
  const envio = 10.00;
  const total = subtotal + iva + envio;

  const colDer = document.createElement("div");
  colDer.className = "col-12 col-lg-5";
  colDer.innerHTML = `
    <h3 class="mb-4">Resumen del Pedido</h3>
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between mb-3">
          <span>Subtotal</span><span class="fw-bold">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <span>IVA (15%)</span><span class="fw-bold">$${iva.toFixed(2)}</span>
        </div>
        <div class="d-flex justify-content-between mb-3 pb-3 border-bottom">
          <span>Envío Estimado</span><span class="fw-bold">$${envio.toFixed(2)}</span>
        </div>
        <div class="d-flex justify-content-between mb-4">
          <span class="h5 mb-0">Total</span><span class="h5 mb-0 fw-bold">$${total.toFixed(2)}</span>
        </div>
        <div class="d-grid gap-2">
          <a href="pago.html" class="btn boton-personalizado btn-lg w-100">Finalizar Compra</a>
          <a href="productos.html" class="btn btn-outline-secondary">Seguir Comprando</a>
        </div>
      </div>
    </div>
  `;

  row.appendChild(colIzq);
  row.appendChild(colDer);
  contenedor.appendChild(row);
}

function actualizarCantidad(nombre, cambio) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const producto = carrito.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad += cambio;
    if (producto.cantidad <= 0) carrito = carrito.filter(p => p.nombre !== nombre);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Iniciar
mostrarCarrito();
