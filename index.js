require('dotenv').config();
const express = require('express')
const morgan = require('morgan');
const path = require('path')
const { mongoose } = require('./src/dataBase/database');
const Player = require('./src/models/player')
const Pusher = require('pusher');

const app = express()

const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true
});

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev')); // ver en mi consola, las peticiones 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(express.urlencoded({ extended: false }))

app.use('', require('./src/routes/dlc.routes'))

app.get('/admin', (req, res) => {
    res.redirect('/#/admin');
});

// Middleware to expose pusher to routes if needed
app.set('pusher', pusher);

const server = app.listen(app.get('port'), () => {
    console.log(`active server, ${app.get('port')}`)
})

// Enviar eventos a través de Pusher en lugar de WebSockets tradicionales
// Para mantener la compatibilidad con el frontend sin cambiar toda la lógica:
app.post('/trigger-message', async (req, res) => {
    const data = await Player.find();
    pusher.trigger('rally-channel', 'message', data);
    res.json({ status: 'ok' });
});

app.post('/trigger-active-live', (req, res) => {
    const { active } = req.body;
    pusher.trigger('rally-channel', 'activeLive', active);
    res.json({ status: 'ok' });
});
