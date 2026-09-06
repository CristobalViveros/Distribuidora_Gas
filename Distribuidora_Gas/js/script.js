// ============================================
// FUNCIÓN 1: Año dinámico en el footer 
// ============================================
const anioActual = document.getElementById("anio-actual");
if (anioActual) {
    anioActual.textContent = new Date().getFullYear();
}


// ============================================
// FUNCIÓN 2: Detalle de producto - cantidad y total
// ============================================
const inputCantidad = document.getElementById("cantidad");

if (inputCantidad) {
    const precioUnitarioEl = document.getElementById("precioUnitario");
    const precioUnitario = Number(precioUnitarioEl.dataset.precio);
    const totalPedido = document.getElementById("totalPedido");
    const btnMenos = document.getElementById("btnMenos");
    const btnMas = document.getElementById("btnMas");
    const btnPedir = document.getElementById("btnPedir");
    const mensajePedido = document.getElementById("mensajePedido");

    function formatearCLP(valor) {
        return "$" + valor.toLocaleString("es-CL");
    }

    function calcularTotal() {
        let cantidad = parseInt(inputCantidad.value);

        // Si el usuario borra el campo o pone algo inválido, lo dejamos en 1
        if (isNaN(cantidad) || cantidad < 1) {
            cantidad = 1;
            inputCantidad.value = 1;
        }

        const total = precioUnitario * cantidad;
        totalPedido.textContent = formatearCLP(total);
    }

    btnMenos.addEventListener("click", () => {
        let cantidad = parseInt(inputCantidad.value) || 1;
        if (cantidad > 1) {
            inputCantidad.value = cantidad - 1;
            calcularTotal();
        }
    });

    btnMas.addEventListener("click", () => {
        let cantidad = parseInt(inputCantidad.value) || 1;
        if (cantidad < 10) {
            inputCantidad.value = cantidad + 1;
            calcularTotal();
        }
    });

    inputCantidad.addEventListener("input", calcularTotal);

    btnPedir.addEventListener("click", () => {
        const cantidad = inputCantidad.value;
        mensajePedido.textContent = "¡Pedido registrado! " + cantidad + " cilindro(s). Te contactaremos para coordinar la entrega.";
        mensajePedido.style.color = "green";
    });
}

// ============================================
// FUNCIONES AUXILIARES DE VALIDACIÓN 
// ============================================
function mostrarError(spanId, mensaje) {
    const span = document.getElementById(spanId);
    span.textContent = mensaje;
}

function limpiarError(spanId) {
    document.getElementById(spanId).textContent = "";
}

const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexSoloNumeros = /^[0-9]+$/;

// ============================================
// FUNCIÓN 3: Validación del formulario de login
// ============================================
const formLogin = document.getElementById("formLogin");

if (formLogin) {
    const emailLogin = document.getElementById("email");
    const passwordLogin = document.getElementById("password");
    const mensajeExito = document.getElementById("mensajeExito");

    formLogin.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        limpiarError("errorEmail");
        limpiarError("errorPassword");
        mensajeExito.textContent = "";

        if (emailLogin.value.trim() === "") {
            mostrarError("errorEmail", "El correo es obligatorio.");
            esValido = false;
        } else if (!regexEmail.test(emailLogin.value.trim())) {
            mostrarError("errorEmail", "Ingresa un correo válido (ej: nombre@correo.com).");
            esValido = false;
        }

        if (passwordLogin.value === "") {
            mostrarError("errorPassword", "La contraseña es obligatoria.");
            esValido = false;
        } else if (passwordLogin.value.length < 6) {
            mostrarError("errorPassword", "La contraseña debe tener al menos 6 caracteres.");
            esValido = false;
        }

        if (esValido) {
            mensajeExito.textContent = "¡Inicio de sesión exitoso! Redirigiendo...";
            mensajeExito.style.color = "green";
        }
    });
}

// ============================================
// FUNCIÓN 4: Validación del formulario de registro
// ============================================
const formRegistro = document.getElementById("formRegistro");

