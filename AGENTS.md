# AGENTS.md

## Alcance

Estas instrucciones aplican a todo el repositorio `Cooperadora`.

Este proyecto es una aplicación web simple para registrar movimientos de la cooperadora del ISFD "D. Lesteime". El frontend es estático y envía datos a un Web App de Google Apps Script, que a su vez escribe en una planilla de Google Sheets.

Prioridad de contexto:

1. Este `AGENTS.md` local.
2. Instrucciones globales del usuario.
3. Convenciones inferidas desde el código existente.

## Estructura del Proyecto

La raíz del proyecto contiene la app principal y una carpeta local para skills del proyecto. No hay bundler, framework frontend ni backend Node.

```text
.
|-- index.html        # Marcado de la app, vistas de login y formulario de movimientos.
|-- styles.css        # Estilos globales, variables CSS y responsive layout.
|-- script.js         # Lógica del frontend: login Google, tabs, validación básica y envío.
|-- Apps Script.txt   # Código para pegar/publicar en Google Apps Script.
|-- skills/           # Skills locales reutilizables para este proyecto.
`-- AGENTS.md         # Contexto operativo para agentes.
```

### `index.html`

- Define una app de una sola pantalla con dos estados:
  - `loginView`: ingreso con Google.
  - `appView`: formulario autenticado para registrar entradas y salidas.
- Carga dependencias externas por CDN:
  - SweetAlert2 desde `cdn.jsdelivr.net`.
  - Google Identity Services desde `accounts.google.com`.
- Usa IDs y clases que están acoplados a `script.js`; no renombrarlos sin actualizar la lógica.
- El formulario se identifica como `cooperadora-form`.

### `styles.css`

- Contiene todo el sistema visual del proyecto.
- Usa variables CSS en `:root` para colores base:
  - `--bg`
  - `--surface`
  - `--surface-soft`
  - `--text`
  - `--muted`
  - `--line`
  - `--primary`
  - `--primary-strong`
  - `--income`
  - `--expense`
  - `--warning-soft`
  - `--success-soft`
  - `--focus`
  - `--shadow`
- Usa `html { font-size: 62.5%; }`, por lo que `1.6rem` equivale aproximadamente a `16px`.
- El layout principal usa `width: min(100%, 880px)` y el login conserva un ancho máximo de `520px`.
- Hay breakpoints principales en `760px` y `420px`.

### `script.js`

- Contiene toda la lógica de aplicación en JavaScript moderno sin módulos.
- No usa imports, bundler ni transpilación.
- Maneja:
  - Google Sign-In.
  - Persistencia de sesión en `sessionStorage`.
  - Cambio entre tabs `Entrada` y `Salida`.
  - Campos requeridos según el tipo de movimiento.
  - Construcción del `FormData`.
  - Envío `POST` al Web App de Apps Script con `fetch` y `mode: "no-cors"`.
  - Feedback visual con SweetAlert2.
- Constantes importantes:
  - `GOOGLE_CLIENT_ID`: Client ID público de Google Identity Services.
  - `SESSION_KEY`: clave de sesión local.
  - `scriptUrl`: URL publicada del Web App de Apps Script.

### `Apps Script.txt`

- Es el código fuente del Web App de Google Apps Script.
- No se ejecuta dentro del navegador.
- Debe copiarse o sincronizarse manualmente en el editor de Apps Script correspondiente.
- Define:
  - `sheetName = '2026'`.
  - `initialSetup()`: guarda el ID de la planilla activa en Script Properties.
  - `doPost(e)`: recibe parámetros del frontend y agrega una fila a la hoja.
- Usa un lock (`LockService.getScriptLock()`) para reducir problemas de escritura concurrente.

### `skills/`

- Guarda skills locales del proyecto que futuras sesiones de Codex pueden leer y seguir.
- Cada skill real debe estar en una subcarpeta con un `SKILL.md`.
- La carpeta `skills/_template/` contiene una plantilla base para crear nuevas skills.
- Antes de usar una skill local, leer su `SKILL.md` y cargar solo referencias necesarias.
- No guardar secretos, credenciales ni tokens dentro de skills.

## Stack y Dependencias

Stack verificado:

- HTML estático.
- CSS global.
- JavaScript vanilla.
- Google Identity Services.
- SweetAlert2.
- Google Apps Script.
- Google Sheets como almacenamiento.

No hay:

- `package.json`.
- Vite, React, Next.js u otro framework.
- backend Node/Express.
- base de datos propia.
- tests automatizados.
- linter configurado.
- build step.

No introducir dependencias, framework o tooling pesado sin una razón concreta y explícita.

## Comandos Importantes

No existen scripts de npm porque el proyecto no tiene `package.json`.

Para servir la app localmente desde la raíz del repo:

```powershell
py -m http.server 5500
```

Luego abrir:

```text
http://localhost:5500
```

Notas:

- También puede abrirse `index.html` directamente, pero para Google Identity Services es preferible usar un origen `http://localhost`.
- El origen local debe estar permitido en la configuración OAuth del Client ID de Google si se quiere probar login real.
- El envío real depende de que `scriptUrl` apunte a una publicación vigente del Web App de Apps Script.

