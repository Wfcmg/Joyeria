// Cuando la página esté lista, armamos todo el detalle dinámico
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('detalle-root');
  if (!root) return; // Si no existe el contenedor, no hacemos nada

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Lista de productos que se mostrarán en la página de detalle
  const productos = [
    {
      id: 'p1',
      numero: 1,
      titulo: 'Anillo "Eternidad Solitaria"',
      subtitulo: 'Un diseño sobrio y moderno con un diamante de corte brillante en montura solitaria.',
      precio: '$1.299,99',
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
      precio: '999,99',
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
      precio: '$849,99',
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
      precio: '$459,99',
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
      precio: '$699,99',
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Esta función recibe una lista (array) llamada "materiales"
  // Con .map() recorre cada elemento del array y lo convierte en una etiqueta <li>...</li>
  // Al final, .join('') une todos los <li> en un solo bloque de texto HTML sin comas
  const crearMaterialesHTML = (materiales) =>
    materiales.map(m => `<li>${m}</li>`).join('');

  // Esta función crea las imágenes grandes del visor (las que se ven principales)
  // Recibe un "prod" (producto) que tiene dentro una lista llamada "imagenes"
  // A cada imagen le pone un id único usando el número del producto y su posición (i + 1).
  // Por ejemplo: "img1-1", "img1-2", "img1-3".
  // Luego devuelve una cadena HTML que contiene todas las imágenes grandes
  const crearImagenesHTML = (prod) =>
    prod.imagenes.map((archivo, i) => {
      const imgId = `img${prod.numero}-${i + 1}`;
      return `
        <img id="${imgId}"
             src="img/${archivo}"
             class="detail-main"
             alt="Producto ${prod.numero} vista ${i + 1}">
      `;
    }).join('');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Esta función genera las "miniaturas" (thumbs) de cada producto
  //
  // Recibe un objeto "prod" (producto) que contiene un arreglo llamado "imagenes"
  // Con .map() recorre cada imagen del producto una por una
  // Dentro del recorrido, se crea un id único para cada imagen
  // usando el número del producto y el índice de la imagen (i + 1)
  //
  // Luego, devuelve un bloque HTML con un enlace <a> que tiene:
  //   - la clase "thumb" (para aplicar estilos CSS)
  //   - un atributo href="#idDeLaImagen", que apunta a la imagen grande correspondiente
  // Dentro de ese enlace se coloca una etiqueta <img> con la miniatura del producto
  const crearThumbsHTML = (prod) =>
    prod.imagenes.map((archivo, i) => {
      const imgId = `img${prod.numero}-${i + 1}`;
      return `
        <a class="thumb" href="#${imgId}">
          <img src="img/${archivo}" alt="">
        </a>
      `;
    }).join('');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // .forEach() sirve para ejecutar una acción con cada elemento del arreglo
  // En este caso, "prod" representa un producto
  productos.forEach((prod) => {
    // llaman a las funciones anteriores
      const materialesHTML = crearMaterialesHTML(prod.materiales);
      const imagenesHTML   = crearImagenesHTML(prod);
      const thumbsHTML     = crearThumbsHTML(prod);

      // insertAdjacentHTML('beforeend', ...) agrega este contenido HTML
      // justo al final del elemento "root", sin borrar lo anterior
      // Es como ir pegando cada producto uno tras otro
      root.insertAdjacentHTML('beforeend', `
        <section id="${prod.id}" class="detail section--neutral">
          <div class="container-detalle">
            <div class="left">
              <div class="viewer">
                ${imagenesHTML}
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
              <p>${prod.descripcion}</p>

              <div class="price mt-3">${prod.precio}</div>
              <button class="btn boton-personalizado mt-2">Añadir al carrito</button>
            </div>
          </div>
        </section>
      `);
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Cada "detail" representa una sección de producto (anillo, colgante, etc.)
  //Usa .forEach() para recorrer cada una de esas secciones por separado.
  root.querySelectorAll('.detail').forEach(seccion => {
    const imgs   = seccion.querySelectorAll('.detail-main');
    const thumbs = seccion.querySelectorAll('.thumb');
    if (!imgs.length || !thumbs.length) return;
    // Agrega la clase 'is-active' a la primera imagen y a la primera miniatura
    // Esto hace que al cargar la página, la primera imagen se muestre visible
    // y la miniatura aparezca resaltada
    imgs[0].classList.add('is-active');
    thumbs[0].classList.add('is-active');
  });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Esta función se activa cada vez que se hace clic en cualquier parte
  // del área de productos
  root.addEventListener('click', (e) => {
    // e.target representa el elemento exacto donde se hizo clic
    // .closest('.thumb') busca si ese clic ocurrió dentro de una miniatura
    const thumb = e.target.closest('.thumb');
    // Si el clic fue en una miniatura:
    if (thumb) {
      e.preventDefault(); // Evita que el enlace haga scroll automático

      // Busca la sección del producto donde está esa miniatura
      const seccion = thumb.closest('.detail');
      if (!seccion) return; // Si no la encuentra, sale del bloque

      // Crea dos listas: una con todas las miniaturas y otra con las imágenes grandes
      // Array.from() convierte esos elementos en arreglos para poder manipularlos
      const thumbs = Array.from(seccion.querySelectorAll('.thumb'));
      const imgs   = Array.from(seccion.querySelectorAll('.detail-main'));

      // Busca el número de posición (índice) de la miniatura clickeada.
      const index = thumbs.indexOf(thumb);
      if (index === -1) return; // Si no la encuentra, no hace nada.

      // Quita la clase 'is-active' a todas las imágenes y miniaturas
      // esto hace que se oculten o pierdan el resaltado actual
      imgs.forEach(img => img.classList.remove('is-active'));
      thumbs.forEach(t => t.classList.remove('is-active'));

      // Agrega la clase 'is-active' solo a la imagen y miniatura seleccionadas
      // Esto cambia la imagen principal mostrada en pantalla
      if (imgs[index]) imgs[index].classList.add('is-active');
      thumb.classList.add('is-active');

      return; // Termina aquí para no ejecutar la parte del carrito.
    }
    // Busca si el clic fue en un botón con la clase .boton-personalizado
    const botonCarrito = e.target.closest('.boton-personalizado');
    if (!botonCarrito) return; // Si no fue ese botón, no hace nada

    // Encuentra el bloque de información del producto (columna derecha)
    const bloqueProducto = botonCarrito.closest('.right');
    if (!bloqueProducto) return;

    // Toma el nombre del producto desde la etiqueta <h1>.
    const nombre = bloqueProducto.querySelector('h1').innerText;

    // Toma el precio desde la etiqueta con clase .price y le quita el símbolo $.
    const precio = parseFloat(
      bloqueProducto.querySelector('.price').innerText.replace('$', '')
    );

    // Obtiene la imagen principal del visor (la que está activa).
    const imagen = bloqueProducto.parentElement.querySelector('.viewer img').src;

    // Crea un nuevo objeto con los datos del producto.
    const nuevoProducto = { nombre, precio, cantidad: 1, imagen };

    // Revisa si ya existe un carrito guardado en localStorage.
    // Si no existe, crea un arreglo vacío [].
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Busca si el producto ya está en el carrito (comparando por nombre).
    const existente = carrito.find(p => p.nombre === nombre);

    // Si ya estaba, aumenta la cantidad.
    // Si no, lo agrega como nuevo producto al carrito.
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push(nuevoProducto);
    }

    // Guarda el carrito actualizado en localStorage,
    // convirtiendo el arreglo en texto con JSON.stringify().
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Muestra una alerta informando que se agregó el producto.
    alert(`${nombre} fue añadido al carrito.`);
  });
});
