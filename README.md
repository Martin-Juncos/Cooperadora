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

## Verificacion Recomendada

- Probar login con un usuario autorizado.
- Probar login con un usuario no autorizado.
- Registrar una entrada.
- Registrar una salida con fecha distinta a la actual.
- Confirmar que la hoja `2026` recibe `fecha`, `razon social`, `concepto`, `entrada`, `salida` y datos de usuario.
- Revisar el formulario en celular.

Hecho por el Profe Mercho con mucho ☕ y ♥️
