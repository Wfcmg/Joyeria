// Utilidades para productos - Funciones auxiliares reutilizables

window.ProductUtils = (function() {

  // Construir facetas de categorías y materiales únicos
  function buildFacets(productos) {
    const categorias = new Set();
    const materiales = new Set();

    $.each(productos, function(index, p) {
      if (p.categoria) categorias.add(p.categoria);
      if (p.material) materiales.add(p.material);
    });

    return { categorias, materiales };
  }

  // Ordenar lista según criterio con jQuery
  function sortProducts(lista, criterio) {
    const copia = $.extend(true, [], lista);

    if (criterio === 'precio_asc') {
      copia.sort(function(a, b) {
        return a.precio - b.precio;
      });
    } else if (criterio === 'precio_desc') {
      copia.sort(function(a, b) {
        return b.precio - a.precio;
      });
    }

    return copia;
  }

  // Aplicar filtros de categoría y material con jQuery
  function applyFilters(lista, filtros) {
    return $.grep(lista, function(p) {
      const okCat = filtros.categorias.size === 0 || filtros.categorias.has(p.categoria);
      const okMat = filtros.materiales.size === 0 || filtros.materiales.has(p.material);
      return okCat && okMat;
    });
  }

  // Formatear cantidad a dólares USD
  function formatUSD(n) {
    return new Intl.NumberFormat('es-EC', {
      style: 'currency',
      currency: 'USD'
    }).format(n);
  }

  // Calcular total del inventario de productos activos
  function calcularTotalInventarioActivos(lista) {
    let total = 0;

    $.each(lista, function(index, p) {
      if (p.estado) {
        total += p.precio * p.stock;
      }
    });

    return total;
  }

  // API pública
  return {
    buildFacets: buildFacets,
    sortProducts: sortProducts,
    applyFilters: applyFilters,
    formatUSD: formatUSD,
    calcularTotalInventarioActivos: calcularTotalInventarioActivos
  };

})();
