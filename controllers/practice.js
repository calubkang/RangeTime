const Score = require('../models/Score')

module.exports = {
    startPractice: async (req, res) => {
        console.log(req.user)
        try {
            const scores = await Score.find({ userId: req.user.id })
            let [teeAvg, approachAvg, sgAvg] = [0, 0, 0];
            if (scores.length <= 5) {
                scores.forEach(score => {
                    teeAvg += score.teeScore/scores.length;
                    approachAvg += score.approachScore/scores.length;
                    sgAvg += score.sgScore/scores.length;
                })
            } else {
                for (let i = scores.length - 1; i > scores.length - 6; i--) {
                    teeAvg += scores[i].teeScore/5;
                    approachAvg += scores[i].approachScore/5;
                    sgAvg += scores[i].sgScore/5;
                }
            }

            teeAvg = Math.round(teeAvg);
            approachAvg = Math.round(approachAvg);
            sgAvg = Math.round(sgAvg);
            
            res.render('practice.ejs', {teeAverage:teeAvg, approachAverage:approachAvg, sgAverage:sgAvg})
        } catch (err) {
            console.log(err)
        }
    }
}