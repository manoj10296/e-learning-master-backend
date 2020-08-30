const express = require('express');
const User = require('../models/User');

const { 
  getAllUsers,
  createUser,
  login
} = require('../controllers/User')
const router = express.Router();

router.get('/', async (req, res) => {
  const result = await getAllUsers();
  console.log(result)
  res.sendStatus(200);
})

//Add user

router.post('/signUp', async(req, res) => {
  console.log('req',req.body)
  const result = await createUser(req.body)
  console.log(result)
  res.sendStatus(200)
})

router.post('/login', async( req, res ) => {
  const result = await login(req.body)
  console.log(result)
  res.sendStatus(200)
})

module.exports = router