if (formRegistro) {
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const emailRegistro = document.getElementById("email");
    const telefono = document.getElementById("telefono");
    const direccion = document.getElementById("direccion");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmarPassword");
    const mensajeExitoRegistro = document.getElementById("mensajeExitoRegistro");

    formRegistro.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        // Limpiamos todos los errores antes de revalidar
        ["errorNombre", "errorApellido", "errorEmail", "errorTelefono",
         "errorDireccion", "errorFecha", "errorPassword", "errorConfirmarPassword"]
            .forEach(limpiarError);
        mensajeExitoRegistro.textContent = "";

        if (nombre.value.trim() === "") {
            mostrarError("errorNombre", "El nombre es obligatorio.");
            esValido = false;
        } else if (!regexSoloLetras.test(nombre.value.trim())) {
            mostrarError("errorNombre", "El nombre debe contener solo letras.");
            esValido = false;
        }

        if (apellido.value.trim() === "") {
            mostrarError("errorApellido", "El apellido es obligatorio.");
            esValido = false;
        } else if (!regexSoloLetras.test(apellido.value.trim())) {
            mostrarError("errorApellido", "El apellido debe contener solo letras.");
            esValido = false;
        }

        if (emailRegistro.value.trim() === "") {
            mostrarError("errorEmail", "El correo es obligatorio.");
            esValido = false;
        } else if (!regexEmail.test(emailRegistro.value.trim())) {
            mostrarError("errorEmail", "Ingresa un correo válido.");
            esValido = false;
        }

        if (telefono.value.trim() === "") {
            mostrarError("errorTelefono", "El teléfono es obligatorio.");
            esValido = false;
        } else if (!regexSoloNumeros.test(telefono.value.trim())) {
            mostrarError("errorTelefono", "El teléfono debe contener solo números.");
            esValido = false;
        } else if (telefono.value.trim().length < 8 || telefono.value.trim().length > 9) {
            mostrarError("errorTelefono", "Ingresa un teléfono válido (8 o 9 dígitos).");
            esValido = false;
        }

        if (direccion.value.trim() === "") {
            mostrarError("errorDireccion", "La dirección es obligatoria, la necesitamos para la entrega.");
            esValido = false;
        }

        if (fechaNacimiento.value === "") {
            mostrarError("errorFecha", "La fecha de nacimiento es obligatoria.");
            esValido = false;
        } else {
            const hoy = new Date();
            const nacimiento = new Date(fechaNacimiento.value);
            let edad = hoy.getFullYear() - nacimiento.getFullYear();
            const mesDiff = hoy.getMonth() - nacimiento.getMonth();
            if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < nacimiento.getDate())) {
                edad--;
            }
            if (edad < 18) {
                mostrarError("errorFecha", "Debes ser mayor de 18 años para registrarte.");
                esValido = false;
            }
        }

        if (password.value === "") {
            mostrarError("errorPassword", "La contraseña es obligatoria.");
            esValido = false;
        } else if (password.value.length < 6) {
            mostrarError("errorPassword", "La contraseña debe tener al menos 6 caracteres.");
            esValido = false;
        }

        if (confirmarPassword.value === "") {
            mostrarError("errorConfirmarPassword", "Debes confirmar la contraseña.");
            esValido = false;
        } else if (password.value !== confirmarPassword.value) {
            mostrarError("errorConfirmarPassword", "Las contraseñas no coinciden.");
            esValido = false;
        }

        if (esValido) {
            mensajeExitoRegistro.textContent = "¡Registro exitoso! Ya puedes iniciar sesión.";
            mensajeExitoRegistro.style.color = "green";
            formRegistro.reset();
        }
    });
}

// ============================================
// FUNCIÓN 5: Validación del formulario de contacto
// ============================================
const formContacto = document.getElementById("formulario-contacto");

if (formContacto) {
    const nombreContacto = document.getElementById("nombre");
    const correoContacto = document.getElementById("correo");
    const mensajeContacto = document.getElementById("mensaje");
    const mensajeExitoContacto = document.getElementById("mensajeExitoContacto");

    formContacto.addEventListener("submit", (evento) => {
        evento.preventDefault();
        let esValido = true;

        limpiarError("errorNombre");
        limpiarError("errorCorreo");
        limpiarError("errorMensaje");
        mensajeExitoContacto.textContent = "";

        if (nombreContacto.value.trim() === "") {
            mostrarError("errorNombre", "El nombre es obligatorio.");
            esValido = false;
        } else if (!regexSoloLetras.test(nombreContacto.value.trim())) {
            mostrarError("errorNombre", "El nombre debe contener solo letras.");
            esValido = false;
        }

        if (correoContacto.value.trim() === "") {
            mostrarError("errorCorreo", "El correo es obligatorio.");
            esValido = false;
        } else if (!regexEmail.test(correoContacto.value.trim())) {
            mostrarError("errorCorreo", "Ingresa un correo válido.");
            esValido = false;
        }

        if (mensajeContacto.value.trim() === "") {
            mostrarError("errorMensaje", "Escribe un mensaje antes de enviar.");
            esValido = false;
        } else if (mensajeContacto.value.trim().length < 10) {
            mostrarError("errorMensaje", "Cuéntanos un poco más (mínimo 10 caracteres).");
            esValido = false;
        }

        if (esValido) {
            mensajeExitoContacto.textContent = "¡Gracias " + nombreContacto.value.trim() + "! Tu mensaje fue enviado.";
            mensajeExitoContacto.style.color = "green";
            formContacto.reset();
        }
    });
}