const express = require('express')
const router = express.Router()
const practiceController = require('../controllers/practice')

router.get('/', practiceController.startPractice)

module.exports = router