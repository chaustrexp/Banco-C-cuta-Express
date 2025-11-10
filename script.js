/* ========================================
   INTRO MODAL - Control con localStorage
   ======================================== */

// Función que se ejecuta cuando la página carga
document.addEventListener('DOMContentLoaded', function() {
    const introModal = document.getElementById('introModal');
    const btnIngresar = document.getElementById('btnIngresar');
    
    // Verificar si el usuario ya vio la intro anteriormente
    const introVisto = localStorage.getItem('introVisto');
    
    if (introVisto === 'true') {
        // Si ya vio la intro, ocultarla inmediatamente
        introModal.classList.add('hidden');
    } else {
        // Si es la primera vez, mostrar la intro
        introModal.style.display = 'flex';
    }
    
    // Evento al hacer clic en el botón "Ingresar al sitio"
    btnIngresar.addEventListener('click', function() {
        // Aplicar animación de salida (fade-out)
        introModal.classList.add('fade-out');
        
        // Guardar en localStorage que el usuario ya vio la intro
        localStorage.setItem('introVisto', 'true');
        
        // Después de la animación, ocultar completamente el modal
        setTimeout(function() {
            introModal.classList.add('hidden');
        }, 600); // 600ms coincide con la duración de la animación fadeOut
    });
});

/* ========================================
   NAVBAR - Menú hamburguesa y navegación
   ======================================== */

// Toggle del menú móvil
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Abrir/cerrar menú móvil
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        });
    }
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Conectar botón del navbar con modal de apertura
    const btnNavAbrirCuenta = document.getElementById('btnNavAbrirCuenta');
    if (btnNavAbrirCuenta) {
        btnNavAbrirCuenta.addEventListener('click', function() {
            const modalApertura = document.getElementById('modalAperturaCuenta');
            if (modalApertura) {
                modalApertura.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Cerrar menú móvil si está abierto
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
});

// Smooth scroll para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Manejo del formulario de contacto
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí puedes agregar la lógica para enviar el formulario
    alert('¡Gracias por contactarnos! Nos comunicaremos contigo pronto.');
    
    // Limpiar el formulario
    this.reset();
});

// Animación al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animación a las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.product-card, .service-card, .step-card, .branch-card, .testimonial-card, .feature-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Efecto parallax suave en el hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

/* ========================================
   SISTEMA DE APERTURA DE CUENTA
   ======================================== */

// Variables globales para el formulario
let currentStep = 1;
const totalSteps = 4;
const formData = {};

// Inicializar el sistema de apertura de cuenta
document.addEventListener('DOMContentLoaded', function() {
    const btnAbrirCuenta = document.getElementById('btnAbrirCuenta');
    const modalApertura = document.getElementById('modalAperturaCuenta');
    const btnCerrarModal = document.getElementById('btnCerrarModal');
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnEnviar = document.getElementById('btnEnviar');
    const formApertura = document.getElementById('formAperturaCuenta');
    
    // Abrir modal
    btnAbrirCuenta.addEventListener('click', function() {
        modalApertura.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Cerrar modal
    btnCerrarModal.addEventListener('click', cerrarModal);
    
    // Cerrar al hacer clic fuera del modal
    modalApertura.addEventListener('click', function(e) {
        if (e.target === modalApertura) {
            cerrarModal();
        }
    });
    
    // Navegación entre pasos
    btnAnterior.addEventListener('click', function() {
        if (currentStep > 1) {
            cambiarPaso(currentStep - 1);
        }
    });
    
    btnSiguiente.addEventListener('click', function() {
        if (validarPasoActual()) {
            if (currentStep < totalSteps) {
                cambiarPaso(currentStep + 1);
            }
        }
    });
    
    // Enviar formulario
    formApertura.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validarPasoActual()) {
            enviarSolicitud();
        }
    });
    
    // Validación en tiempo real
    agregarValidacionTiempoReal();
});

