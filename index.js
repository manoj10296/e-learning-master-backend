require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/database')
global.fetch = require('node-fetch');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const config = require('./config/config.json')

//Routes
const userRoutes = require('./routes/User')

const app = express();
// global = {};

global.poolData = {
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.clientId
}

global.userPool = new AmazonCognitoIdentity.CognitoUserPool(global.poolData)

const port = process.env.PORT | 5050;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/user', userRoutes)

db.authenticate()
  .then(() => console.log('database connected'))
  .catch((err) => console.log(`Error + ${err}`))

app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})