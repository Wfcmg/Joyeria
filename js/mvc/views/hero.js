window.HeroView = {
  render: function () {
    return `
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
    `;
  }
};
