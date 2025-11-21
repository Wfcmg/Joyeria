window.DestacadosController = {
  render: function (targetId) {

    // 1. Renderizar el HTML base (título + contenedor vacío)
    document.getElementById(targetId).innerHTML = DestacadosView.render();

    // 2. Obtener productos del repo
    const todos = ProductRepo.getAll();

    // 3. Filtrar destacados
    const destacados = todos.filter(p => p.destacado === true);

    // 4. Contenedor donde van las cards
    const contenedor = document.getElementById("destacados-container");

    // 5. Insertar cada card
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

  }
};
