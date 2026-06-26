# Cooperadora del ISFD "D. Lesteime"

Aplicación web para registrar movimientos de entrada y salida de dinero de la cooperadora escolar. Funciona desde el navegador, no requiere instalación de software y está disponible como PWA instalable en cualquier dispositivo.

🔗 **[Abrir la aplicación](https://martin-juncos.github.io/Cooperadora/)**

---

## Qué hace

- Autenticación segura con cuenta de Google (solo usuarios autorizados por email).
- Registro de movimientos de **Entrada** y **Salida** con validación de campos.
- Envío de datos a una hoja de Google Sheets vía Google Apps Script.
- Funciona offline una vez instalada (muestra pantalla de aviso sin conexión).
- Instalable como app en Windows, Android e iOS sin pasar por ninguna tienda.

---

## Cómo usarla

1. Abrir la URL pública desde cualquier navegador.
2. Iniciar sesión con una cuenta de Google autorizada.
3. Elegir la pestaña **Entrada** o **Salida**.
4. Completar los campos del formulario.
5. Confirmar y registrar el movimiento.

Los datos quedan guardados automáticamente en la hoja `2026` de Google Sheets.

---

## Reglas de los movimientos

### Entradas

Se registran con la fecha actual y se asocian a una sección:

| Sección | Conceptos disponibles |
|---|---|
| Biblioteca | Inscripciones, Cooperadora libreta, Título, Kiosco |
| Secretaría | Constancia de trabajo, Certificación de servicios, Otros |

Si se elige **Otros**, se habilita un campo para escribir el concepto manualmente.

### Salidas

Requieren los siguientes campos obligatorios: comprobante, fecha, razón social, concepto y monto (mayor a $0). La fecha se envía en formato `dd/mm/aaaa` y puede ser distinta a la fecha actual.

---

## Instalar como app

### Windows (Chrome o Edge)
1. Abrir la URL en Chrome o Edge.
2. Hacer clic en el ícono de instalación en la barra de direcciones.
3. Elegir **Instalar**.

### Android (Chrome)
1. Abrir la URL en Chrome.
2. Tocar el menú de tres puntos.
3. Elegir **Instalar app** o **Agregar a pantalla principal**.

### iPhone / iPad (Safari)
1. Abrir la URL en Safari.
2. Tocar el botón de compartir.
3. Elegir **Agregar a pantalla de inicio**.

> En iOS la instalación solo funciona correctamente desde Safari.

---

## Estructura del proyecto

```
.
├── index.html              # Interfaz principal: login, header y formulario
├── styles.css              # Sistema visual completo y responsive
├── script.js               # Autenticación, sesión, UI, validación y envío
├── manifest.webmanifest    # Configuración PWA
├── sw.js                   # Service worker: cache e instalación offline
├── offline.html            # Pantalla cuando no hay conexión
├── apps-script.js          # Código para Google Apps Script (no se ejecuta localmente)
├── assets/brand/           # Logo institucional
└── icons/                  # Íconos para Windows, Android e iOS
```

---

## Configuración para adaptar el proyecto

### 1. Google OAuth — Client ID

En `script.js`:
```js
const GOOGLE_CLIENT_ID = "TU_CLIENT_ID.apps.googleusercontent.com";
```

El mismo valor debe estar en `apps-script.js`:
```js
const googleClientId = "TU_CLIENT_ID.apps.googleusercontent.com";
```

Para gestionar orígenes autorizados: [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

### 2. Usuarios autorizados

La lista de emails vive en `apps-script.js` como única fuente de verdad:
```js
const allowedEmails = [
  'persona1@gmail.com',
  'persona2@gmail.com',
];
```

Los emails deben ir en minúsculas. El Apps Script valida el token de Google y rechaza cualquier usuario no autorizado antes de escribir en la hoja.

### 3. Desplegar el Apps Script

1. Abrir la planilla de Google Sheets.
2. Ir a **Extensiones → Apps Script**.
3. Pegar el contenido de `apps-script.js`.
4. Ejecutar `initialSetup()` una vez.
5. Publicar una nueva versión del Web App.
6. Copiar la URL publicada y pegarla en `script.js`:
```js
const SCRIPT_URL = "https://script.google.com/macros/s/TU_URL/exec";
```

---

## Desarrollo local

Sin dependencias ni build step:

```bash
py -m http.server 5500
```

Abrir `http://localhost:5500`. El login con Google requiere que el origen esté autorizado en Google Cloud Console.

Para verificar sintaxis:
```bash
node --check script.js
```

---

## Notas

- Registrar movimientos requiere conexión a internet aunque la app esté instalada.
- No subir credenciales ni emails reales al repositorio.
- Si se modifica `styles.css` o `script.js`, incrementar `CACHE_NAME` en `sw.js` para forzar actualización en dispositivos con la app instalada.

---

*Hecho con mucho ☕ y ♥️ por el Profe Mercho*

---
