// ===============================
// UTILIDADES PARA PAGO
// ===============================
const PagoUtils = {
  formatearTarjeta: function(numero) {
    return numero.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  },

  formatearExpiracion: function(valor) {
    let limpio = valor.replace(/\D/g, "");
    if (limpio.length >= 2) {
      limpio = limpio.substring(0, 2) + "/" + limpio.substring(2, 4);
    }
    return limpio;
  },

  enmascarrarTarjeta: function(numero) {
    const limpio = numero.replace(/\s/g, "");
    if (limpio.length < 4) return numero;
    return "**** **** **** " + limpio.slice(-4);
  },

  validarLuhn: function(numero) {
    // Algoritmo de Luhn para validar números de tarjeta
    const limpio = numero.replace(/\s/g, "");
    let suma = 0;
    let alternar = false;

    for (let i = limpio.length - 1; i >= 0; i--) {
      let digito = parseInt(limpio.charAt(i), 10);

      if (alternar) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }

      suma += digito;
      alternar = !alternar;
    }

    return suma % 10 === 0;
  },

  calcularTotal: function(items) {
    return items.reduce((total, item) => total + (item.precio * item.cantidad), 0);
  }
};
