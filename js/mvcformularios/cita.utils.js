// ===============================
// UTILIDADES PARA CITA
// (Puedes agregar funciones auxiliares aquí si las necesitas)
// ===============================
const CitaUtils = {
  formatearFecha: function(fecha) {
    const f = new Date(fecha);
    return f.toLocaleDateString('es-ES');
  },

  formatearHora: function(hora) {
    return hora;
  }
};
