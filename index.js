
const express = require('express')
const morgan = require('morgan');
const path = require('path')
const { mongoose } = require('./src/dataBase/database');
const Player = require('./src/models/player')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(morgan('dev')); // ver en mi consola, las peticiones 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'src/public')))
app.use(express.urlencoded({ extended: false }))

app.use('', require('./src/routes/dlc.routes'))

app.get('/admin', (req, res) => {
    res.redirect('/#/admin');
});

const server = app.listen(app.get('port'), () => {
    console.log(`active server, ${app.get('port')}`)
})

const socketIo = require('socket.io');
const io = socketIo(server)

// web socket 
io.on('connection', async (socket) => {

    socket.on('message', async () => {
        const data = await Player.find();
        io.emit('message', data)
    })

    socket.on('activeLive', async (a) => {
        io.emit('activeLive', a)
    })

});