// Función para cerrar el modal
function cerrarModal() {
    const modalApertura = document.getElementById('modalAperturaCuenta');
    modalApertura.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reiniciar formulario
    setTimeout(function() {
        document.getElementById('formAperturaCuenta').reset();
        cambiarPaso(1);
        document.getElementById('mensajeExito').style.display = 'none';
        document.getElementById('formAperturaCuenta').style.display = 'block';
    }, 300);
}

// Función para cambiar de paso
function cambiarPaso(nuevoPaso) {
    // Ocultar paso actual
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
    
    // Marcar pasos completados
    if (nuevoPaso > currentStep) {
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');
    }
    
    // Mostrar nuevo paso
    currentStep = nuevoPaso;
    document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
    document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');
    
    // Actualizar botones
    actualizarBotones();
    
    // Si es el paso de confirmación, mostrar resumen
    if (currentStep === 4) {
        mostrarResumen();
    }
}

// Función para actualizar botones de navegación
function actualizarBotones() {
    const btnAnterior = document.getElementById('btnAnterior');
    const btnSiguiente = document.getElementById('btnSiguiente');
    const btnEnviar = document.getElementById('btnEnviar');
    
    // Mostrar/ocultar botón anterior
    btnAnterior.style.display = currentStep === 1 ? 'none' : 'block';
    
    // Mostrar/ocultar botones siguiente y enviar
    if (currentStep === totalSteps) {
        btnSiguiente.style.display = 'none';
        btnEnviar.style.display = 'block';
    } else {
        btnSiguiente.style.display = 'block';
        btnEnviar.style.display = 'none';
    }
}

// Función para validar el paso actual
function validarPasoActual() {
    const pasoActual = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const campos = pasoActual.querySelectorAll('input[required], select[required]');
    let valido = true;
    
    campos.forEach(campo => {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });
    
    // Validación especial para tipo de cuenta
    if (currentStep === 3) {
        const tipoCuentaSeleccionada = document.querySelector('input[name="tipoCuenta"]:checked');
        if (!tipoCuentaSeleccionada) {
            document.getElementById('errorTipoCuenta').textContent = 'Debes seleccionar un tipo de cuenta';
            valido = false;
        } else {
            document.getElementById('errorTipoCuenta').textContent = '';
        }
    }
    
    // Validación de términos y condiciones
    if (currentStep === 4) {
        const aceptoTerminos = document.getElementById('aceptoTerminos');
        if (!aceptoTerminos.checked) {
            mostrarError(aceptoTerminos, 'Debes aceptar los términos y condiciones');
            valido = false;
        }
    }
    
    return valido;
}

// Función para validar un campo individual
function validarCampo(campo) {
    const valor = campo.value.trim();
    let valido = true;
    let mensaje = '';
    
    // Validar campo vacío
    if (campo.hasAttribute('required') && !valor) {
        mensaje = 'Este campo es obligatorio';
        valido = false;
    }
    
    // Validaciones específicas por tipo
    if (valor && valido) {
        switch (campo.id) {
            case 'numeroDocumento':
                if (!/^\d{6,10}$/.test(valor)) {
                    mensaje = 'Número de documento inválido (6-10 dígitos)';
                    valido = false;
                }
                break;
            case 'email':
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                    mensaje = 'Correo electrónico inválido';
                    valido = false;
                }
                break;
            case 'celular':
                if (!/^\d{10}$/.test(valor)) {
                    mensaje = 'Número de celular inválido (10 dígitos)';
                    valido = false;
                }
                break;
            case 'fechaNacimiento':
                const fecha = new Date(valor);
                const hoy = new Date();
                const edad = hoy.getFullYear() - fecha.getFullYear();
                if (edad < 18) {
                    mensaje = 'Debes ser mayor de 18 años';
                    valido = false;
                }
                break;
        }
    }
    
    if (!valido) {
        mostrarError(campo, mensaje);
    } else {
        limpiarError(campo);
    }
    
    return valido;
}

// Función para mostrar error en un campo
function mostrarError(campo, mensaje) {
    campo.classList.add('error');
    const errorElement = campo.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = mensaje;
    }
}

