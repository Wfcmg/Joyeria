// cuando la estructura html este lista o sea el detalle.html va el js donde buscamos el contenedor principal
// y construimos dinámicamente el detalle de cada producto dentro de la página
document.addEventListener('DOMContentLoaded', function () {
  const root = document.getElementById('detalle-root');
  if (!root) return;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Catálogo interno de productos aquí va toda la información de cada joya
  // (id, número, título, subtítulo, precio, imágenes, materiales y descripción).
  // Si queremos cambiar textos, nombres o precios, so si tnemos que cambiar algo solo se hace aqui
  const productos = [
    {
      id: 'p1',
      numero: 1,
      titulo: 'Anillo "Eternidad Solitaria"',
      subtitulo: 'Un diseño sobrio y moderno con un diamante de corte brillante en montura solitaria.',
      precio: '$120',
      imagenes: ['producto1.jpg', 'producto1.2.jpg', 'producto1.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Aleación de platino 950 o acero quirúrgico pulido espejo, resistente al desgaste y la oxidación.',
        '<strong>Piedra principal:</strong> Zirconia cúbica premium de 1 quilate (simula un diamante con gran brillo y pureza).',
        '<strong>Montura:</strong> Estilo solitario de cuatro garras finas, que permite máxima entrada de luz para realzar el destello.',
        '<strong>Acabado:</strong> Pulido de alto brillo con textura suave al tacto, libre de níquel e hipoalergénico.'
      ],
      descripcion: `
        El <em>“Eternidad Solitaria”</em> representa la esencia del amor atemporal en su forma más pura.
        Su diseño minimalista resalta la belleza de la piedra central, evocando pureza y compromiso sin exceso.
        Fabricado con materiales duraderos y de alta calidad, es ideal tanto para uso diario como para ocasiones especiales.
        Su brillo limpio y su perfil elegante lo convierten en un clásico moderno dentro de la joyería contemporánea.
      `
    },
    {
      id: 'p2',
      numero: 2,
      titulo: 'Colgante "Aura de Esmeralda"',
      subtitulo: 'Lujo atemporal. Una esmeralda central rodeada de destellos de luz pura.',
      precio: '$150',
      imagenes: ['producto2.jpg', 'producto2.2.jpg', 'producto2.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Plata esterlina 925 de alta pureza, con acabado de brillo espejo y tratamiento antidesgaste.',
        '<strong>Piedra central:</strong> Esmeralda sintética tallada en forma cushion (cojín), con un tono verde intenso y reflejos naturales.',
        '<strong>Piedras secundarias:</strong> Zirconias cúbicas transparentes engastadas alrededor del marco, imitando el brillo del diamante.',
        '<strong>Cadena:</strong> Tipo cable fina de 45 cm, resistente y con cierre de anillo seguro.',
        '<strong>Acabado:</strong> Baño de rodio que protege contra la oxidación y realza el brillo plateado.'
      ],
      descripcion: `
        El <em>“Aura de Esmeralda”</em> combina la elegancia clásica con un toque moderno.
        Su piedra central de verde vibrante simboliza la esperanza, la armonía y la renovación,
        mientras el halo de gemas transparentes amplifica su luminosidad natural.
        Cada detalle ha sido cuidadosamente trabajado para ofrecer una pieza equilibrada,
        ligera y cómoda de usar, perfecta para realzar cualquier atuendo con un toque de distinción y encanto.
      `
    },
    {
      id: 'p3',
      numero: 3,
      titulo: 'Brazalete "Luz Constelación"',
      subtitulo: 'Elegancia versátil. Una línea de destellos que envuelve la muñeca con luz y sofisticación.',
      precio: '$180',
      imagenes: ['producto3.jpg', 'producto3.2.jpg', 'producto3.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Plata esterlina 925 bañada en rodio, que garantiza brillo intenso y resistencia al desgaste.',
        '<strong>Piedras:</strong> Zirconias cúbicas transparentes de 3 mm cada una, engastadas con precisión en montura de cuatro garras.',
        '<strong>Diseño:</strong> Estilo <em>tennis bracelet</em>, articulado para ofrecer flexibilidad y comodidad al movimiento.',
        '<strong>Cierre:</strong> Tipo caja con doble seguridad invisible, discreto y elegante.',
        '<strong>Acabado:</strong> Pulido de alto brillo, libre de níquel e hipoalergénico.'
      ],
      descripcion: `
        El <em>“Luz Constelación”</em> es una joya que captura la esencia de la elegancia atemporal.
        Cada piedra ha sido cuidadosamente seleccionada para reflejar la luz de manera uniforme,
        evocando una constelación que brilla sobre la piel. Su diseño clásico y adaptable lo convierte en el complemento ideal
        para atuendos formales o casuales, aportando un toque de distinción sin exceso.
        Ligero, cómodo y refinado, este brazalete representa la unión perfecta entre artesanía y belleza.
      `
    },
    {
      id: 'p4',
      numero: 4,
      titulo: 'Pendientes "Perla Serena"',
      subtitulo: 'Gracia natural. Perlas cultivadas con brillo sedoso y elegancia eterna.',
      precio: '$210',
      imagenes: ['producto4.jpg', 'producto4.2.jpg', 'producto4.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Plata esterlina 925 o platino, ambos hipoalergénicos y resistentes a la oxidación.',
        '<strong>Piedra principal:</strong> Perlas cultivadas de agua dulce, diámetro de 8 mm, seleccionadas por su forma redonda y lustre natural.',
        '<strong>Montura:</strong> Sistema de cuatro garras discretas que asegura la perla sin afectar su superficie.',
        '<strong>Cierre:</strong> Tipo mariposa clásico, cómodo y seguro para uso prolongado.',
        '<strong>Acabado:</strong> Pulido espejo que resalta el contraste entre el brillo metálico y la suavidad nacarada.'
      ],
      descripcion: `
        Los pendientes <em>“Perla Serena”</em> representan la pureza y la armonía en su máxima expresión.
        Cada perla ha sido cuidadosamente seleccionada por su tono uniforme, superficie lisa y brillo natural.
        Su diseño minimalista permite que la belleza de la perla sea la protagonista, mientras la montura metálica aporta soporte y un toque moderno.
        Son ideales para ocasiones formales, pero también complementan con sutileza un look cotidiano lleno de refinamiento.
      `
    },
    {
      id: 'p5',
      numero: 5,
      titulo: 'Reloj "Tempo Rosado"',
      subtitulo: 'Fusión de estilo. Elegancia en oro rosa y la serenidad del nácar iridiscente.',
      precio: '$240',
      imagenes: ['producto5.jpg', 'producto5.2.jpg', 'producto5.3.jpg'],
      materiales: [
        '<strong>Metal:</strong> Acero inoxidable con baño de oro rosa, resistente a la corrosión y con acabado pulido espejo.',
        '<strong>Esfera:</strong> Nácar natural iridiscente, con índices brillantes engastados en cristal transparente.',
        '<strong>Bisel:</strong> Aro con incrustaciones de zirconias cúbicas que aportan destellos sutiles y reflejos de luz.',
        '<strong>Mecanismo:</strong> Movimiento de cuarzo japonés de alta precisión con batería de larga duración.',
        '<strong>Correa:</strong> Eslabones sólidos con cierre mariposa oculto, cómodo y seguro.'
      ],
      descripcion: `
        El reloj <em>“Tempo Rosado”</em> combina la delicadeza del diseño femenino con la sofisticación de la relojería moderna.
        Su tono cálido de oro rosa contrasta armónicamente con el brillo perlado del nácar, evocando elegancia y serenidad.
        Cada detalle, desde las incrustaciones del bisel hasta el suave brillo metálico, refleja un equilibrio entre lujo y sutileza.
        Ideal para quienes buscan un accesorio funcional que a la vez proyecte distinción y estilo atemporal.
      `
    }
  ];
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Recorremos cada producto del catálogo y generamos su sección de detalle en HTML
  // para insertarla dentro del contenedor principal (root)
  productos.forEach(function (prod) {
    const section = document.createElement('section');
    section.id = prod.id;
    section.className = 'detail section--neutral';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Armamos el bloque de imágenes grandes del producto
    // Cada imagen tendrá un id único para poder activarla y relacionarla con su miniatura
    let imgsHTML = '';
    prod.imagenes.forEach(function (nombreArchivo, index) {
      const imgId = 'img' + prod.numero + '-' + (index + 1);
      imgsHTML += `
        <img id="${imgId}"
             src="img/${nombreArchivo}"
             class="detail-main"
             alt="Producto ${prod.numero} vista ${index + 1}">
      `;
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Creamos las miniaturas (thumbnails) que se mostrarán debajo de la imagen principal
    // Cada miniatura está vinculada a una imagen grande del mismo producto
    let thumbsHTML = '';
    prod.imagenes.forEach(function (nombreArchivo, index) {
      const imgId = 'img' + prod.numero + '-' + (index + 1);
      thumbsHTML += `
        <a class="thumb" href="#${imgId}">
          <img src="img/${nombreArchivo}" alt="">
        </a>
      `;
    });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Transformamos el arreglo de materiales del producto en una lista <li> para mostrarlo ordenado
    // dentro de un <ul> en la sección de detalles
    const materialesHTML = prod.materiales
      .map((m) => `<li>${m}</li>`)
      .join('');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Definimos toda la estructura visual de la sección de detalle:
    // columna izquierda (galería de imágenes) y columna derecha (título, descripción, materiales, precio y botón).
    section.innerHTML = `
      <div class="container-detalle">
        <div class="left">
          <div class="viewer">
            ${imgsHTML}
          </div>
          <div class="thumbs">
            ${thumbsHTML}
          </div>
        </div>
        <div class="right">
          <h1 class="tittle-navbar">${prod.titulo}</h1>
          <p class="subtitle">${prod.subtitulo}</p>

          <h3 class="mt-4">Materiales</h3>
          <ul class="materiales">
            ${materialesHTML}
          </ul>
          <h3 class="mt-4">Descripción</h3>
          <p>
            ${prod.descripcion}
          </p>
          <div class="price mt-3">${prod.precio}</div>
          <button class="btn boton-personalizado mt-2">Añadir al carrito</button>
        </div>
      </div>
    `;
    // Insertamos la sección completa del producto dentro del contenedor principal "detalle-root".
    root.appendChild(section);
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Creamos una sección adicional con un mensaje por defecto,
  // para indicar al usuario que debe elegir un producto desde el catálogo
  const msgSection = document.createElement('section');
  msgSection.className = 'detail no-target-msg section--neutral';
  msgSection.innerHTML = `
    <div class="container-detalle">
      <p>Elige un producto desde el catálogo para ver sus detalles.</p>
      <a class="btn boton-personalizado" href="productos.html">Ir al catálogo</a>
    </div>
  `;
  root.appendChild(msgSection);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Buscamos todas las secciones de detalle creadas y activamos en cada una
  // la lógica de la galería (imagen principal y miniaturas clicables).
  const secciones = root.querySelectorAll('.detail');
  secciones.forEach(configurarGaleriaProducto);
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Configura la galería de un producto específico:
// define qué imagen se muestra primero y cambia la imagen principal
// cuando el usuario hace clic en una miniatura
function configurarGaleriaProducto(seccion) {
  if (!seccion) return;
  const viewer = seccion.querySelector('.viewer');
  if (!viewer) return;
  const imagenes = viewer.querySelectorAll('.detail-main');
  const thumbs = seccion.querySelectorAll('.thumbs a.thumb');
  if (imagenes.length === 0 || thumbs.length === 0) return;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Dejamos todas las imágenes y miniaturas sin estado activo,
  // y luego marcamos la primera como la imagen inicial que se mostrará.
  imagenes.forEach(img => img.classList.remove('is-active'));
  thumbs.forEach(th => th.classList.remove('is-active'));
  imagenes[0].classList.add('is-active');
  thumbs[0].classList.add('is-active');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Asignamos un evento de clic a cada miniatura:
  // al hacer clic, se cambia la imagen principal a la correspondiente
  // y se actualiza cuál miniatura está marcada como activa
  thumbs.forEach((thumb, indice) => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      imagenes.forEach(img => img.classList.remove('is-active'));
      thumbs.forEach(th => th.classList.remove('is-active'));
      if (imagenes[indice]) {
        imagenes[indice].classList.add('is-active');
      }
      thumb.classList.add('is-active');
    });
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Detectar todos los botones "Añadir al carrito"
    const botones = document.querySelectorAll('.boton-personalizado');

    botones.forEach(boton => {
      boton.addEventListener('click', () => {

        // Verificamos si el botón está dentro de un producto (tiene clase .right)
        const producto = boton.closest('.right');
        if (!producto) {
          // Si no está dentro de un producto (como el botón "Volver"), no hace nada.
          return;
        }

        // Obtener datos del producto
        const nombre = producto.querySelector('h1').innerText;
        const precio = parseFloat(producto.querySelector('.price').innerText.replace('$', ''));
        const imagen = producto.parentElement.querySelector('.viewer img').src;

        // Crear objeto del producto
        const nuevoProducto = { nombre, precio, cantidad: 1, imagen };

        // Leer carrito actual desde localStorage
        let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

        // Verificar si ya existe
        const existente = carrito.find(p => p.nombre === nombre);
        if (existente) {
          existente.cantidad += 1;
        } else {
          carrito.push(nuevoProducto);
        }

        // Guardar carrito actualizado
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Avisar al usuario
        alert(`${nombre} fue añadido al carrito.`);
      });
    });
}
