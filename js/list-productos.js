// Repositorio de productos - Solo almacenamiento y API con jQuery
// No contiene lógica de UI ni manipulación del DOM

window.ProductRepo = (function() {

  const STORAGE_KEY = 'be_productos_v1';
  const seedData = [
    {
      id: "p1",
      nombre: 'Anillo "Eternidad Solitaria"',
      descripcion: "Compromiso clásico. Diamante de corte brillante.",
      img: "img/producto1.jpg",
      precio: 120.00,
      stock: 5,
      estado: true,
      categoria: "Anillo",
      material: "Oro blanco",
      subtitulo: 'Un diseño sobrio y moderno con un diamante de corte brillante en montura solitaria.',
      imagenes: ['producto1.jpg', 'producto1.2.jpg', 'producto1.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Aleación de platino 950 o acero quirúrgico pulido espejo, resistente al desgaste y la oxidación.',
        '<strong>Piedra principal:</strong> Zirconia cúbica premium de 1 quilate (simula un diamante con gran brillo y pureza).',
        '<strong>Montura:</strong> Estilo solitario de cuatro garras finas, que permite máxima entrada de luz para realzar el destello.',
        '<strong>Acabado:</strong> Pulido de alto brillo con textura suave al tacto, libre de níquel e hipoalergénico.'
      ],
      descripcionDetallada: `
        El <em>“Eternidad Solitaria”</em> representa la esencia del amor atemporal en su forma más pura.
        Su diseño minimalista resalta la belleza de la piedra central, evocando pureza y compromiso sin exceso.
        Fabricado con materiales duraderos y de alta calidad, es ideal tanto para uso diario como para ocasiones especiales.
        Su brillo limpio y su perfil elegante lo convierten en un clásico moderno dentro de la joyería contemporánea.
      `
    },
    {
      id: "p2",
      nombre: 'Colgante "Aura de Esmeralda"',
      descripcion: "Vibrante esmeralda central y sofisticación.",
      img: "img/producto2.jpg",
      precio: 150.00,
      stock: 7,
      estado: true,
      categoria: "Collar",
      material: "Oro blanco",
      subtitulo: 'Lujo atemporal. Una esmeralda central rodeada de destellos de luz pura.',
      imagenes: ['producto2.jpg', 'producto2.2.jpg', 'producto2.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Plata esterlina 925 de alta pureza, con acabado de brillo espejo y tratamiento antidesgaste.',
        '<strong>Piedra central:</strong> Esmeralda sintética tallada en forma cushion (cojín), con un tono verde intenso y reflejos naturales.',
        '<strong>Piedras secundarias:</strong> Zirconias cúbicas transparentes engastadas alrededor del marco, imitando el brillo del diamante.',
        '<strong>Cadena:</strong> Tipo cable fina de 45 cm, resistente y con cierre de anillo seguro.',
        '<strong>Acabado:</strong> Baño de rodio que protege contra la oxidación y realza el brillo plateado.'
      ],
      descripcionDetallada: `
        El <em>“Aura de Esmeralda”</em> combina la elegancia clásica con un toque moderno.
        Su piedra central de verde vibrante simboliza la esperanza, la armonía y la renovación,
        mientras el halo de gemas transparentes amplifica su luminosidad natural.
        Cada detalle ha sido cuidadosamente trabajado para ofrecer una pieza equilibrada,
        ligera y cómoda de usar, perfecta para realzar cualquier atuendo con un toque de distinción y encanto.
      `
    },
    {
      id: "p3",
      nombre: 'Brazalete "Luz Constelación"',
      descripcion: "Fila de diamantes sutilmente brillantes.",
      img: "img/producto3.jpg",
      precio: 180.00,
      stock: 8,
      estado: true,
      categoria: "Pulsera",
      material: "Plata",
      subtitulo: 'Elegancia versátil. Una línea de destellos que envuelve la muñeca con luz y sofisticación.',
      imagenes: ['producto3.jpg', 'producto3.2.jpg', 'producto3.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Plata esterlina 925 bañada en rodio, que garantiza brillo intenso y resistencia al desgaste.',
        '<strong>Piedras:</strong> Zirconias cúbicas transparentes de 3 mm cada una, engastadas con precisión en montura de cuatro garras.',
        '<strong>Diseño:</strong> Estilo <em>tennis bracelet</em>, articulado para ofrecer flexibilidad y comodidad al movimiento.',
        '<strong>Cierre:</strong> Tipo caja con doble seguridad invisible, discreto y elegante.',
        '<strong>Acabado:</strong> Pulido de alto brillo, libre de níquel e hipoalergénico.'
      ],
      descripcionDetallada: `
        El <em>“Luz Constelación”</em> es una joya que captura la esencia de la elegancia atemporal.
        Cada piedra ha sido cuidadosamente seleccionada para reflejar la luz de manera uniforme,
        evocando una constelación que brilla sobre la piel. Su diseño clásico y adaptable lo convierte en el complemento ideal
        para atuendos formales o casuales, aportando un toque de distinción sin exceso.
        Ligero, cómodo y refinado, este brazalete representa la unión perfecta entre artesanía y belleza.
      `
    },
    {
      id: "p4",
      nombre: 'Pendientes "Perla Serena"',
      descripcion: "Perlas cultivadas con lustre perfecto.",
      img: "img/producto4.jpg",
      precio: 210.00,
      stock: 12,
      estado: true,
      categoria: "Aretes",
      material: "Plata",
      subtitulo: 'Gracia natural. Perlas cultivadas con brillo sedoso y elegancia eterna.',
      imagenes: ['producto4.jpg', 'producto4.2.jpg', 'producto4.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Plata esterlina 925 o platino, ambos hipoalergénicos y resistentes a la oxidación.',
        '<strong>Piedra principal:</strong> Perlas cultivadas de agua dulce, diámetro de 8 mm, seleccionadas por su forma redonda y lustre natural.',
        '<strong>Montura:</strong> Sistema de cuatro garras discretas que asegura la perla sin afectar su superficie.',
        '<strong>Cierre:</strong> Tipo mariposa clásico, cómodo y seguro para uso prolongado.',
        '<strong>Acabado:</strong> Pulido espejo que resalta el contraste entre el brillo metálico y la suavidad nacarada.'
      ],
      descripcionDetallada: `
        Los pendientes <em>“Perla Serena”</em> representan la pureza y la armonía en su máxima expresión.
        Cada perla ha sido cuidadosamente seleccionada por su tono uniforme, superficie lisa y brillo natural.
        Su diseño minimalista permite que la belleza de la perla sea la protagonista, mientras la montura metálica aporta soporte y un toque moderno.
        Son ideales para ocasiones formales, pero también complementan con sutileza un look cotidiano lleno de refinamiento.
      `
    },
    {
      id: "p5",
      nombre: 'Reloj "Tempo Rosado"',
      descripcion: "Oro rosa, nácar iridiscente y diseño impecable.",
      img: "img/producto5.jpg",
      precio: 240.00,
      stock: 6,
      estado: true,
      categoria: "Reloj",
      material: "Oro rosa",
      subtitulo: 'Fusión de estilo. Elegancia en oro rosa y la serenidad del nácar iridiscente.',
      imagenes: ['producto5.jpg', 'producto5.2.jpg', 'producto5.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Acero inoxidable con baño de oro rosa, resistente a la corrosión y con acabado pulido espejo.',
        '<strong>Esfera:</strong> Nácar natural iridiscente, con índices brillantes engastados en cristal transparente.',
        '<strong>Bisel:</strong> Aro con incrustaciones de zirconias cúbicas que aportan destellos sutiles y reflejos de luz.',
        '<strong>Mecanismo:</strong> Movimiento de cuarzo japonés de alta precisión con batería de larga duración.',
        '<strong>Correa:</strong> Eslabones sólidos con cierre mariposa oculto, cómodo y seguro.'
      ],
      descripcionDetallada: `
        El reloj <em>“Tempo Rosado”</em> combina la delicadeza del diseño femenino con la sofisticación de la relojería moderna.
        Su tono cálido de oro rosa contrasta armónicamente con el brillo perlado del nácar, evocando elegancia y serenidad.
        Cada detalle, desde las incrustaciones del bisel hasta el suave brillo metálico, refleja un equilibrio entre lujo y sutileza.
        Ideal para quienes buscan un accesorio funcional que a la vez proyecte distinción y estilo atemporal.
      `
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