// Función para limpiar error de un campo
function limpiarError(campo) {
    campo.classList.remove('error');
    const errorElement = campo.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

// Función para agregar validación en tiempo real
function agregarValidacionTiempoReal() {
    const campos = document.querySelectorAll('#formAperturaCuenta input, #formAperturaCuenta select');
    
    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            if (this.value.trim()) {
                validarCampo(this);
            }
        });
        
        campo.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                limpiarError(this);
            }
        });
    });
}

// Función para mostrar resumen en el paso de confirmación
function mostrarResumen() {
    // Recopilar datos del formulario
    const nombres = document.getElementById('nombres').value;
    const apellidos = document.getElementById('apellidos').value;
    const tipoDoc = document.getElementById('tipoDocumento').value;
    const numeroDoc = document.getElementById('numeroDocumento').value;
    const fechaNac = document.getElementById('fechaNacimiento').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const direccion = document.getElementById('direccion').value;
    const ciudad = document.getElementById('ciudad').value;
    const departamento = document.getElementById('departamento').value;
    const tipoCuenta = document.querySelector('input[name="tipoCuenta"]:checked').value;
    
    // Mostrar en el resumen
    document.getElementById('confirmNombre').textContent = `${nombres} ${apellidos}`;
    document.getElementById('confirmDocumento').textContent = `${tipoDoc} ${numeroDoc}`;
    document.getElementById('confirmFecha').textContent = new Date(fechaNac).toLocaleDateString('es-CO');
    document.getElementById('confirmEmail').textContent = email;
    document.getElementById('confirmCelular').textContent = celular;
    document.getElementById('confirmDireccion').textContent = `${direccion}, ${ciudad}, ${departamento}`;
    document.getElementById('confirmCuenta').textContent = tipoCuenta === 'ahorros' ? 'Cuenta de Ahorros' : 'Cuenta Semilla';
    
    // Guardar en objeto formData
    formData.nombres = nombres;
    formData.apellidos = apellidos;
    formData.tipoDocumento = tipoDoc;
    formData.numeroDocumento = numeroDoc;
    formData.fechaNacimiento = fechaNac;
    formData.email = email;
    formData.celular = celular;
    formData.direccion = direccion;
    formData.ciudad = ciudad;
    formData.departamento = departamento;
    formData.tipoCuenta = tipoCuenta;
}

// Función para enviar la solicitud
function enviarSolicitud() {
    // Generar número de solicitud único
    const numeroSolicitud = 'BCE-' + Date.now().toString().slice(-8);
    
    // Agregar fecha de solicitud
    formData.fechaSolicitud = new Date().toISOString();
    formData.numeroSolicitud = numeroSolicitud;
    formData.estado = 'Pendiente';
    
    // Guardar en localStorage
    let solicitudes = JSON.parse(localStorage.getItem('solicitudesApertura') || '[]');
    solicitudes.push(formData);
    localStorage.setItem('solicitudesApertura', JSON.stringify(solicitudes));
    
    // Mostrar mensaje de éxito
    document.getElementById('formAperturaCuenta').style.display = 'none';
    document.getElementById('mensajeExito').style.display = 'block';
    document.getElementById('numeroSolicitud').textContent = numeroSolicitud;
    
    // Botón para cerrar después del éxito
    document.getElementById('btnCerrarExito').addEventListener('click', cerrarModal);
    
    console.log('Solicitud guardada:', formData);
}

// Función para ver solicitudes guardadas (para administración)
function verSolicitudesGuardadas() {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudesApertura') || '[]');
    console.table(solicitudes);
    return solicitudes;
}

// Hacer la función disponible globalmente para debugging
window.verSolicitudesGuardadas = verSolicitudesGuardadas;

