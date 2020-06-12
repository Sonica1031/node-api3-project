const express = require('express');
const db = require("../posts/postDb");
const postMiddleware = require("../data/middleware/verifyPost");


const router = express.Router();

router.get('/', (req, res) => {
  db.get()
    .then(response =>{
      res.status(200).json(response)
    .catch(error => {
      next(error);
    })
    })
});

router.get('/:id', postMiddleware.verifyPost(), (req, res) => {
     res.status(200).json(req.post)
});

router.delete('/:id', postMiddleware.verifyPost(), (req, res) => {
  db.remove(req.post.id)
    .then(response =>{
      res.status(202).json(response)
    })
    .catch(error =>
      next(error)
      )
});

router.put('/:id', postMiddleware.verifyPost(), postMiddleware.verifyBody(), (req, res, next) => {
  db.update(req.post.id, {text: req.body.text})
    .then(response =>{
      res.status(200).json(response)
    })
    .catch(error =>
      next(error)
      )
});

module.exports = router;
