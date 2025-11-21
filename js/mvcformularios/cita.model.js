// ===============================
// MODELO DE CITA
// ===============================
const CitaModel = {
  data: {
    nombreCita: '',
    correoCita: '',
    fechaCita: '',
    horaCita: '',
    comentarioCita: ''
  },

  errores: {
    nombreCita: '',
    correoCita: '',
    fechaCita: '',
    horaCita: ''
  },

  setData: function(field, value) {
    this.data[field] = value;
  },

  getData: function() {
    return this.data;
  },

  resetData: function() {
    this.data = {
      nombreCita: '',
      correoCita: '',
      fechaCita: '',
      horaCita: '',
      comentarioCita: ''
    };
    this.errores = {
      nombreCita: '',
      correoCita: '',
      fechaCita: '',
      horaCita: ''
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

  validarFecha: function(fecha) {
    if (!fecha) {
      return { valido: false, mensaje: "La fecha es obligatoria" };
    }
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fechaIngresada = new Date(fecha + "T00:00");

    if (fechaIngresada < hoy) {
      return { valido: false, mensaje: "La fecha no puede ser anterior al día de hoy" };
    }
    return { valido: true, mensaje: "" };
  },

  validarHora: function(hora) {
    if (!hora) {
      return { valido: false, mensaje: "La hora es obligatoria" };
    }
    const patron = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!patron.test(hora.trim())) {
      return { valido: false, mensaje: "Selecciona una hora válida (formato HH:MM)" };
    }
    return { valido: true, mensaje: "" };
  },

  validarTodo: function(datos) {
    const errores = {};
    let formularioValido = true;

    const validacionNombre = this.validarNombre(datos.nombreCita);
    if (!validacionNombre.valido) {
      errores.nombreCita = validacionNombre.mensaje;
      formularioValido = false;
    }

    const validacionCorreo = this.validarCorreo(datos.correoCita);
    if (!validacionCorreo.valido) {
      errores.correoCita = validacionCorreo.mensaje;
      formularioValido = false;
    }

    const validacionFecha = this.validarFecha(datos.fechaCita);
    if (!validacionFecha.valido) {
      errores.fechaCita = validacionFecha.mensaje;
      formularioValido = false;
    }

    const validacionHora = this.validarHora(datos.horaCita);
    if (!validacionHora.valido) {
      errores.horaCita = validacionHora.mensaje;
      formularioValido = false;
    }

    this.errores = errores;
    return { valido: formularioValido, errores: errores };
  }
};
