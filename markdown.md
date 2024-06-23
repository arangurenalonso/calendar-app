Abrir la vista previa

```
CTRL + SHIFT + V
```

# Configurar para que no se formatee por defecto

1. Instalar la extencion para formatear prettier

2. Ejecutamos el short cut

```
Ctrl + Shift + P
```

3. Buscamos en el cuadro de dialogo

Preferences: Open Settings (JSON)

4. Agregamos la siguiente linea

```
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true,
    "prettier.proseWrap": "always" // Asegúrate de que Prettier maneje correctamente el texto
  }

```

# Encabezado 1

## Encabezado 2

### Encabezado 3

#### Encabezado 4

##### Encabezado 5

###### Encabezado 6

# Cambios en el diseño de la palabra

Negrita: **negrita**

Cursiva: _cursiva_

Subrayado: <u>Texto subrayado</u>

Cambiar el color: <span style="color: red;">Texto rojo</span>

potencia: $e^{\pi i} + 1 = 0$

# Listas no ordenadas

- Elemento 1
- Elemento 2
- Elemento 3

# Listas ordenadas

1. Primer elemento
2. Segundo elemento
3. Tercer elemento

# Nested list (Con Tab)

1. The Fellowship of the Ring
   1. The Ring Sets Out
   2. The Ring Goes South
2. The Two Towers
   1. The Treason of Isengard
   2. The Ring Goes East

# Lista de Tareas

- [x] bread

- [ ] milk

- [x] eggs

- [ ] teabags

# Enlaces

[Google](https://www.google.com)

# Imagenes

![Texto alternativo](url_de_la_imagen.jpg)

# Citas

> Esto es una cita.

# Codigo Inline

`código`

# Codigo multilinea

```html
<html>
  <body>
    <h1>Hola Mundo</h1>
  </body>
</html>
```

# Tablas

| Encabezado 1 | Encabezado 2 |
| ------------ | ------------ |
| Texto 1      | Texto 2      |
| Texto 3      | Texto 4      |

# Tablas complejas

<table>
  <tr>
    <th>Encabezado 1</th>
    <th>Encabezado 2</th>
  </tr>
  <tr>
    <td>Dato 1</td>
    <td>Dato 2</td>
  </tr>
  <tr>
    <td colspan="2">Dato 3 con fusión de celdas</td>
  </tr>
</table>

# Lineas Horizontales

---
