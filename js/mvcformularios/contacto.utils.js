// ===============================
// UTILIDADES PARA CONTACTO
// (Puedes agregar funciones auxiliares aquí si las necesitas)
// ===============================
const ContactoUtils = {
  formatearTelefono: function(telefono) {
    return telefono.replace(/\D/g, '');
  },

  capitalizar: function(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
};
