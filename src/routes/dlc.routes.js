const express = require('express');
const Player = require('../models/player');
const DataStateApp = require('../models/dataStateApp');
const router = express.Router();

// routes for update datble
router.get('/getData', async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/update/:id', async (req, res) => {
  const rta = await Player.findById({ _id: req.params.id });
  res.json(rta)
})

router.post('/postData', async (req, res) => {
  // 1. Extraemos todos los campos necesarios del cuerpo de la petición
  const { numCarrera, nombre, puntaje } = req.body;

  // 2. Creamos la instancia del modelo Player
  const data = new Player({
    numCarrera,
    nombre,
    puntaje
  });

  try {
    // 3. Guardamos en la base de datos local (liveDlc)
    const rta = await data.save();
    res.json({ status: 'Task Saved', data: rta });
  } catch (error) {
    // Manejo de errores por si falta algún campo
    res.status(400).json({ status: 'Error', message: error.message });
  }
});

// router.post('/postData', async(req, res) => {
//     const {nombre, puntaje} = req.body;
//     const data = new Player({
//       numCarrera,
//       nombre,
//       puntaje  
//     });
//     const rta = await data.save();
//     res.json({status: 'Task Saved'});
// })



// router.put('/:id', async (req, res) => {
//   const { numCarrera, nombre, puntaje } = req.body;
//   const newData = new Player({
//     numCarrera,
//     nombre,
//     puntaje
//   });
//   const rpta = await Player.findOneAndUpdate({ _id: req.params.id }, newData)
//   res.json({ rpta })
// })


router.put('/:id', async (req, res) => {
  const { numCarrera, nombre, puntaje } = req.body;
  const newData = {
    numCarrera,
    nombre,
    puntaje
  };

  try {

    const rpta = await Player.findByIdAndUpdate(req.params.id, newData, { new: true });
    res.json({ status: 'Jugador Actualizado', rpta });
  } catch (error) {
    res.status(400).json({ status: 'Error', message: error.message });
  }
});


router.post('/stateData', async (req, res) => {

  const { stateLive } = req.body

  const dataStateApp = new DataStateApp({
    stateLive
  })

  let rta = await dataStateApp.save()
  if (rta) {
    res.json({
      status: 'success'
    })
  } else {
    res.json({
      status: 'error'
    })
  }

})



router.get('/stateLive', async (req, res) => {
  const stateLive = await DataStateApp.find()
  if (stateLive) {
    res.json(stateLive);
  } else {
    res.json({ stateLive: error });
  }
})

module.exports = router;