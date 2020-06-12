db = require("../../users/userDb");

function verifyUserId(){
    return (req, res, next)=>{
        db.getById(req.params.id)
        .then(user =>{
        if(user){
        req.user = user
        next();
        }else{
           return res.status(404).json({errorMessage: "User does not exist"})
        }
        })
        .catch(error =>{
            next(error)
        })
}
}

function verifyName(){
    return (req, res, next) => {
        if(!req.body.name){
            res.status(500).json({errorMessage: "You need a name!"})
        }
        next();
    }
}

function verifyPost(){
    return (req, res, next) =>{
        if(!req.body.text){
            res.status(500).json({errorMessage: "You need text to post that!"})
        }
        next();
    }
}

module.exports ={
    verifyUserId,
    verifyName,
    verifyPost
}