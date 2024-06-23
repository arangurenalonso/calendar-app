const express = require('express');
require('dotenv').config();
const dbConnection = require('./src/infrastructure/Persistence/config/mongo.config.js');
const cors = require('cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler.js');
const app = express();
dbConnection();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());
app.use('/api', require('./src/presentation/routes/apiRoutes.js'));

app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
