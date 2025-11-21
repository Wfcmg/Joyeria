// ===============================
// MODELO DE PAGO
// ===============================
const PagoModel = {
  data: {
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    postal: '',
    metodoPago: 'Tarjeta de Crédito / Débito',
    tarjeta: '',
    expiracion: '',
    cvv: ''
  },

  errores: {
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    postal: '',
    tarjeta: '',
    expiracion: '',
    cvv: ''
  },

  setData: function(field, value) {
    this.data[field] = value;
  },

  getData: function() {
    return this.data;
  },

  resetData: function() {
    this.data = {
      nombre: '',
      correo: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      postal: '',
      metodoPago: 'Tarjeta de Crédito / Débito',
      tarjeta: '',
      expiracion: '',
      cvv: ''
    };
    this.errores = {
      nombre: '',
      correo: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      postal: '',
      tarjeta: '',
      expiracion: '',
      cvv: ''
    };
  },

  validarNombre: function(nombre) {
    const valor = nombre.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El nombre completo es obligatorio" };
    }
    if (valor.length < 3) {
      return { valido: false, mensaje: "El nombre debe tener al menos 3 caracteres" };
    }
    return { valido: true, mensaje: "" };
  },

  validarCorreo: function(correo) {
    const valor = correo.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El correo electrónico es obligatorio" };
    }
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patron.test(valor)) {
      return { valido: false, mensaje: "El formato del correo electrónico no es válido" };
    }
    return { valido: true, mensaje: "" };
  },

  validarTelefono: function(telefono) {
    const valor = telefono.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El teléfono es obligatorio" };
    }
    const patron = /^[0-9]{9,}$/;
    if (!patron.test(valor)) {
      return { valido: false, mensaje: "El teléfono debe tener al menos 9 dígitos numéricos" };
    }
    return { valido: true, mensaje: "" };
  },

  validarDireccion: function(direccion) {
    const valor = direccion.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "La dirección es obligatoria" };
    }
    if (valor.length < 10) {
      return { valido: false, mensaje: "La dirección debe ser más detallada (mínimo 10 caracteres)" };
    }
    return { valido: true, mensaje: "" };
  },

  validarCiudad: function(ciudad) {
    const valor = ciudad.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "La ciudad es obligatoria" };
    }
    if (valor.length < 3) {
      return { valido: false, mensaje: "El nombre de la ciudad debe tener al menos 3 caracteres" };
    }
    return { valido: true, mensaje: "" };
  },

  validarPostal: function(postal) {
    const valor = postal.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El código postal es obligatorio" };
    }
    const patron = /^[0-9]{4,10}$/;
    if (!patron.test(valor)) {
      return { valido: false, mensaje: "El código postal debe contener entre 4 y 10 dígitos" };
    }
    return { valido: true, mensaje: "" };
  },

  validarTarjeta: function(tarjeta) {
    const valor = tarjeta.trim().replace(/\s/g, "");
    if (valor.length === 0) {
      return { valido: false, mensaje: "El número de tarjeta es obligatorio" };
    }
    const patron = /^[0-9]{13,19}$/;
    if (!patron.test(valor)) {
      return { valido: false, mensaje: "El número de tarjeta debe tener entre 13 y 19 dígitos" };
    }
    return { valido: true, mensaje: "" };
  },

  validarExpiracion: function(expiracion) {
    const valor = expiracion.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "La fecha de expiración es obligatoria" };
    }
    const patron = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!patron.test(valor)) {
      return { valido: false, mensaje: "Formato de expiración inválido. Usa MM/AA (Ej: 12/25)" };
    }

    // Validar que la fecha no esté vencida
    const [mes, año] = valor.split('/');
    const fechaTarjeta = new Date(2000 + parseInt(año), parseInt(mes) - 1);
    const hoy = new Date();

    if (fechaTarjeta < hoy) {
      return { valido: false, mensaje: "La tarjeta está vencida" };
    }

    return { valido: true, mensaje: "" };
  },

  validarCVV: function(cvv) {
    const valor = cvv.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El CVV es obligatorio" };
    }
    const patron = /^[0-9]{3,4}$/;
    if (!patron.test(valor)) {
      return { valido: false, mensaje: "El CVV debe tener 3 o 4 dígitos" };
    }
    return { valido: true, mensaje: "" };
  },

  validarTodo: function(datos) {
    const errores = {};
    let formularioValido = true;

    // Validar datos de envío
    const validacionNombre = this.validarNombre(datos.nombre);
    if (!validacionNombre.valido) {
      errores.nombre = validacionNombre.mensaje;
      formularioValido = false;
    }

    const validacionCorreo = this.validarCorreo(datos.correo);
    if (!validacionCorreo.valido) {
      errores.correo = validacionCorreo.mensaje;
      formularioValido = false;
    }

    const validacionTelefono = this.validarTelefono(datos.telefono);
    if (!validacionTelefono.valido) {
      errores.telefono = validacionTelefono.mensaje;
      formularioValido = false;
    }

    const validacionDireccion = this.validarDireccion(datos.direccion);
    if (!validacionDireccion.valido) {
      errores.direccion = validacionDireccion.mensaje;
      formularioValido = false;
    }

    const validacionCiudad = this.validarCiudad(datos.ciudad);
    if (!validacionCiudad.valido) {
      errores.ciudad = validacionCiudad.mensaje;
      formularioValido = false;
    }

    const validacionPostal = this.validarPostal(datos.postal);
    if (!validacionPostal.valido) {
      errores.postal = validacionPostal.mensaje;
      formularioValido = false;
    }

    // Validar datos de pago
    const validacionTarjeta = this.validarTarjeta(datos.tarjeta);
    if (!validacionTarjeta.valido) {
      errores.tarjeta = validacionTarjeta.mensaje;
      formularioValido = false;
    }

    const validacionExpiracion = this.validarExpiracion(datos.expiracion);
    if (!validacionExpiracion.valido) {
      errores.expiracion = validacionExpiracion.mensaje;
      formularioValido = false;
    }

    const validacionCVV = this.validarCVV(datos.cvv);
    if (!validacionCVV.valido) {
      errores.cvv = validacionCVV.mensaje;
      formularioValido = false;
    }

    this.errores = errores;
    return { valido: formularioValido, errores: errores };
  }
};
