const mongoose = require('mongoose')

const ScoreSchema = new mongoose.Schema({
    teeScore: {
        type: Number,
        required: true,
    },
    approachScore: {
        type: Number,
        required: true,
    },
    sgScore: {
        type: Number,
        required: true,
    },
    toPar: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
})


module.exports = mongoose.model('Score', ScoreSchema, 'Users_Score')