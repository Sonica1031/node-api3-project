db = require("../../posts/postDb");

function verifyPost(){
    return (req, res, next)=>{
        db.getById(req.params.id)
        .then(post =>{
        if(post){
        req.post = post
        next();
        }else{
           return res.status(404).json({errorMessage: "Post does not exist"})
        }
        })
        .catch(error =>{
            next(error)
        })
}
}

function verifyBody(){
    return (req, res, next) => {
        if(!req.body.text){
            res.status(500).json({errorMessage: "You need text to post!"})
        }
        next();
    }
}

module.exports ={
    verifyPost,
    verifyBody
}