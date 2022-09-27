const Todo = require('../models/Todo')

module.exports = {

    getTodos: async (req,res)=>{
        try{
            res.render('todos.ejs')
        }catch(err){
            console.log(err)
        }
    },

}    

