const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  const result = await User.findAll();
  console.log(result)
  res.sendStatus(200);
})

//Add user

router.post('/', async(req, res) => {
  console.log('req',req.body)
  const result = await User.create({...req.body})
  console.log(result)
  res.sendStatus(200)
})


module.exports = router