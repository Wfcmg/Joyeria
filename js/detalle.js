// Cuando la página esté lista, armamos todo el detalle dinámico (versión con jQuery)
$(document).ready(function () {
  // Usamos jQuery para obtener el contenedor raíz
  const $root = $('#detalle-root');
  if (!$root.length) return; // Si no existe el contenedor, no hacemos nada

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // En vez de tener una lista interna aquí, ahora tomamos los productos
  // desde el repositorio global ProductRepo (list-productos.js).
  //
  // Esto evita duplicar la información y mantiene una sola fuente de datos.
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const productos = (window.ProductRepo && typeof window.ProductRepo.getAll === 'function')
    ? window.ProductRepo.getAll()
    : [];

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Esta función recibe una lista (array) llamada "materiales".
  // Cada material del producto viene como un texto (por ejemplo: "Metal: Plata").
  // Con .map() recorre cada elemento del array y lo convierte en una etiqueta <li>...</li>
  // Al final, .join('') une todos los <li> en un solo bloque de texto HTML sin comas
  // El resultado será algo como:
  // <li>Metal: Plata</li><li>Piedra: Diamante</li><li>Acabado: Pulido</li>
  const crearMaterialesHTML = (materiales) =>
    (materiales || []).map(m => `<li>${m}</li>`).join('');

  // Esta función crea las imágenes grandes del visor (las que se ven principales).
  // Recibe un "prod" (producto) que tiene dentro una lista llamada "imagenes".
  // Usa .map() para recorrer todas las imágenes del producto una por una.
  // A cada imagen le pone un id único usando el número del producto y su posición (i + 1).
  // Por ejemplo: "img1-1", "img1-2", "img1-3".
  // Luego devuelve una cadena HTML que contiene todas las imágenes grandes
  // con la clase "detail-main" y la ruta "img/nombreArchivo".
  // Finalmente, .join('') une todas las imágenes en un solo bloque de texto HTML
  const crearImagenesHTML = (prod) =>
    (prod.imagenes || []).map((archivo, i) => {
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
    (prod.imagenes || []).map((archivo, i) => {
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
    // Llaman a las funciones anteriores
    const materialesHTML = crearMaterialesHTML(prod.materiales);
    const imagenesHTML   = crearImagenesHTML(prod);
    const thumbsHTML     = crearThumbsHTML(prod);

    // Con jQuery usamos .append() para agregar contenido HTML
    // justo al final del elemento raíz, sin borrar lo anterior.
    // Es como ir pegando cada producto uno tras otro.
    $root.append(`
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
            <p>${prod.descripcionDetallada}</p>
            <div class="price mt-3">${prod.precioTexto}</div>
            <button class="btn boton-personalizado mt-2">Añadir al carrito</button>
          </div>
        </div>
      </section>
    `);
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Cada "detail" representa una sección de producto (anillo, colgante, etc.)
  //Usa .each() para recorrer cada una de esas secciones por separado.
  $root.find('.detail').each(function () {
    const $seccion = $(this);
    const $imgs    = $seccion.find('.detail-main');
    const $thumbs  = $seccion.find('.thumb');

    if (!$imgs.length || !$thumbs.length) return;

    // Agrega la clase 'is-active' a la primera imagen y a la primera miniatura
    // Esto hace que al cargar la página, la primera imagen se muestre visible
    // y la miniatura aparezca resaltada
    $imgs.eq(0).addClass('is-active');
    $thumbs.eq(0).addClass('is-active');
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // MANEJO DE EVENTOS (VERSIÓN JQUERY)
  //
  // En vez de usar addEventListener sobre root y luego closest(),
  // usamos delegación de eventos con jQuery:
  //   $root.on('click', 'selector', function() { ... });
  //
  // Esto permite que los eventos funcionen aunque el contenido se genere dinámicamente.
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 1) Cambio de imagen al hacer clic en una miniatura (thumb)
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $root.on('click', '.thumb', function (e) {
    e.preventDefault(); // Evita que el enlace haga scroll automático

    const $thumb   = $(this);
    const $seccion = $thumb.closest('.detail');
    if (!$seccion.length) return;

    // Crea dos listas: una con todas las miniaturas y otra con las imágenes grandes
    const $thumbs = $seccion.find('.thumb');
    const $imgs   = $seccion.find('.detail-main');

    // Busca el número de posición (índice) de la miniatura clickeada.
    const index = $thumbs.index($thumb);
    if (index === -1) return;

    // Quita la clase 'is-active' a todas las imágenes y miniaturas
    // esto hace que se oculten o pierdan el resaltado actual
    $imgs.removeClass('is-active');
    $thumbs.removeClass('is-active');

    // Agrega la clase 'is-active' solo a la imagen y miniatura seleccionadas
    // Esto cambia la imagen principal mostrada en pantalla
    $imgs.eq(index).addClass('is-active');
    $thumb.addClass('is-active');
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // 2) Manejo del botón "Añadir al carrito"
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  $root.on('click', '.boton-personalizado', function (e) {
    // e.preventDefault() es opcional aquí porque es un botón,
    // pero se puede dejar por consistencia.
    e.preventDefault();

    // Encuentra el bloque de información del producto (columna derecha)
    const $botonCarrito   = $(this);
    const $bloqueProducto = $botonCarrito.closest('.right');
    if (!$bloqueProducto.length) return;

    // Toma el nombre del producto desde la etiqueta <h1>.
    const nombre = $bloqueProducto.find('h1').text();

    // Toma el precio desde la etiqueta con clase .price y le quita el símbolo $.
    const precioTexto = $bloqueProducto.find('.price').text().replace('$', '').trim();
    const precio = parseFloat(precioTexto);

    // Obtiene la imagen principal del visor (la que está activa)
    const $contenedorDetalle = $bloqueProducto.closest('.container-detalle');
    let imagen = $contenedorDetalle.find('.viewer img.is-active').attr('src');

    // Si por algún motivo no hay imagen con .is-active, toma la primera
    if (!imagen) {
      imagen = $contenedorDetalle.find('.viewer img').first().attr('src') || '';
    }

    // Crea un nuevo objeto con los datos del producto.
    const nuevoProducto = { nombre, precio, cantidad: 1, imagen };

    // Revisa si ya existe un carrito guardado en localStorage.
    // Si no existe, crea un arreglo vacío [].
    let carrito;
    try {
      carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      if (!Array.isArray(carrito)) {
        carrito = [];
      }
    } catch (err) {
      carrito = [];
    }

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