/* ========================================
   ALERTA DEL BANCO
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const alertaBanco = document.getElementById('alertaBanco');
    const btnCerrarAlerta = document.getElementById('btnCerrarAlerta');
    
    // Verificar si la alerta ya fue cerrada
    const alertaCerrada = localStorage.getItem('alertaBancoCerrada');
    
    if (alertaCerrada === 'true') {
        alertaBanco.classList.add('hidden');
    }
    
    // Cerrar alerta
    if (btnCerrarAlerta) {
        btnCerrarAlerta.addEventListener('click', function() {
            alertaBanco.classList.add('hidden');
            localStorage.setItem('alertaBancoCerrada', 'true');
        });
    }
});

/* ========================================
   PORTAL DEL CLIENTE / LOGIN
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');
    const loginPassword = document.getElementById('loginPassword');
    
    // Toggle mostrar/ocultar contraseña
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const type = loginPassword.getAttribute('type') === 'password' ? 'text' : 'password';
            loginPassword.setAttribute('type', type);
            
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    }
    
    // Manejo del formulario de login
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usuario = document.getElementById('loginUsuario').value;
            const password = document.getElementById('loginPassword').value;
            
            // Simulación de login (en producción esto se conectaría a un backend)
            console.log('Intento de login:', { usuario, password: '***' });
            
            alert('Funcionalidad de login en desarrollo. En producción, esto se conectaría a un servidor seguro.');
        });
    }
});

/* ========================================
   SIMULADORES FINANCIEROS
   ======================================== */

// Simulador de CDT
document.addEventListener('DOMContentLoaded', function() {
    const formCDT = document.getElementById('formCDT');
    
    if (formCDT) {
        formCDT.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const monto = parseFloat(document.getElementById('montoCDT').value);
            const plazoSelect = document.getElementById('plazoCDT');
            const plazo = parseInt(plazoSelect.value);
            
            // Obtener tasa según el plazo
            let tasa = 0;
            switch(plazo) {
                case 90: tasa = 0.045; break;
                case 180: tasa = 0.052; break;
                case 360: tasa = 0.060; break;
                case 540: tasa = 0.065; break;
            }
            
            // Calcular intereses
            const intereses = monto * tasa * (plazo / 360);
            const total = monto + intereses;
            
            // Mostrar resultados
            document.getElementById('cdtMonto').textContent = formatCurrency(monto);
            document.getElementById('cdtIntereses').textContent = formatCurrency(intereses);
            document.getElementById('cdtTotal').textContent = formatCurrency(total);
            document.getElementById('resultadoCDT').style.display = 'block';
        });
    }
});

// Simulador de Préstamo
document.addEventListener('DOMContentLoaded', function() {
    const formPrestamo = document.getElementById('formPrestamo');
    
    if (formPrestamo) {
        formPrestamo.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const monto = parseFloat(document.getElementById('montoPrestamo').value);
            const plazo = parseInt(document.getElementById('plazoPrestamo').value);
            const tasaMensual = parseFloat(document.getElementById('tasaPrestamo').value) / 100;
            
            // Calcular cuota usando fórmula de amortización
            const cuota = monto * (tasaMensual * Math.pow(1 + tasaMensual, plazo)) / (Math.pow(1 + tasaMensual, plazo) - 1);
            const totalPagar = cuota * plazo;
            const totalIntereses = totalPagar - monto;
            
            // Mostrar resultados
            document.getElementById('prestamoQuota').textContent = formatCurrency(cuota);
            document.getElementById('prestamoTotal').textContent = formatCurrency(totalPagar);
            document.getElementById('prestamoIntereses').textContent = formatCurrency(totalIntereses);
            document.getElementById('resultadoPrestamo').style.display = 'block';
        });
    }
});

// Simulador de Ahorro
document.addEventListener('DOMContentLoaded', function() {
    const formAhorro = document.getElementById('formAhorro');
    
    if (formAhorro) {
        formAhorro.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const montoMensual = parseFloat(document.getElementById('montoAhorro').value);
            const plazo = parseInt(document.getElementById('plazoAhorro').value);
            const tasaAnual = parseFloat(document.getElementById('tasaAhorro').value) / 100;
            const tasaMensual = tasaAnual / 12;
            
            // Calcular ahorro con interés compuesto
            let totalAhorrado = montoMensual * plazo;
            let totalConIntereses = 0;
            
            for (let i = 1; i <= plazo; i++) {
                totalConIntereses += montoMensual * Math.pow(1 + tasaMensual, plazo - i + 1);
            }
            
            const interesesGanados = totalConIntereses - totalAhorrado;
            
            // Mostrar resultados
            document.getElementById('ahorroTotal').textContent = formatCurrency(totalAhorrado);
            document.getElementById('ahorroIntereses').textContent = formatCurrency(interesesGanados);
            document.getElementById('ahorroFinal').textContent = formatCurrency(totalConIntereses);
            document.getElementById('resultadoAhorro').style.display = 'block';
        });
    }
});

