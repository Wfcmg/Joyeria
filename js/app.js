$(document).ready(function() {

  // Cuando se envíe el formulario
  $("#formContacto").submit(function(e) {
    e.preventDefault(); // evita que recargue la página

    mostrarEnviando();

    // Simular envío (como si fuera AJAX)
    setTimeout(function() {
      // Validación básica
      if ($("#nombre").val() === "" || $("#correo").val() === "" || $("#mensaje").val() === "") {
        mostrarError("⚠️ Todos los campos son obligatorios.");
      } else {
        mostrarExito("✅ Mensaje enviado correctamente.");
      }
    }, 1500);
  });

  // Función para mostrar "Enviando..."
  function mostrarEnviando() {
    $("#estadoFormulario").html("<p class='text-info'>📤 Enviando mensaje...</p>");
  }

  // Función para mostrar mensaje de éxito
  function mostrarExito(texto) {
    $("#estadoFormulario").html(`<p class='text-success'>${texto}</p>`);
  }

  // Función para mostrar mensaje de error
  function mostrarError(texto) {
    $("#estadoFormulario").html(`<p class='text-danger'>${texto}</p>`);
  }

});
