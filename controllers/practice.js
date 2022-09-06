module.exports = {
    startPractice: async (req, res) => {
        console.log(req.user)
        try {
            res.render('practice.ejs')
        } catch (err) {
            console.log(err)
        }
    }
}