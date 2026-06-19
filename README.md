# Cooperadora del ISFD "D. Lesteime"

Aplicacion web simple para registrar movimientos de entrada y salida de dinero de la cooperadora.

URL publica:

https://martin-juncos.github.io/Cooperadora/

## Que Hace

- Permite iniciar sesion con una cuenta de Google.
- Registra movimientos de `Entrada` y `Salida`.
- Envia los datos a un Web App de Google Apps Script.
- Guarda los movimientos en una hoja de Google Sheets llamada `2026`.
- Restringe el acceso a usuarios autorizados por email.

## Estructura

```text
.
|-- index.html        # Interfaz principal: login, usuario y formulario.
|-- styles.css        # Estilos responsive y sistema visual.
|-- script.js         # Login, autorizacion, tabs, payload y envio.
|-- manifest.webmanifest # Configuracion PWA instalable.
|-- sw.js             # Service worker para instalacion y cache basico.
|-- offline.html      # Pantalla cuando no hay conexion.
|-- assets/brand/     # Logo institucional usado en la aplicacion.
|-- icons/            # Iconos para Windows, Android e iOS.
|-- Apps Script.txt   # Codigo para Google Apps Script.
|-- AGENTS.md         # Contexto operativo para agentes.
`-- skills/           # Skills locales del proyecto.
```

## Como Usarlo

1. Abrir la URL publica.
2. Iniciar sesion con Google.
3. Elegir `Entrada` o `Salida`.
4. Completar los campos requeridos.
5. Registrar el movimiento.

## Instalar en Windows, Android e iOS

La app esta preparada como PWA. Eso permite instalarla desde navegadores compatibles sin pasar por una tienda de aplicaciones.

### Windows

En Microsoft Edge o Google Chrome:

1. Abrir https://martin-juncos.github.io/Cooperadora/
2. Buscar el icono de instalar en la barra de direcciones.
3. Elegir `Instalar`.
4. La app quedara disponible desde el menu Inicio.

### Android

En Google Chrome:

1. Abrir https://martin-juncos.github.io/Cooperadora/
2. Tocar el menu de tres puntos.
3. Elegir `Instalar app` o `Agregar a pantalla principal`.
4. Abrirla desde el icono de la pantalla principal.

### iPhone o iPad

En Safari:

1. Abrir https://martin-juncos.github.io/Cooperadora/
2. Tocar el boton de compartir.
3. Elegir `Agregar a pantalla de inicio`.
4. Confirmar el nombre `Cooperadora`.

En iOS, la instalacion funciona desde Safari. Otros navegadores pueden no mostrar la opcion del mismo modo.

## Reglas de Movimientos

### Entradas

Las entradas usan la fecha actual y se imputan automaticamente:

- `Biblioteca`: `Inscripciones`, `Cooperadora libreta`, `Título`, `Kiosco`.
- `Secretaria`: `Constancia de trabajo`, `Certificación de servicios`, `Otros`.

El campo `concepto` se guarda en minuscula en la planilla. Si se elige `Otros`, se guarda el texto escrito en `Otro concepto`.

### Salidas

Las salidas requieren:

- comprobante
- fecha
- razon social
- concepto
- monto

La fecha de salida se envia en formato `dd/mm/aaaa` y puede ser distinta de la columna `Date`, que Apps Script completa automaticamente al momento de recibir el movimiento.

## Usuarios Autorizados

La autorizacion se mantiene en dos lugares y ambos deben tener los mismos correos:

En `script.js`:

```js
const ALLOWED_EMAILS = new Set([
  "persona1@gmail.com",
  "persona2@gmail.com",
]);
```

En `Apps Script.txt`:

```js
const allowedEmails = [
  'persona1@gmail.com',
  'persona2@gmail.com',
]
```

Los correos deben estar en minusculas.

El frontend bloquea el acceso visualmente, pero la proteccion importante esta en Apps Script: valida el `google id token`, confirma el `googleClientId`, verifica el email y rechaza usuarios no autorizados antes de escribir en la hoja.

## Configuracion de Google

### Google OAuth

El Client ID se configura en `script.js`:

```js
const GOOGLE_CLIENT_ID = "...apps.googleusercontent.com";
```

Ese mismo Client ID debe coincidir con `googleClientId` en `Apps Script.txt`.

Para administrar origenes autorizados:

https://console.cloud.google.com/apis/credentials

### Apps Script

El archivo `Apps Script.txt` debe copiarse o sincronizarse manualmente en Google Apps Script.

Antes de usarlo:

1. Abrir la planilla de Google Sheets.
2. Pegar o actualizar el codigo en Apps Script.
3. Ejecutar `initialSetup()` una vez.
4. Publicar una nueva version del Web App.
5. Confirmar que `scriptUrl` en `script.js` apunte a la URL publicada.

## Desarrollo Local

No hay `package.json`, build step ni dependencias instalables.

Para servir la app localmente:

```powershell
py -m http.server 5500
```

Luego abrir:

```text
http://localhost:5500
```

Para verificar sintaxis de JavaScript:

```powershell
node --check script.js
```

Para validar sintaxis del archivo de Apps Script desde PowerShell:

```powershell
Get-Content -Raw "Apps Script.txt" | node --check --input-type=commonjs
```

## Notas Importantes

- `fetch` usa `mode: "no-cors"`, por lo que el navegador no puede leer la respuesta real de Apps Script.
- Mantener sincronizadas las listas de usuarios autorizados.
- No cambiar nombres de campos enviados al `FormData` sin revisar encabezados de Google Sheets.
- No subir secretos ni credenciales al repositorio.
- `GOOGLE_CLIENT_ID` no es secreto, pero debe coincidir con la configuracion OAuth correcta.
- La PWA puede abrir instalada en Windows, Android e iOS, pero registrar movimientos requiere conexion a internet.
- Si cambian iconos, nombre o colores de marca, actualizar `manifest.webmanifest`, `icons/` y los metadatos de `index.html`.
- El logo institucional principal vive en `assets/brand/logo_isfd.jpg` y se usa en la app y en la pantalla offline.

## Verificacion Recomendada

- Probar login con un usuario autorizado.
- Probar login con un usuario no autorizado.
- Registrar una entrada.
- Registrar una salida con fecha distinta a la actual.
- Confirmar que la hoja `2026` recibe `fecha`, `razon social`, `concepto`, `entrada`, `salida` y datos de usuario.
- Revisar el formulario en celular.
- Probar instalacion PWA en Chrome o Edge.
- En iOS, probar `Agregar a pantalla de inicio` desde Safari.

Hecho por el Profe Mercho con mucho ☕ y ♥️
