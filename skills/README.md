# Skills Locales del Proyecto

Esta carpeta guarda skills propias del proyecto `Cooperadora`.

Las skills de esta carpeta sirven como conocimiento reutilizable para futuras sesiones de Codex. No reemplazan el `AGENTS.md`; lo complementan con flujos especificos que se repiten o que tienen reglas delicadas.

## Estructura Esperada

Cada skill debe vivir en su propia carpeta:

```text
skills/
|-- nombre-de-la-skill/
|   |-- SKILL.md
|   |-- references/   # opcional
|   |-- scripts/      # opcional
|   `-- assets/       # opcional
`-- _template/
    `-- SKILL.md
```

## Reglas

- Usar nombres en minusculas, numeros y guiones: `registrar-movimientos`, `apps-script-sheets`.
- Cada skill real debe tener un `SKILL.md`.
- El `SKILL.md` debe comenzar con frontmatter YAML con `name` y `description`.
- La descripcion debe decir claramente cuando se usa la skill.
- Mantener el cuerpo corto y operativo.
- Poner detalles largos en `references/` y mencionarlos desde `SKILL.md`.
- No guardar secretos, tokens, credenciales ni URLs privadas nuevas.
- No duplicar reglas generales del repo si ya estan en `AGENTS.md`.

## Plantilla

Copiar `skills/_template/` y renombrar la carpeta con el nombre de la nueva skill.

Despues, completar:

- `name`
- `description`
- objetivo
- disparadores de uso
- flujo de trabajo
- archivos o referencias relevantes
- verificaciones esperadas

## Uso por Agentes

Antes de usar una skill local:

1. Leer su `SKILL.md`.
2. Cargar solo las referencias necesarias.
3. Seguir el flujo indicado.
4. Si la skill queda desactualizada, actualizarla junto con `AGENTS.md` cuando corresponda.
