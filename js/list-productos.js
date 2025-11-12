// Repositorio de productos - Solo almacenamiento y API con jQuery
// No contiene lógica de UI ni manipulación del DOM

window.ProductRepo = (function() {

  const STORAGE_KEY = 'be_productos_v1';

  // Semilla inicial de productos
  const seedData = [
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

  // Storage interno
  let productos = [];

  // Verificar si localStorage está disponible
  function isLocalStorageAvailable() {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
  }

  // Cargar desde localStorage
  function loadFromStorage() {
    if (!isLocalStorageAvailable()) {
      return null;
    }

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch(e) {
      console.error('Error al cargar productos desde localStorage:', e);
      return null;
    }
  }

  // Guardar en localStorage
  function saveToStorage() {
    if (!isLocalStorageAvailable()) {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productos));
    } catch(e) {
      console.error('Error al guardar productos en localStorage:', e);
    }
  }

  // Validar campos obligatorios de un producto con jQuery
  function validateProduct(producto) {
    const required = ['id', 'nombre', 'precio', 'stock', 'categoria', 'material'];
    let error = null;

    $.each(required, function(index, field) {
      if (producto[field] === undefined || producto[field] === null || producto[field] === '') {
        error = 'Campo obligatorio faltante: ' + field;
        return false;
      }
    });

    if (error) {
      return { ok: false, error: error };
    }

    if ($.type(producto.precio) !== 'number' || producto.precio < 0) {
      return { ok: false, error: 'El precio debe ser un número positivo' };
    }

    if ($.type(producto.stock) !== 'number' || producto.stock < 0) {
      return { ok: false, error: 'El stock debe ser un número positivo' };
    }

    const categoriasValidas = ['Anillo', 'Collar', 'Pulsera', 'Aretes', 'Reloj'];
    if ($.inArray(producto.categoria, categoriasValidas) === -1) {
      return { ok: false, error: 'Categoría inválida. Debe ser una de: ' + categoriasValidas.join(', ') };
    }

    const materialesValidos = ['Oro amarillo', 'Oro blanco', 'Oro rosa', 'Plata', 'Acero', 'Platino'];
    if ($.inArray(producto.material, materialesValidos) === -1) {
      return { ok: false, error: 'Material inválido. Debe ser uno de: ' + materialesValidos.join(', ') };
    }

    return { ok: true };
  }

  // Clonar profundo con jQuery
  function deepClone(arr) {
    return $.extend(true, [], arr);
  }

  // Inicializar repositorio
  function init() {
    const stored = loadFromStorage();

    if (stored && $.isArray(stored) && stored.length > 0) {
      productos = stored;
    } else {
      productos = deepClone(seedData);
      saveToStorage();
    }
  }

  // Inicializar al cargar el módulo
  init();

  // API pública
  return {

    // Obtener todos los productos
    getAll: function() {
      return deepClone(productos);
    },

    // Obtener producto por ID con jQuery
    getById: function(id) {
      let resultado = null;

      $.each(productos, function(index, p) {
        if (p.id === id) {
          resultado = p;
          return false;
        }
      });

      return resultado ? deepClone([resultado])[0] : null;
    },

    // Agregar nuevo producto con jQuery
    add: function(producto) {
      const validation = validateProduct(producto);
      if (!validation.ok) {
        return validation;
      }

      let existe = false;
      $.each(productos, function(index, p) {
        if (p.id === producto.id) {
          existe = true;
          return false;
        }
      });

      if (existe) {
        return { ok: false, error: 'Ya existe un producto con el ID: ' + producto.id };
      }

      productos.push($.extend(true, {}, producto));
      saveToStorage();

      return { ok: true };
    },

    // Actualizar producto existente con jQuery
    update: function(id, patch) {
      let index = -1;

      $.each(productos, function(i, p) {
        if (p.id === id) {
          index = i;
          return false;
        }
      });

      if (index === -1) {
        return { ok: false, error: 'No se encontró producto con ID: ' + id };
      }

      const updated = $.extend(true, {}, productos[index], patch);

      const validation = validateProduct(updated);
      if (!validation.ok) {
        return validation;
      }

      productos[index] = updated;
      saveToStorage();

      return { ok: true };
    },

    // Eliminar producto con jQuery
    remove: function(id) {
      let index = -1;

      $.each(productos, function(i, p) {
        if (p.id === id) {
          index = i;
          return false;
        }
      });

      if (index === -1) {
        return { ok: false, error: 'No se encontró producto con ID: ' + id };
      }

      productos.splice(index, 1);
      saveToStorage();

      return { ok: true };
    },

    // Resetear repositorio con nueva semilla
    reset: function(seedArray) {
      if (!$.isArray(seedArray)) {
        productos = deepClone(seedData);
      } else {
        productos = deepClone(seedArray);
      }

      saveToStorage();
      return { ok: true };
    }

  };

})();
