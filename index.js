const express = require("express");
const server = express();
const postRouter = require("./posts/postRouter")
const userRouter = require("./users/userRouter");

server.use(express.json());
server.use('/post', postRouter);
server.use('/users', userRouter);
server.use((err, req, res, next) =>{
    console.log(err);
        res.status(500).json({errorMessage: "Something went wrong, Please try again later!"})
        next();
    }
)
server.listen(5000, () => console.log('API running on port 5000'))
