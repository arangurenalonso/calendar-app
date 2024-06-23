# Crear el pachage.json con todas las configuraciones por defecto

```
npm init -y
```

# Packetes a instalar

---

## Nodemon

> Nodemon is a package that automatically restarts your server whenever changes
> are made to the project.

1. Instalar el packete

```
npm install nodemon
```

2. Agregamos un script para ejecutar el nodemon

```
 "scripts": {
     "dev": "nodemon index.js"
 }
```

3. Ejecutamos el packete

```
npm run dev
```

## Express

> Express is a fast and minimalist web application framework for Node.js, used
> to build robust and scalable web applications.

1. Instalar el packete

```
npm install express
```

2.  Creamos nuestra carpeta de archivos estaticos en la raiz que se va a llamar
    public

3.  Levantar un servidor de express

```
    const express = require('express');

    //Crear el servidor de Express
    const app = express();

    app.use(express.static('public'));

    //Lectura y parseo del body: Para que se pueda leer el body como un json
    app.use(express.json());

    //Definir Rutas
    app.get('/texto-plano', (req, res) => {
      //Retornamos un archivo de texto plano
      res.send('Hola Mundo');
    });

    app.get('/json', (req, res) => {
      //Retornamos un json
      res.json({
        nombre: 'Juan',
        edad: 25,
      });
    });
    // Escuchar Peticiones
    app.listen(4000, () => {
      //Callback que se va a ejecutar cuando el servidor de express este levantado
      console.log(`Servidor corriendo en puerto ${4000}`);
    });

```

