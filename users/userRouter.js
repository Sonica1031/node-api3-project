const express = require('express');

const router = express.Router();
const db = require("./userDb")
const verifyUser = require("../data/middleware/verifyUser");

router.post('/', verifyUser.verifyName(), (req, res, next) => {
  db.insert({name: req.body.name})
    .then(response => {
      res.status(200).json(response)
    })
    .catch(error => {
      next(error)
    })
});

router.post('/:id/posts', verifyUser.verifyUserId(), verifyUser.verifyPost(), (req, res, next) => {
  db.insertPost(req.body.text, req.user.id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/', (req, res, next) => {
  db.get()
  .then(response => {
    res.status(200).json(response)
  .catch(error => {
    next(error)
  })
  })
});

router.get('/:id', verifyUser.verifyUserId(),  (req, res) => {
  res.status(200).json(req.user)
});

router.get('/:id/posts', verifyUser.verifyUserId(), (req, res, next) => {
  db.getUserPosts(req.user.id)
  .then(response => {
    res.status(200).json(response)
  })
  .catch(error => 
    next(error)
    )
});

router.delete('/:id', verifyUser.verifyUserId(), (req, res) => {
  db.remove(req.user.id)
  .then(response =>{
  res.status(202).json(response)
  })
  .catch(error =>{
    next(error)
  })
});

router.put('/:id', verifyUser.verifyUserId(), verifyUser.verifyName(), (req, res, next) => {
  db.update(req.user.id, {name: req.body.name})
    .then(response =>{
      res.status(200).json(response)
    })
    .catch(error =>{
      next(error)
    })
});

module.exports = router;
