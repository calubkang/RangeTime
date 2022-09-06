const Score = require('../models/Score')

module.exports = {
    startRound: async (req, res) => {
        console.log(req.user)
        try {
            res.render('round.ejs')
        } catch (err) {
            console.log(err)
        }
    },

    createScore: async (req, res) => {
        try {
            await Score.create({
                teeScore: req.body.pTeeScore,
                approachScore: req.body.pApproachScore,
                sgScore: req.body.pSgScore,
                toPar: req.body.pToPar,
                userId: req.user.id,
            })
            console.log('Score has been added!')
            res.render('todos.ejs')
        } catch (err) {
            console.log(err)
        }
    },
}