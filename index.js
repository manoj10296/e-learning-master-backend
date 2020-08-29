require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser')
const db = require('./config/database')

//Routes
const userRoutes = require('./routes/User')

const app = express();
const port = process.env.PORT | 5050;
app.use(bodyParser())

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