Comandos útiles de inspección:

```powershell
git status --short
git log --oneline -5
rg "texto-a-buscar"
```

Verificaciones manuales recomendadas antes de dar cambios por terminados:

1. Cargar la app en navegador.
2. Verificar que aparece el login de Google.
3. Iniciar sesión con una cuenta autorizada para el Client ID.
4. Registrar una entrada.
5. Registrar una salida.
6. Confirmar que la fila aparece en la hoja `2026`.
7. Confirmar que los campos de usuario llegan a la planilla.
8. Probar responsive en ancho móvil cercano a `420px`.

## Convenciones de Código

### JavaScript

- Usar `const` por defecto y `let` solo cuando el valor cambia.
- No usar `var`.
- Mantener funciones pequeñas y con nombres descriptivos.
- Seguir el estilo actual de funciones declaradas con `function nombre()`.
- Mantener JavaScript sin módulos mientras no exista un build step.
- Usar dobles comillas en `script.js`, como el código actual.
- Preferir guard clauses cuando simplifiquen la lectura.
- Mantener la lógica de UI en funciones explícitas:
  - `showLogin`
  - `showApp`
  - `setActiveTab`
  - `buildSheetPayload`
  - etc.
- No mezclar lógica de Google Auth, armado de payload y manipulación visual en bloques anónimos grandes si se agregan nuevas funciones.

### Google Apps Script

- Seguir el estilo actual de Apps Script:
  - `const` para referencias.
  - funciones `initialSetup` y `doPost`.
  - mapeo de filas a partir de los encabezados reales de la hoja.
- El script usa nombres de encabezados de la planilla como contrato dinámico.
- Si se agregan columnas, preferir extender el payload del frontend y dejar que `headers.map(...)` ubique valores por nombre.
- Mantener respuestas JSON con `ContentService`.
- Mantener el lock si se sigue escribiendo una fila por request.

### HTML

- Mantener IDs estables porque `script.js` usa `getElementById`.
- Mantener clases semánticas para estados:
  - `hidden`
  - `entrada-field`
  - `salida-field`
  - `entrada-copy`
  - `salida-copy`
  - `income-submit`
  - `expense-submit`
- Conservar atributos de accesibilidad existentes (`aria-label`, `aria-selected`) y actualizarlos si se agregan nuevas interacciones.
- Evitar agregar texto instructivo excesivo dentro de la UI; la app debe seguir siendo directa y operativa.

### CSS

- Usar variables de `:root` para colores compartidos.
- Mantener la estética sobria, clara y administrativa.
- Respetar el ancho máximo de la app salvo que el producto pida otra experiencia.
- Mantener responsive mobile-first en cambios nuevos.
- Evitar estilos inline.
- Evitar duplicar reglas cuando se pueda reutilizar una clase existente.

## Contrato Frontend - Google Sheets

El contrato más importante del proyecto es el nombre de los campos enviados en `buildSheetPayload()` y su correspondencia con los encabezados de Google Sheets.

Campos enviados actualmente:

```text
fecha
comprobante
razon social
concepto
entrada
salida
usuario
usuario email
usuario nombre
google id token
```

Reglas actuales:

