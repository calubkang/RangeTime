const express = require('express')
const router = express.Router()
const roundController = require('../controllers/round')

router.get('/', roundController.startRound)

router.post('/createScore', roundController.createScore)

module.exports = router 