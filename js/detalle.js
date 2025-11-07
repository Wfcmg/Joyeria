// Cuando la página esté lista
document.addEventListener('DOMContentLoaded', () => {
  // Siginifica que esta bsucando el detalle root y el if es si aun no anda la pagina
  const root = document.getElementById('detalle-root');
  if (!root) return;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Aqui vamos a ahacer un array y generar productos la variable
  const productos = [
    {
      id: 'p1',
      numero: 1,
      titulo: 'Anillo "Eternidad Solitaria"',
      subtitulo: 'Un diseño sobrio y moderno con un diamante de corte brillante en montura solitaria.',
      precio: '$120',
      imagenes: ['producto1.jpg', 'producto1.2.jpg', 'producto1.3.jpg'],
      // arreglo (array), es decir, una lista de varios textos //
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // .forEach() sirve para recorrer cada elemento de un array, prod hace que recibe uno de los productos y guardarlo temporalmente en la variable prod
  productos.forEach((prod) => {
    // <li></li> significa list item, .map() sirve para recorrer cada elemento del array y transformarlo como ejemplo <li> y join une el resultado
    const materialesHTML = prod.materiales.map(m => `<li>${m}</li>`).join('');
    // prod.imagenes es un array (lista) .map tranforma en una etiqueta <img>, index es la posición de la imagen en el arreglo
    // // 'index' indica la posición de la imagen dentro del array
    const imagenesHTML = prod.imagenes.map((nombreArchivo, index) => {
      // const es un dato fijo que usaré más adelante, imgId es simplemente el nombre,
      // ${index + 1} toma el número de posición de la imagen dentro del array, sumándole 1
      const imgId = `img${prod.numero}-${index + 1}`;
      // asigna el identificador o dea el id de la imagen
      //src es donde se carga la imagen
      //pone o extrae la clase CSS para aplicar estilos
      // texto alternativo que describe la imagen
      return `
        <img id="${imgId}"
             src="img/${nombreArchivo}"
             class="detail-main"
             alt="Producto ${prod.numero} vista ${index + 1}">
      `;
      // Une todas las etiquetas
    }).join('');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // .map() transforma cada uno en una etiqueta <a>
    // es deicr que se están creando las miniaturas (thumbnails) que aparecen debajo de la imagen principal, las chiquitas
    const thumbsHTML = prod.imagenes.map((nombreArchivo, index) => {
      // const crea una variable que se usará para enlazar la miniatura con la imagen grande
      // ${prod.numero} es el número del producto
      // ${index + 1} es la posición de la imagen
      const imgId = `img${prod.numero}-${index + 1}`;
      //<a> la declaramos como "thumb" que apunta al id de la imagen
      // Dentro de ese enlace se incluye una etiqueta <img> que carga la misma imagen pero la pequeña
      return `
    <a class="thumb" href="#${imgId}">
      <img src="img/${nombreArchivo}" alt="">
    </a>
  `;
    }).join(''); // .join('') une todas las imagenes pequeñas
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  root.querySelectorAll('.detail').forEach(seccion => {
    //root busca TODOS los elementos que tengan la clase .detail o sea el detalle
    // .forEach Recorre cada uno de esos .detail uno por uno
    const imgs = seccion.querySelectorAll('.detail-main');
    // Busca dentro de ESTA sección los elementos que tengan la clase .detail-main
    // "imgs" es como una lista de esas imágenes.

    const thumbs = seccion.querySelectorAll('.thumb');
    // Igual que arriba pero ahora busca las chuquitas
    // thumbs es la lista de todas las miniaturas
    if (!imgs.length || !thumbs.length) return;
    // El if con imgs.length es cuantas imagenes grandes encontro
    // thumbs.length es cuántas miniaturas encontró

    imgs[0].classList.add('is-active');
    // Toma la PRIMERA imagen grande o sea con la posición 0 de la lista
    // y le agrega la clase CSS "is-active"
    // Con esa clase, en el CSS decida que esa imagen se vea visible

    thumbs[0].classList.add('is-active');
    // Hace lo mismo pero con la primera miniatura
  });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  root.addEventListener('click', (e) => {
    // Se agrega un escuchador al elemento root

    const thumb = e.target.closest('.thumb');
    // .closest('.thumb') busca el elemento más cercano (puede ser él mismo o su padre) que tenga la clase "thumb".
    // Esto permite detectar si el clic fue sobre una miniatura, incluso si fue sobre una imagen dentro del contenedor.

    if (thumb) {
      // Si el clic fue en una miniatura entra a este bloque
      e.preventDefault();
      // evita que la página se recargue
      const seccion = thumb.closest('.detail');
      // Busca el contenedor con la clase detail o sea encuentra a qué producto pertenece esa miniatura
      if (!seccion) return;
      // Si no encontró una sección se sale para evitar errores

      const thumbs = Array.from(seccion.querySelectorAll('.thumb'));
      // Busca todas las miniaturas de ese producto y las convierte en un array real con Array.from()
      const imgs = Array.from(seccion.querySelectorAll('.detail-main'));
      // Igual que arriba pero busca las imágenes grandes

      const index = thumbs.indexOf(thumb);
      // Busca en qué posición está la miniatura que el usuario seleccionó dentro de la lista de miniaturas

      if (index === -1) return;
      // Si no encuentra el índice, se sale para no ejecutar pasos inválidos.

      imgs.forEach(img => img.classList.remove('is-active'));
      // Quita "is-active" de todas las imágenes grandes

      thumbs.forEach(t => t.classList.remove('is-active'));
      // Quita "is-active" de todas las miniaturas

      if (imgs[index]) imgs[index].classList.add('is-active');
      // Activa la imagen grande correspondiente

      thumb.classList.add('is-active');
      // Marca la miniatura clicada como activa

      return; // Termina aquí si fue un clic en miniatura
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Lógica para el botón "Añadir al carrito"

    const botonCarrito = e.target.closest('.boton-personalizado');
    // e.target es el elemento donde el usuario hizo clic
    // .closest('.boton-personalizado') detecta si el clic fue en el botón "Añadir al carrito"

    if (botonCarrito) {
      // Si el clic efectivamente fue sobre un botón boton-personalizado, sigue

      const producto = botonCarrito.closest('.right');
      // Busca el contenedor del lado derecho que tiene la información del producto: nombre, precio, botón etc.

      if (!producto) return;
      // Si por alguna razón el botón no está dentro de un bloque .right se sale

      const nombre = producto.querySelector('h1').innerText;
      // Toma el título del producto

      const precio = parseFloat(
        producto.querySelector('.price').innerText.replace('$', '')
      );
      // Toma el texto del precio, le quita el símbolo $, y lo convierte a número

      const imagen = producto.parentElement.querySelector('.viewer img').src;
      // Toma la primera imagen del área .viewer (imagen principal)

      const nuevoProducto = { nombre, precio, cantidad: 1, imagen };
      // Objeto con la info del producto

      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      // Lee el carrito del localStorage, o crea uno vacío si no existe

      const existente = carrito.find(p => p.nombre === nombre);
      // Busca si el producto ya está en el carrito

      if (existente) {
        existente.cantidad += 1;
        // Si ya existe, solo aumenta la cantidad
      } else {
        carrito.push(nuevoProducto);
        // Si no existe, lo agrega nuevo
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      // Guarda el carrito actualizado en localStorage

      alert(`${nombre} fue añadido al carrito.`);
      // Mensaje de confirmación
    }
  });
});
