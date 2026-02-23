const mongoose = require('mongoose');
const { Schema } = mongoose;

const DataStateApp = new Schema({
    stateLive: {type: Boolean, require: true}
});

module.exports = mongoose.model('DataStateApp', DataStateApp);