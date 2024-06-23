const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/**
 * Schema: Defino como quiero que luscan mi coleccion
 */
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = model('User', UserSchema);
