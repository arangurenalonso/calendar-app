const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongodb.kxp8stv.mongodb.net/${process.env.DB_NAME}`
    );
    console.log('Database connected');
  } catch (error) {
    console.log('Error connecting to the database: ', error.message);
    throw new Error('Error connecting to the database');
  }
};

module.exports = dbConnection;
