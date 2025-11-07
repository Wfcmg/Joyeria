// Función principal que muestra los productos guardados en el carrito
function mostrarCarrito() {
  // Se obtiene el contenedor donde se mostrará el carrito en el HTML
  const contenedor = document.getElementById("contenedor-carrito");
  contenedor.innerHTML = ""; // Limpia el contenido anterior

  // Se recuperan los productos guardados en el localStorage y se convierten de texto a objeto
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Si el carrito está vacío, muestra un mensaje y un botón para ir a productos
  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <div class="text-center">
        <h3>No hay productos en el carrito.</h3>
        <a href="productos.html" class="btn boton-personalizado mt-3">Ir a Productos</a>
      </div>
    `;
    return; // Sale de la función para no seguir ejecutando
  }

  // Variables para calcular totales
  let subtotal = 0;
  const row = document.createElement("div"); // Crea un contenedor de filas
  row.className = "row g-4"; // Clases Bootstrap para espaciado entre columnas

  // ----- Columna Izquierda: Lista de productos -----
  const colIzq = document.createElement("div");
  colIzq.className = "col-12 col-lg-7"; // Ocupa todo el ancho en móvil y 7/12 en escritorio
  colIzq.innerHTML = `<h3 class="mb-4">Artículos Seleccionados</h3>`;

  // Recorre cada producto del carrito para mostrarlo
  carrito.forEach(p => {
    subtotal += p.precio * p.cantidad; // Suma al subtotal

    // Agrega una tarjeta por cada producto con su imagen, nombre, precio y botones de cantidad
    colIzq.innerHTML += `
      <div class="card mb-3 shadow-sm border-0">
        <div class="card-body">
          <div class="row align-items-center">
            <!-- Imagen del producto -->
            <div class="col-3 col-md-2 text-center">
              <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid rounded">
            </div>
            <!-- Información del producto -->
            <div class="col-5 col-md-6">
              <h5 class="card-title mb-1 fs-6">${p.nombre}</h5>
              <p class="text-muted mb-0 fw-bold">$${p.precio.toFixed(2)}</p>
            </div>
            <!-- Control de cantidad -->
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

  // ----- Cálculo de totales -----
  const iva = subtotal * 0.15; // IVA del 15%
  const envio = 10.00; // Costo fijo de envío
  const total = subtotal + iva + envio; // Total general

  // ----- Columna Derecha: Resumen del pedido -----
  const colDer = document.createElement("div");
  colDer.className = "col-12 col-lg-5"; // Ocupa 5/12 en pantallas grandes
  colDer.innerHTML = `
    <h3 class="mb-4">Resumen del Pedido</h3>
    <div class="card shadow-sm border-0">
      <div class="card-body p-4">
        <!-- Subtotal -->
        <div class="d-flex justify-content-between mb-3">
          <span>Subtotal</span><span class="fw-bold">$${subtotal.toFixed(2)}</span>
        </div>
        <!-- IVA -->
        <div class="d-flex justify-content-between mb-3">
          <span>IVA (15%)</span><span class="fw-bold">$${iva.toFixed(2)}</span>
        </div>
        <!-- Envío -->
        <div class="d-flex justify-content-between mb-3 pb-3 border-bottom">
          <span>Envío Estimado</span><span class="fw-bold">$${envio.toFixed(2)}</span>
        </div>
        <!-- Total -->
        <div class="d-flex justify-content-between mb-4">
          <span class="h5 mb-0">Total</span><span class="h5 mb-0 fw-bold">$${total.toFixed(2)}</span>
        </div>
        <!-- Botones de acción -->
        <div class="d-grid gap-2">
          <a href="pago.html" class="btn boton-personalizado btn-lg w-100">Finalizar Compra</a>
          <a href="productos.html" class="btn btn-outline-secondary">Seguir Comprando</a>
        </div>
      </div>
    </div>
  `;

  // Agrega las dos columnas (izquierda y derecha) a la fila
  row.appendChild(colIzq);
  row.appendChild(colDer);

  // Inserta todo el contenido en el contenedor principal del HTML
  contenedor.appendChild(row);
}

// ----------------------------------------------------------
// Función que actualiza la cantidad de un producto en el carrito
function actualizarCantidad(nombre, cambio) {
  // Obtiene el carrito guardado o un arreglo vacío si no existe
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

  // Busca el producto por su nombre
  const producto = carrito.find(p => p.nombre === nombre);

  // Si existe, cambia su cantidad
  if (producto) {
    producto.cantidad += cambio; // Suma o resta según el botón
    // Si la cantidad baja de 1, elimina el producto del carrito
    if (producto.cantidad <= 0) carrito = carrito.filter(p => p.nombre !== nombre);
  }

  // Guarda el nuevo estado del carrito en el localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));

  // Vuelve a mostrar el carrito actualizado
  mostrarCarrito();
}

// ----------------------------------------------------------
// Inicia el proceso mostrando el carrito cuando se carga la página
mostrarCarrito();
