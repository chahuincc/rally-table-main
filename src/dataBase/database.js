const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/liveDlc';

mongoose.connect(URI)
    .then(db => console.log('>>> DB is connected to:', db.connection.name))
    .catch(error => {
        console.error('>>> DB Connection Error:', error.message);
        console.error('Ensure MongoDB is running locally at mongodb://localhost/liveDlc');
    });

module.exports = mongoose;