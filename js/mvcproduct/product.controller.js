// Controlador de productos - Coordina Modelo y Vista

window.ProductController = (function() {

  let model;
  let view;

  // Inicializar el controlador
  function init() {
    model = window.ProductModel;
    view = window.ProductView;

    view.init();
    view.renderLayout();

    const facets = model.getFacets();
    view.renderFilters(facets);

    bindEvents();
    update();
  }

  // Enlazar eventos del DOM
  function bindEvents() {

    // Evento: cambio de ordenamiento
    $('#ordenar-select').on('change', function() {
      const orden = $(this).val();
      model.setOrden(orden);
      update();
    });

    // Evento: cambio en checkboxes de filtros con delegación
    $('#sidebar-filtros').on('change', 'input[type="checkbox"]', function() {
      const $checkbox = $(this);
      const valor = $checkbox.val();
      const name = $checkbox.attr('name');
      const checked = $checkbox.is(':checked');

      if (name === 'cat[]') {
        model.toggleCategoria(valor, checked);
      } else if (name === 'mat[]') {
        model.toggleMaterial(valor, checked);
      }

      update();
    });

    // Evento: limpiar filtros
    $('#btn-limpiar-filtros').on('click', function() {
      model.clearFiltros();

      view.updateOrdenSelect('recomendado');
      view.clearFilterCheckboxes();

      update();
    });
  }

  // Actualizar la vista con los datos del modelo
  function update() {
    const viewData = model.getViewData();

    view.renderGrid(viewData.productos);
    view.updateCounter(viewData.count);

    console.log('Total inventario (activos): $' + viewData.totalInventario.toFixed(2));
  }

  // Refrescar datos desde el repositorio
  function refresh() {
    model.clearFiltros();
    view.updateOrdenSelect('recomendado');
    view.clearFilterCheckboxes();

    const facets = model.getFacets();
    view.renderFilters(facets);

    update();
  }

  // API pública
  return {
    init: init,
    update: update,
    refresh: refresh
  };

})();