// Función auxiliar para formatear moneda
function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(value);
}

/* ========================================
   PREGUNTAS FRECUENTES (FAQ)
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Cerrar todas las preguntas
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Abrir la pregunta clickeada si no estaba activa
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
});

/* ========================================
   BANNER DE COOKIES
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieBanner');
    const btnAceptarCookies = document.getElementById('btnAceptarCookies');
    const btnPoliticaCookies = document.getElementById('btnPoliticaCookies');
    
    // Verificar si el usuario ya aceptó las cookies
    const cookiesAceptadas = localStorage.getItem('cookiesAceptadas');
    
    if (cookiesAceptadas !== 'true') {
        // Mostrar banner después de 2 segundos
        setTimeout(function() {
            cookieBanner.style.display = 'block';
        }, 2000);
    } else {
        cookieBanner.classList.add('hidden');
    }
    
    // Aceptar cookies
    if (btnAceptarCookies) {
        btnAceptarCookies.addEventListener('click', function() {
            localStorage.setItem('cookiesAceptadas', 'true');
            cookieBanner.classList.add('hidden');
        });
    }
    
    // Ver políticas
    if (btnPoliticaCookies) {
        btnPoliticaCookies.addEventListener('click', function() {
            alert('Aquí se mostraría la política de cookies completa. En producción, esto abriría una página o modal con la información detallada.');
        });
    }
});

/* ========================================
   FUNCIONES AUXILIARES
   ======================================== */

// Función para limpiar localStorage (útil para testing)
function limpiarDatosLocales() {
    localStorage.removeItem('introVisto');
    localStorage.removeItem('alertaBancoCerrada');
    localStorage.removeItem('cookiesAceptadas');
    localStorage.removeItem('solicitudesApertura');
    console.log('Datos locales limpiados');
    location.reload();
}

// Hacer disponible globalmente para debugging
window.limpiarDatosLocales = limpiarDatosLocales;

// Función para ver todas las solicitudes de apertura
function verTodasLasSolicitudes() {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudesApertura') || '[]');
    if (solicitudes.length === 0) {
        console.log('No hay solicitudes registradas');
    } else {
        console.log(`Total de solicitudes: ${solicitudes.length}`);
        console.table(solicitudes);
    }
    return solicitudes;
}

window.verTodasLasSolicitudes = verTodasLasSolicitudes;

/* ========================================
   RECUPERACIÓN DE CONTRASEÑA
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const btnOlvidastePassword = document.getElementById('btnOlvidastePassword');
    const btnVolverLogin = document.getElementById('btnVolverLogin');
    const loginForm = document.getElementById('loginForm');
    const recuperarPasswordForm = document.getElementById('recuperarPasswordForm');
    const loginTitle = document.getElementById('loginTitle');
    
    // Mostrar formulario de recuperación
    if (btnOlvidastePassword) {
        btnOlvidastePassword.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            recuperarPasswordForm.style.display = 'block';
            loginTitle.textContent = 'Recuperar Contraseña';
        });
    }
    
    // Volver al formulario de login
    if (btnVolverLogin) {
        btnVolverLogin.addEventListener('click', function(e) {
            e.preventDefault();
            recuperarPasswordForm.style.display = 'none';
            loginForm.style.display = 'block';
            loginTitle.textContent = 'Iniciar Sesión';
        });
    }
    
    // Procesar recuperación de contraseña
    if (recuperarPasswordForm) {
        recuperarPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('recuperarEmail').value;
            
            // Simulación de envío de código
            alert(`Se ha enviado un código de recuperación a ${email}. Por favor revisa tu correo electrónico o mensajes de texto.`);
            
            // Volver al login
            recuperarPasswordForm.style.display = 'none';
            loginForm.style.display = 'block';
            loginTitle.textContent = 'Iniciar Sesión';
            recuperarPasswordForm.reset();
        });
    }
});

/* ========================================
   MODALES DE ARTÍCULOS DEL BLOG
   ======================================== */

