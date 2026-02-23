const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlayerSchema = new Schema({
    numCarrera: { type: Number, required: true },
    nombre: { type: String, required: true },
    puntaje: { type: Number, required: true },
});

module.exports = mongoose.model('Player', PlayerSchema);