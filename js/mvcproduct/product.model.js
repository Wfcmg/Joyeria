// Modelo de productos - Manejo de estado y datos

window.ProductModel = (function() {

  let repo = window.ProductRepo;

  let state = {
    orden: 'recomendado',
    filtros: {
      categorias: new Set(),
      materiales: new Set()
    }
  };

  // Inicializar con repositorio personalizado si se necesita
  function init(customRepo) {
    if (customRepo) {
      repo = customRepo;
    }
    resetState();
  }

  // Resetear estado a valores iniciales
  function resetState() {
    state.orden = 'recomendado';
    state.filtros.categorias.clear();
    state.filtros.materiales.clear();
  }

  // Obtener productos base desde el repositorio
  function getProductosBase() {
    return repo.getAll();
  }

  // Obtener facetas para construir filtros
  function getFacets() {
    const base = getProductosBase();
    return window.ProductUtils.buildFacets(base);
  }

  // Configurar criterio de ordenamiento
  function setOrden(orden) {
    state.orden = orden || 'recomendado';
  }

  // Obtener criterio de ordenamiento actual
  function getOrden() {
    return state.orden;
  }

  // Activar o desactivar filtro de categoría
  function toggleCategoria(nombre, activo) {
    if (!nombre) return;

    if (activo) {
      state.filtros.categorias.add(nombre);
    } else {
      state.filtros.categorias.delete(nombre);
    }
  }

  // Activar o desactivar filtro de material
  function toggleMaterial(nombre, activo) {
    if (!nombre) return;

    if (activo) {
      state.filtros.materiales.add(nombre);
    } else {
      state.filtros.materiales.delete(nombre);
    }
  }

  // Limpiar todos los filtros y resetear orden
  function clearFiltros() {
    state.filtros.categorias.clear();
    state.filtros.materiales.clear();
    state.orden = 'recomendado';
  }

  // Obtener filtros activos actuales
  function getFiltros() {
    return {
      categorias: new Set(state.filtros.categorias),
      materiales: new Set(state.filtros.materiales)
    };
  }

  // Obtener datos procesados listos para la vista
  function getViewData() {
    const base = getProductosBase();
    const filtrada = window.ProductUtils.applyFilters(base, state.filtros);
    const ordenada = window.ProductUtils.sortProducts(filtrada, state.orden);
    const totalInventario = window.ProductUtils.calcularTotalInventarioActivos(base);

    return {
      productos: ordenada,
      totalInventario: totalInventario,
      count: ordenada.length
    };
  }

  // API pública
  return {
    init: init,
    getProductosBase: getProductosBase,
    getFacets: getFacets,
    setOrden: setOrden,
    getOrden: getOrden,
    toggleCategoria: toggleCategoria,
    toggleMaterial: toggleMaterial,
    clearFiltros: clearFiltros,
    getFiltros: getFiltros,
    getViewData: getViewData
  };

})();
