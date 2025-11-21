// ===============================
// MODELO DE CONTACTO
// ===============================
const ContactoModel = {
  data: {
    nombre: '',
    correo: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  },

  errores: {
    nombre: '',
    correo: '',
    telefono: '',
    asunto: '',
    mensaje: ''
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
      asunto: '',
      mensaje: ''
    };
    this.errores = {
      nombre: '',
      correo: '',
      telefono: '',
      asunto: '',
      mensaje: ''
    };
  },

  validarNombre: function(nombre) {
    const valor = nombre.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El nombre es obligatorio" };
    }
    if (valor.length < 3) {
      return { valido: false, mensaje: "El nombre debe tener al menos 3 caracteres" };
    }
    return { valido: true, mensaje: "" };
  },

  validarCorreo: function(correo) {
    const valor = correo.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El correo es obligatorio" };
    }
    const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!patron.test(valor)) {
      return { valido: false, mensaje: "El formato del correo no es válido (ejemplo: usuario@dominio.com)" };
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

  validarAsunto: function(asunto) {
    const valor = asunto.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El asunto es obligatorio" };
    }
    if (valor.length < 5) {
      return { valido: false, mensaje: "El asunto debe tener al menos 5 caracteres" };
    }
    return { valido: true, mensaje: "" };
  },

  validarMensaje: function(mensaje) {
    const valor = mensaje.trim();
    if (valor.length === 0) {
      return { valido: false, mensaje: "El mensaje es obligatorio" };
    }
    if (valor.length < 10) {
      return { valido: false, mensaje: "El mensaje debe tener al menos 10 caracteres" };
    }
    return { valido: true, mensaje: "" };
  },

  validarTodo: function(datos) {
    const errores = {};
    let formularioValido = true;

    // Validar cada campo
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

    const validacionAsunto = this.validarAsunto(datos.asunto);
    if (!validacionAsunto.valido) {
      errores.asunto = validacionAsunto.mensaje;
      formularioValido = false;
    }

    const validacionMensaje = this.validarMensaje(datos.mensaje);
    if (!validacionMensaje.valido) {
      errores.mensaje = validacionMensaje.mensaje;
      formularioValido = false;
    }

    this.errores = errores;
    return { valido: formularioValido, errores: errores };
  }
};
