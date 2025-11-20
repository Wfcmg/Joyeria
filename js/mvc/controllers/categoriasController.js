window.CategoriasController = {
  render: function (targetId) {

    // 1. Pintar estructura base
    document.getElementById(targetId).innerHTML = CategoriasView.render();

    // 2. Lista de categorías
    const categorias = [
      { nombre: "Anillos",  img: "img/anillo_oro.jpg" },
      { nombre: "Collares", img: "img/collar_plata.jpg" },
      { nombre: "Pulseras", img: "img/acero.jpg" },
      { nombre: "Aretes",   img: "img/producto4.jpg" },
      { nombre: "Relojes",  img: "img/producto5.jpg" }
    ];

    // 3. Contenedor
    const container = document.getElementById("categorias-container");

    // 4. Renderizar cards
    categorias.forEach(cat => {
      container.innerHTML += `
        <div class="col-6 col-md-4 col-lg-2 mx-auto">
          <div class="card border-0 shadow-sm categoria-card">

            <div class="categoria-img"
                 style="background-image:url('${cat.img}');"></div>

            <div class="card-body text-center">
              <h5 class="fw-semibold" style="color:#5A4B40;">${cat.nombre}</h5>
            </div>

          </div>
        </div>
      `;
    });
  }
};