- `fecha` se envía como `dd/mm/aaaa`.
- En entradas:
  - `fecha` se envía con la fecha actual del navegador.
  - `comprobante` se envía como `recibo`.
  - `razon social` se envía como `Biblioteca` para `Inscripciones`, `Cooperadora libreta`, `Título` y `Kiosco`.
  - `razon social` se envía como `Secretaria` para `Constancia de trabajo`, `Certificación de servicios` y `Otros`.
  - `concepto` recibe el concepto seleccionado; si el concepto es `Otros`, recibe el texto de `Otro concepto`.
  - `entrada` recibe el monto.
  - `salida` queda vacío.
- En salidas:
  - `fecha` sale del input de fecha de salida y puede ser distinta a la columna `Date` automática.
  - `comprobante` sale del select de comprobante.
  - `razon social` sale del campo de comercio.
  - `concepto` sale del detalle del gasto.
  - `salida` recibe el monto.
  - `entrada` queda vacío.
- `usuario`, `usuario email`, `usuario nombre` y `google id token` se derivan del login de Google.

El Apps Script:

- Lee los encabezados de la primera fila de la hoja.
- Normaliza cada encabezado con `trim()` y `toLowerCase()` para algunos casos especiales.
- Si el encabezado es `Date`, escribe `new Date()`.
- Si el encabezado normalizado es `fecha`, usa `params.fecha` o `new Date()`.
- Si el encabezado normalizado es `usuario`, usa `params.usuario`, `params['usuario nombre']` o `params['usuario email']`.
- Para el resto de columnas usa `params[header]` o `params[rawHeader]`.

Restricción crítica:

- No cambiar nombres de `payload.append(...)` sin verificar y ajustar encabezados de la planilla y Apps Script.

## Contexto de Negocio

La app registra movimientos de dinero de la cooperadora del ISFD "D. Lesteime".

Tipos de movimiento:

- `Entrada`: dinero que ingresa.
- `Salida`: dinero que egresa.

Conceptos actuales de entrada:

- `Inscripciones`
- `Cooperadora libreta`
- `Título`
- `Kiosco`
- `Constancia de trabajo`
- `Certificación de servicios`
- `Otros`

Reglas actuales de entrada:

- Requiere concepto.
- Si el concepto es `Otros`, se habilita y exige `Otro concepto`.
- Requiere monto.
- Usa comprobante fijo `recibo`.
- Usa razón social automática según el concepto:
  - `Biblioteca` para `Inscripciones`, `Cooperadora libreta`, `Título` y `Kiosco`.
  - `Secretaria` para `Constancia de trabajo`, `Certificación de servicios` y `Otros`.

Reglas actuales de salida:

- Requiere fecha.
- Requiere comprobante.
- Requiere razón social.
- Requiere concepto/detalle.
- Requiere monto.
- Los comprobantes disponibles son:
  - `Factura`
  - `Recibo`
  - `Remito`

Autenticación:

- El login se realiza con Google Identity Services.
- La sesión se guarda en `sessionStorage`, no en cookies ni backend propio.
- El frontend restringe acceso con `ALLOWED_EMAILS` en `script.js`.
- El Apps Script restringe escrituras con `allowedEmails` en `Apps Script.txt`.
- Ambas listas deben mantenerse sincronizadas manualmente.
- Los correos deben guardarse en minúsculas.
- El Apps Script valida el `google id token` contra Google y confirma que `aud` coincida con `googleClientId`.
- Si el token no es válido, el correo no está verificado o el correo no está permitido, `doPost(e)` responde `{ result: 'error', error: 'unauthorized' }` y no escribe la fila.

Implicación de seguridad:

- El bloqueo de frontend mejora la experiencia de usuario, pero la protección relevante está en Apps Script.
- Para autorizar o desautorizar usuarios, actualizar `ALLOWED_EMAILS` y `allowedEmails` con los mismos correos.
- `GOOGLE_CLIENT_ID` y `googleClientId` deben seguir apuntando al mismo OAuth Client ID.

## Restricciones y Patrones a Evitar

