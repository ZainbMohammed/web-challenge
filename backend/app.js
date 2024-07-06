require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config.json");
const userRouter = require('./Routers/user.router');
const taskRouter = require('./Routers/task.router');


mongoose.connect(config.connectionString,{
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, 
});

const app = express();

app.use(cors());   
app.use(express.json());
// app.use((req, res, next) => {
//   res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
//   next();
// });

app.use('/users',userRouter);
app.use('/tasks',taskRouter);

app.listen(8000);

module.exports = app;
