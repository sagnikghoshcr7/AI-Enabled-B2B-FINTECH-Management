const mongoose = require('mongoose')
const dotenv = require('dotenv').config() 
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4500;
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const User = require('./Models/user.js');

const users = []

mongoose.connect("mongodb://0.0.0.0:27017/UserData", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, e => console.error(e));


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


function run(req,res){

users.push(a);
console.log(a);
}

const initializePassport = require('./passport-config');
const user = require('./Models/user.js');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())

const secret = process.env.SESSION_SECRET ;

app.use(session({secret:secret, resave: false,
  saveUninitialized: false}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

app.get('/users', (req,res)=>{
  res.json(users)
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}
))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
  
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      referral: req.body.rcode,
    })
  /*  const awesome_instance = await new User({  name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      referral: req.body.rcode,
    });
    awesome_instance.save((err) => {
      if (err) return console.error(err);
      // saved!
    });*/
   const data = await User.create({ id: Date.now().toString(), name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      referral: req.body.rcode, }, function (err, awesome_instance) {
      if (err) return console.error(err);
      // saved!
    });

console.log("Done Registr")
res.redirect('/login')
  } catch {
    res.redirect('/register')
    console.log("failed")
  }
})



app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(PORT,()=>{
  console.log(`Server Running at ${PORT}`);
})