- No tocar `.git/`.
- No agregar secretos, tokens privados, credenciales o claves de servicio al repo.
- No tratar `GOOGLE_CLIENT_ID` como secreto: es un identificador público, pero no reemplazarlo sin confirmar configuración OAuth.
- No dejar `ALLOWED_EMAILS` y `allowedEmails` desincronizados.
- No reemplazar `scriptUrl` sin confirmar que el nuevo Web App esté publicado y accesible.
- No cambiar `sheetName = '2026'` sin confirmar que existe esa hoja en la planilla.
- No cambiar encabezados esperados de Google Sheets sin actualizar `buildSheetPayload()` y probar un envío real.
- No asumir que `fetch(..., { mode: "no-cors" })` permite leer la respuesta del Apps Script. En ese modo el navegador no expone el contenido de respuesta.
- No introducir React, Vite, Tailwind, TypeScript o backend Node solo para cambios menores.
- No convertir el proyecto a SPA con build step sin pedido explícito.
- No agregar dependencias CDN nuevas si una solución simple con HTML/CSS/JS alcanza.
- No romper los IDs usados por JavaScript:
  - `loginView`
  - `appView`
  - `loginHelp`
  - `googleSignInButton`
  - `userPicture`
  - `userName`
  - `userEmail`
  - `logoutButton`
  - `movementType`
  - `formContext`
  - `concepto`
  - `otroConcepto`
  - `otroConceptoField`
  - `comprobante`
  - `fechaSalida`
  - `razonSocial`
  - `conceptoSalida`
  - `monto`
- No quitar clases usadas por la lógica de tabs:
  - `.tab`
  - `.entrada-field`
  - `.salida-field`
  - `.entrada-copy`
  - `.salida-copy`
  - `.hidden`

## Calidad y Verificación

Como no hay tests ni build automatizado, la verificación debe ser manual y explícita.

Checklist mínimo para cambios de frontend:

- La página carga sin errores de consola.
- El botón de Google se renderiza.
- Login y logout funcionan.
- Las tabs `Entrada` y `Salida` alternan campos y labels correctamente.
- Los campos requeridos cambian según el tipo de movimiento.
- En `Salida`, el campo `Fecha` es requerido y se envía como `fecha` en formato `dd/mm/aaaa`.
- `Otros` muestra y exige el campo adicional.
- El botón de submit se deshabilita durante el envío y luego recupera texto correcto.
- SweetAlert2 muestra éxito o error según corresponda.
- La UI no se rompe en móvil.

Checklist mínimo para cambios de Apps Script:

- `initialSetup()` fue ejecutado al menos una vez en la planilla correcta.
- La propiedad `key` apunta al spreadsheet esperado.
- La hoja configurada en `sheetName` existe.
- La primera fila contiene encabezados compatibles con el payload.
- `doPost(e)` agrega una fila completa.
- Los errores devuelven JSON con `result: 'error'`.

## Flujo de Trabajo Recomendado

Para cambios pequeños:

1. Leer `index.html`, `script.js`, `styles.css` y, si el cambio toca persistencia, `Apps Script.txt`.
2. Identificar si el cambio afecta UI, payload o planilla.
3. Cambiar la mínima cantidad de archivos.
4. Probar manualmente en navegador.
5. Si afecta Apps Script, probar contra una planilla real o documentar que no fue posible verificarlo.

Para cambios de dominio:

1. Confirmar nuevas reglas de negocio.
2. Ajustar UI y validación.
3. Ajustar `buildSheetPayload()`.
4. Ajustar encabezados de Google Sheets o mapeo de Apps Script.
5. Probar un envío real.

Para cambios de autenticación:

1. Confirmar si se busca identificación simple o seguridad real.
2. Si se busca seguridad real, validar token de Google del lado servidor/Apps Script.
3. Definir si se permite cualquier Gmail o solo un dominio/lista de correos.

## Riesgos Conocidos

- `mode: "no-cors"` impide confirmar desde el frontend si Apps Script respondió con éxito real.
- La seguridad de autenticación es parcial porque el token se decodifica en frontend y no se valida en Apps Script.
- Los nombres de campos dependen de coincidencias con encabezados de Google Sheets.
- El destino de datos depende de una URL publicada externa (`scriptUrl`).
- No hay tests automatizados ni CI.
- No hay control de formato/lint.

## Cuándo Actualizar Este Archivo

Actualizar este `AGENTS.md` si ocurre cualquiera de estos cambios:

- Se agrega `package.json`, bundler o framework.
- Se reorganiza el proyecto en carpetas.
- Cambian los encabezados de la planilla.
- Cambia el Web App de Apps Script o su forma de despliegue.
- Se agregan roles, permisos o restricciones por correo/dominio.
- Se agregan tests, lint, build o CI.
- Se migra el almacenamiento fuera de Google Sheets.