### express.static('public')

    The express.static('public') function in Express.js is used to serve static
    files from a directory in your Node.js application. When you specify a
    folder, such as 'public', this function tells Express to look in that
    directory for files whenever a request comes in. It serves files like
    images, JavaScript, CSS, and HTML directly to the client without any further
    processing by the server.

    Here's how it works:

    1. Serving files: Any file stored in the 'public' directory can be accessed
       directly via a URL. For example, if you have an image file logo.png or
       style.css in the public directory, it can be accessed at
       http://localhost:4000/logo.png or http://localhost:4000/style.css
       respectively. By default, when you navigate to the root URL
       (http://localhost:4000/), Express will serve the index.html file from the
       public directory if it exists.
    2. Root folder: The argument 'public' specifies the root directory from
       which the files will be served. You can access these files directly using
       their filenames in the URL path.
    3. Middleware: express.static is a middleware function in Express.

### app.use()

app.use() is a method provided by the Express.js framework in Node.js. It is
used to mount specified middleware functions at a path which will be executed
for every incoming request.

- Middleware functions are functions that have access to the request object
  (req), the response object (res), and the next middleware function in the
  application’s request-response cycle. The next middleware function is commonly
  denoted by a variable named next.
- Create a new middleware

  ```
    app.use((req, res, next) => {
      console.log('Request URL:', req.originalUrl);
      next();
    });

  ```

## dotenv

> Load environment variables from .env file

1. Instalar el packete

```
npm install dotenv
```

2. Crear el archivo .env
   1. agregar el siguiente contenido
   ```
    PORT=4000
   ```
3. importar el dotenv en el index

```
require('dotenv').config();
```

4. utilizar las variables de entorno

```
process.env.<ENVIRONMENT_VARIABLE_NAME>

app.listen(process.env.PORT, () => {
  //Callback que se va a ejecutar cuando el servidor de express este levantado
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

```

## Express Valdiator

> Express Validator is a middleware for Express.js that provides validation and
> sanitization functions for incoming request data, helping to ensure data
> integrity and security in web applications.

1. Instalar el packete

```
npm install express-validator
```

2. Crear la siguiente estructura de carpeta, para separar la logica de
   validacion de la logica de negocio

```
src/
│
├── presentation/
│   ├── controllers/
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   └── validationHandler.js
│   │
│   ├── routes/
│   │   ├── user/
│   │   │   ├── validations/
│   │   │   │   └── updateUserValidation.js
│   │   │   └── user.route.js
│   │   └── apiRoutes.js
│
└── index.js


```

### Ejemplo del updateUserValidation

1. index.js

```
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(express.json());

//Definir las rutas
app.use('/api', require('./src/presentation/routes/apiRoutes.js'));

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});


```

2. apiRoutes.js

```
const express = require('express');
const router = express.Router();

router.use('/user', require('./user/user.route.js'));

module.exports = router;
```

3. user.route.js

```
const express = require('express');
const { updateUser } = require('../../controllers/user.controller');
const updateUserValidation = require('./validations/updateUserValidation');
const validationHandler = require('../../middlewares/validationHandler');

const router = express.Router();

router.put(
  '/:userId',
  updateUserValidation,
  validationHandler,
  async (req = express.request, res = express.response) => {
    await updateUser(req, res);
  }
);
module.exports = router;


```

4. updateUserValidation.js

```
const { body, check, param, query } = require('express-validator');

const updateUserValidation = [
  check('name', 'The name is required').not().isEmpty(),
  body('email').isEmail().withMessage('The email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  query('referrer')
    .optional()
    .isURL()
    .withMessage('The referrer must be a valid URL'),
  param('userId').isUUID().withMessage('The userId must be a valid UUID'),
];
module.exports = updateUserValidation;

```

- The body function is used to validate data contained within the body of the
  request. This is typically used for POST and PUT requests where the body
  contains JSON data or form data that need validation before processing..
- The query function is used to validate query parameters that come in the URL
  of the request. These parameters are optional and are often used to provide
  additional options in a GET request or in other types of requests.
- The param function is used to validate route parameters (path params). Route
  parameters are parts of the URL of the request used to identify a specific
  resource.
- The check function is more flexible and can validate data located in any part
  of the request, including the body, route parameters, query parameters, and
  headers.

5.  validationHandler.js

```
const { validationResult } = require('express-validator');

const validationHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validationHandler;

```

6. user.controller.js

```
const express = require('express');

const updateUser = async (req = express.request, res = express.response) => {
  const { body, params, query } = req;
  try {
    res.status(201).send({ message: 'updateUser', body, query, params });
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = {
  updateUser,
};

```

7. Request desde postman
   > Faltando algun parametro dará error

```
http://localhost:4000/api/user/27064566-812a-4d60-ad3d-deb20fcc3d85?referrer=https://www.google.com

body:
{
    "name":"Jose Alonso",
    "email":"aranguren.alonso@gmail.com",
    "password":"123456"
}
```

## Mongoose

> Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.

1. Instalar el packete

```
npm install mongoose
```

2. Estructura del proyecto

## bcryptjs

> bcryptjs is a library used for hashing and comparing passwords in Node.js
> applications, providing a secure way to store and authenticate user passwords.

1. Instalar el packete

```
npm install bcryptjs
```

2. .

## jsonwebtoken

> jsonwebtoken is a library used for generating and verifying JSON Web Tokens
> (JWTs) in Node.js applications, providing a secure way to authenticate and
> authorize users.

1. Instalar el packete

```
npm install jsonwebtoken
```

2. .

## cors

> The cors package is used to enable Cross-Origin Resource Sharing (CORS) in
> Node.js applications, allowing for secure communication between different
> domains.

1. Instalar el packete

```
npm install cors
```

2. .

## moment

1. Instalar el packete

```
npm install moment
```

2. .

# Estructura de Carpetas

```
/project-name
|-- node_modules/                  # Node.js packages
|-- src/                           # Source files
|-- index.js                       # Main application file
|-- public/                        # Static files like images, scripts, and stylesheets
|-- .env                           # Environment-specific variables
|-- package.json                   # Project manifest
|-- package-lock.json or yarn.lock # Lock file to lock the versions of npm/yarn packages
|-- README.md                      # Project description and instructions

```
