// Punto de entrada - Inicializa la aplicación MVC de productos

$(document).ready(function() {

  // Verificar que todos los módulos estén cargados
  if (!window.ProductRepo) {
    console.error('ProductRepo no está disponible');
    return;
  }

  if (!window.ProductUtils) {
    console.error('ProductUtils no está disponible');
    return;
  }

  if (!window.ProductModel) {
    console.error('ProductModel no está disponible');
    return;
  }

  if (!window.ProductView) {
    console.error('ProductView no está disponible');
    return;
  }

  if (!window.ProductController) {
    console.error('ProductController no está disponible');
    return;
  }

  // Inicializar el modelo con el repositorio
  window.ProductModel.init(window.ProductRepo);

  // Inicializar el controlador que coordina todo
  window.ProductController.init();

  console.log('Aplicación de productos inicializada correctamente');

});
