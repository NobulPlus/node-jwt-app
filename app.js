const express = require('express');
const mongoose = require('mongoose');
const authRoutes  = require('./routes/authRoutes');
const cookieParser = require('cookie-parser')

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://adeleyepaul2:NobulPlus94@jwt.yn1qql7.mongodb.net/?retryWrites=true&w=majority&appName=JWT'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => {
    app.listen(3000)
    console.log("Database is connected");
  }).catch((err) => {
    console.error('Error connecting to database', err);
  });
 // routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('newUser', false, { maxAge: 900000, httpOnly: true});
  res.send('you get the cookies here');
})

app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies)
})