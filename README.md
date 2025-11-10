# 🏦 Banco Cúcuta Express - Sitio Web Oficial

Sitio web moderno y profesional para Banco Cúcuta Express, diseñado con las últimas tecnologías web y enfocado en proporcionar una experiencia de usuario excepcional.

![Banco Cúcuta Express](https://img.shields.io/badge/Version-2.0-purple?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Características Principales

### 🎨 Diseño Moderno
- **Paleta de Colores Premium**: Púrpura (#7C3AED) y Dorado (#F59E0B)
- **Glassmorphism**: Efectos de vidrio esmerilado en cards y componentes
- **Gradientes Dinámicos**: Transiciones suaves entre colores
- **Animaciones Avanzadas**: Efectos de flotación, shimmer y transformaciones 3D

### 🌓 Tema Claro/Oscuro
- Cambio automático según preferencias del sistema
- Persistencia de selección del usuario
- Transiciones suaves entre temas
- Colores optimizados para cada modo

### 📱 Responsive Design
- Diseño adaptable a todos los dispositivos
- Mobile-first approach
- Menú hamburguesa para móviles
- Optimizado para tablets y desktop

### 🚀 Funcionalidades

#### Pantalla de Introducción
- Animación de bienvenida personalizada
- Logo animado con efectos de glow
- Barra de carga progresiva
- Se muestra solo en la primera visita

#### Secciones Principales
1. **Hero Section**: Presentación impactante con gradientes y animaciones
2. **Servicios**: 6 servicios bancarios con iconos animados
3. **Productos**: Tarjetas de crédito, cuentas y CDTs
4. **Abrir Cuenta**: Proceso de apertura digital paso a paso
5. **Inversiones**: Opciones de inversión con tasas competitivas
6. **Solicitudes**: Formularios para créditos y productos
7. **Estadísticas**: Contadores animados con datos del banco
8. **Contacto**: Formulario de contacto integrado

#### Modales Interactivos
- **Modal de Login**: Acceso a banca en línea
- **Modal de Productos**: Solicitud de productos financieros
- Validación de formularios en tiempo real
- Notificaciones visuales de estado

### 📧 Integración con Formspree
- Formulario de contacto funcional
- Formulario de solicitud de productos
- Envío asíncrono sin recargar página
- Validación de campos y emails
- Notificaciones de éxito/error

### 🤖 Asistente Virtual con VAPI AI
- Chat de voz con IA
- Transcripción en tiempo real
- Disponible 24/7
- Consentimiento de privacidad integrado

## 🛠️ Tecnologías Utilizadas

### Frontend
- **HTML5**: Estructura semántica
- **CSS3**: Estilos avanzados con variables CSS
- **JavaScript ES6+**: Funcionalidad moderna
- **Google Fonts**: Tipografía Inter

### Integraciones
- **Formspree**: Gestión de formularios
- **VAPI AI**: Asistente virtual por voz

### Características Técnicas
- **CSS Variables**: Temas dinámicos
- **Flexbox & Grid**: Layouts modernos
- **Intersection Observer**: Animaciones al scroll
- **LocalStorage**: Persistencia de datos
- **SessionStorage**: Gestión de sesión
- **Fetch API**: Peticiones asíncronas

## 📂 Estructura del Proyecto

```
banco-cucuta-express/
├── index.html          # Página principal
├── styles.css          # Estilos globales y temas
├── script.js           # Funcionalidad JavaScript
├── README.md           # Documentación
└── .vscode/
    └── settings.json   # Configuración del editor
```

## 🎨 Paleta de Colores

### Tema Claro
- **Primario**: `#7C3AED` (Púrpura)
- **Secundario**: `#A855F7` (Violeta)
- **Acento**: `#F59E0B` (Dorado)
- **Éxito**: `#10B981` (Verde)
- **Fondo**: `#FAF7FF` (Blanco Lavanda)

### Tema Oscuro
- **Primario**: `#C084FC` (Púrpura Claro)
- **Secundario**: `#DDD6FE` (Violeta Claro)
- **Acento**: `#FBBF24` (Dorado Claro)
- **Fondo**: `#0C0A1A` (Negro Púrpura)

## 🚀 Instalación y Uso

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)

### Instalación

1. **Clonar o descargar el proyecto**
```bash
git clone https://github.com/tu-usuario/banco-cucuta-express.git
cd banco-cucuta-express
```

2. **Abrir el proyecto**
```bash
# Con VS Code
code .

# O simplemente abrir index.html en tu navegador
```

3. **Configurar Formspree** (Opcional)
   - Reemplaza `xvgdoojj` con tu ID de Formspree en los formularios
   - Ubicación: `index.html` líneas con `action="https://formspree.io/f/..."`

4. **Configurar VAPI AI** (Opcional)
   - Reemplaza las claves en el widget VAPI
   - Ubicación: Final de `index.html`

### Desarrollo Local

Para desarrollo con live reload, puedes usar:

```bash
# Con Python
python -m http.server 8000

# Con Node.js (http-server)
npx http-server

# Con PHP
php -S localhost:8000
```

Luego abre: `http://localhost:8000`

## 📝 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --primary-color: #7C3AED;
    --secondary-color: #A855F7;
    --accent-color: #F59E0B;
    /* ... más variables */
}
```

### Modificar Contenido

1. **Textos**: Edita directamente en `index.html`
2. **Imágenes**: Reemplaza los SVG o agrega imágenes en una carpeta `/assets`
3. **Secciones**: Agrega o elimina secciones HTML según necesites

### Agregar Funcionalidades

Edita `script.js` para agregar nuevas funcionalidades:

```javascript
// Ejemplo: Nueva funcionalidad
function miFuncion() {
    // Tu código aquí
}
```

## 🎯 Funcionalidades Destacadas

### Sistema de Notificaciones
```javascript
showNotification('Mensaje', 'success'); // o 'error'
```

### Gestión de Modales
```javascript
openModal(modalElement);
closeModal(modalElement);
```

### Cambio de Tema
```javascript
toggleTheme(); // Cambia entre claro y oscuro
```

## 🔧 Configuración de VS Code

El proyecto incluye configuración optimizada para VS Code:

- Formateo automático al guardar
- Prettier configurado
- Extensiones recomendadas
- Snippets personalizados

## 📊 Rendimiento

- ⚡ Carga rápida: < 2 segundos
- 🎨 Animaciones suaves: 60 FPS
- 📱 Mobile-friendly: 100% responsive
- ♿ Accesible: WCAG 2.1 AA

## 🔒 Seguridad

- ✅ Validación de formularios
- ✅ Sanitización de inputs
- ✅ HTTPS recomendado
- ✅ Consentimiento de privacidad

## 🌐 Navegadores Soportados

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 📱 Características Móviles

- Menú hamburguesa animado
- Touch-friendly buttons
- Optimización de imágenes
- Viewport adaptable

## 🎓 Mejores Prácticas

- ✅ Código semántico HTML5
- ✅ CSS modular y reutilizable
- ✅ JavaScript moderno (ES6+)
- ✅ Comentarios descriptivos
- ✅ Nombres de variables claros

## 🐛 Solución de Problemas

### El tema no cambia
- Verifica que JavaScript esté habilitado
- Limpia el localStorage del navegador

### Los formularios no envían
- Verifica tu conexión a internet
- Confirma que Formspree esté configurado

### Animaciones lentas
- Reduce el número de elementos animados
- Desactiva animaciones en `prefers-reduced-motion`

## 📈 Roadmap

- [ ] Panel de administración
- [ ] Integración con API bancaria
- [ ] App móvil nativa
- [ ] Chatbot avanzado
- [ ] Calculadoras financieras
- [ ] Blog de noticias

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de Banco Cúcuta Express. Todos los derechos reservados.

## 👥 Autores

- **Banco Cúcuta Express** - *Desarrollo inicial* - [Website](https://bancocucutaexpress.com)

## 🙏 Agradecimientos

- Google Fonts por la tipografía Inter
- Formspree por la gestión de formularios
- VAPI AI por el asistente virtual
- Comunidad de desarrolladores web

## 📞 Contacto

- **Website**: https://bancocucutaexpress.com
- **Email**: contacto@bancocucutaexpress.com
- **Teléfono**: 018000 123 456
- **Dirección**: Av. Gran Colombia #10-20, Cúcuta, Colombia

---

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

**Hecho con 💜 por Banco Cúcuta Express**
