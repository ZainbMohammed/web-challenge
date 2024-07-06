require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");


mongoose.connect(config.connectionString,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, 
});

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());



const userRouter = require('./Routers/user.router');
const taskRouter = require('./Routers/task.router');

app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true,
//   allowedHeaders: 'Content-Type,Authorization',
// }));

app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer-when-downgrade');
  next();
});

app.use('/users',userRouter);
app.use('/tasks',taskRouter);

// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.listen(8000);

module.exports = app;