function abrirModalArticulo(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalArticulo(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-articulo')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modalesActivos = document.querySelectorAll('.modal-articulo.active');
        modalesActivos.forEach(modal => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

/* ========================================
   VER MÁS ARTÍCULOS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const btnVerMasArticulos = document.getElementById('btnVerMasArticulos');
    const articulosAdicionales = document.getElementById('articulosAdicionales');
    
    if (btnVerMasArticulos && articulosAdicionales) {
        btnVerMasArticulos.addEventListener('click', function() {
            if (articulosAdicionales.style.display === 'none') {
                articulosAdicionales.style.display = 'grid';
                btnVerMasArticulos.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos artículos';
                
                // Scroll suave hacia los artículos adicionales
                setTimeout(() => {
                    articulosAdicionales.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                articulosAdicionales.style.display = 'none';
                btnVerMasArticulos.innerHTML = '<i class="fas fa-book-open"></i> Ver más artículos';
            }
        });
    }
});

/* ========================================
   DESCARGAR TARIFARIO
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const btnDescargarTarifas = document.getElementById('btnDescargarTarifas');
    
    if (btnDescargarTarifas) {
        btnDescargarTarifas.addEventListener('click', function() {
            // Crear un PDF simulado con información de tarifas
            const tarifasInfo = `
BANCO CÚCUTA EXPRESS
TARIFARIO OFICIAL - Diciembre 2024

═══════════════════════════════════════════════════════════

CUENTAS DE AHORRO
─────────────────────────────────────────────────────────
Cuenta de Ahorros
- Cuota de manejo: $0 primer año, $8.000 después
- Tasa de interés: 4.5% EA
- Comisiones: Sin comisiones

Cuenta Semilla
- Cuota de manejo: $0
- Tasa de interés: 3.0% EA
- Comisiones: Sin comisiones

═══════════════════════════════════════════════════════════

CDT DIGITAL
─────────────────────────────────────────────────────────
90 días: 4.5% EA
180 días: 5.2% EA
360 días: 6.0% EA
540 días: 6.5% EA

═══════════════════════════════════════════════════════════

PRÉSTAMOS PERSONALES
─────────────────────────────────────────────────────────
Tasa de interés: 1.5% - 2.5% MV
Comisión de estudio: 2% sobre monto
Plazos: 12 a 60 meses

═══════════════════════════════════════════════════════════

TARJETA DÉBITO
─────────────────────────────────────────────────────────
Cuota de manejo: $0
Retiros en cajeros BCE: $0
Retiros en otros bancos: $2.500

═══════════════════════════════════════════════════════════

TRANSFERENCIAS
─────────────────────────────────────────────────────────
Entre cuentas BCE: $0
A otros bancos: $3.500

═══════════════════════════════════════════════════════════

Nota: Las tarifas pueden variar según el perfil del cliente.
Para más información: 018000-123456
www.bancocucutaexpress.com
            `;
            
            // Crear un blob con el contenido
            const blob = new Blob([tarifasInfo], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            
            // Crear un enlace temporal y hacer clic en él
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Tarifario_Banco_Cucuta_Express_2024.txt';
            document.body.appendChild(a);
            a.click();
            
            // Limpiar
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            
            // Mostrar mensaje de confirmación
            alert('¡Tarifario descargado exitosamente! Revisa tu carpeta de descargas.');
        });
    }
});

/* ========================================
   CÓMO LLEGAR (GOOGLE MAPS)
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const btnComoLlegar = document.getElementById('btnComoLlegar');
    
    if (btnComoLlegar) {
        btnComoLlegar.addEventListener('click', function() {
            // Coordenadas de Cúcuta, Colombia (ejemplo)
            const lat = 7.8939;
            const lng = -72.5047;
            
            // Abrir Google Maps en una nueva pestaña con las direcciones
            const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
            window.open(googleMapsUrl, '_blank');
        });
    }
});

/* ========================================
   SISTEMA DE TEMA CLARO/OSCURO
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema guardado o detectar preferencia del sistema
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    } else {
        // Detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const defaultTheme = prefersDark ? 'dark' : 'light';
        html.setAttribute('data-theme', defaultTheme);
        updateThemeIcon(defaultTheme);
    }
    
    // Toggle de tema
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            // Aplicar nuevo tema
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            // Animación del botón
            this.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                this.style.transform = 'rotate(0deg)';
            }, 300);
        });
    }
    
    // Función para actualizar el icono del botón
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
        }
    }
    
    // Escuchar cambios en la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo aplicar si no hay tema guardado manualmente
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    });
});

/* ========================================
   FUNCIÓN PARA RESETEAR TEMA (DEBUG)
   ======================================== */

function resetearTema() {
    localStorage.removeItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = prefersDark ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', defaultTheme);
    console.log('Tema reseteado a:', defaultTheme);
    location.reload();
}

// Hacer disponible globalmente para debugging
window.resetearTema = resetearTema;

/* ========================================
   EFECTO DE SCROLL EN NAVBAR
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Agregar clase 'scrolled' cuando se hace scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
});

/* ========================================
   ANIMACIÓN DE ENTRADA PARA ELEMENTOS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse
    const animatedElements = document.querySelectorAll('.product-card, .service-card, .step-card, .branch-card, .testimonial-card, .feature-card, .blog-card, .simulator-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

/* ========================================
   BOTÓN SCROLL TO TOP
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Mostrar/ocultar botón según scroll
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll suave al hacer clic
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

/* ========================================
   MEJORAR ANIMACIONES DE ENTRADA
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase de animación a elementos cuando entran en viewport
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar secciones
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        fadeInObserver.observe(section);
    });
});

/* ========================================
   EFECTO DE TYPING EN HERO
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const heroDescription = document.querySelector('.hero-description');
    
    if (heroDescription) {
        const text = heroDescription.textContent;
        heroDescription.textContent = '';
        heroDescription.style.opacity = '1';
        
        let index = 0;
        const typingSpeed = 50;
        
        function typeText() {
            if (index < text.length) {
                heroDescription.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, typingSpeed);
            }
        }
        
        // Iniciar después de 1 segundo
        setTimeout(typeText, 1000);
    }
});

/* ========================================
   CONTADOR ANIMADO PARA NÚMEROS
   ======================================== */

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.round(target).toLocaleString('es-CO');
            clearInterval(timer);
        } else {
            element.textContent = Math.round(start).toLocaleString('es-CO');
        }
    }, 16);
}

/* ========================================
   EFECTO PARALLAX SUAVE
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-image, .hero-content');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('hero-image') ? 0.3 : 0.15;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
});

/* ========================================
   MEJORAR INTERACCIÓN DE FORMULARIOS
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Agregar efecto de focus
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
        
        // Agregar efecto de filled
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('input-filled');
            } else {
                this.classList.remove('input-filled');
            }
        });
    });
});

/* ========================================
   NOTIFICACIONES TOAST
   ======================================== */

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Hacer disponible globalmente
window.showToast = showToast;

/* ========================================
   MEJORAR EXPERIENCIA DE CARGA
   ======================================== */

window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Ocultar cualquier loader si existe
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

/* ========================================
   DETECTAR NAVEGACIÓN ACTIVA
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.parentElement.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
});

/* ========================================
   COPIAR AL PORTAPAPELES
   ======================================== */

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copiado al portapapeles', 'success');
    }).catch(() => {
        showToast('Error al copiar', 'error');
    });
}

window.copyToClipboard = copyToClipboard;

/* ========================================
   PREVENIR ZOOM EN INPUTS EN MÓVILES
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.fontSize = '16px';
            });
        });
    }
});
