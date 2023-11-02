require('dotenv').config();
const express  = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const testConnection = require('./testConnection');
const UserRouter = require('./routes/user.router');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())
app.use('/', UserRouter);

const PORT = process.env.API_PORT ?? 5000;
(async function checkAndRun() {
  await testConnection(); // squelize ok ?
  try {
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
  } catch (e) {
    console.log(e); //какая-то другая жопа
  }
}()); // самовызов