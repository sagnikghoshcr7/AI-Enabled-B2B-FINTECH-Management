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



app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/images',express.static(__dirname + 'public/images'));
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



// fetching mongo db data
fetchdata();

async function fetchdata()
{
  const userData = await User.find().exec();
  for(let i=0; i<userData.length; i++)
  {
    users.push(userData[i]);
    // console.log(users)
  }
 
}

// passport js

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

const secret = process.env.SESSION_SECRET;

app.use(session({secret:secret, resave: false,
  saveUninitialized: false}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


// routes
app.get('/', checkAuthenticated, (req, res) => {
  res.render('index.ejs', { name: req.user.name })
  // console.log(" current id " + req.user.id);
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



app.get('/editpassword',checkAuthenticated,(req,res)=>{
  res.render('editpass.ejs');
})

app.post('/editpassword',checkAuthenticated,async(req,res)=>{
  console.log(req.body.newpass)
  const newpassword = await bcrypt.hash(req.body.newpass, 10)
  console.log(newpassword);
  res.redirect('/');
const display = await User.findOneAndUpdate({id: req.user.id},{password:newpassword},{new: true}); 
console.log(display);
req.user.password = newpassword;
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const ids = Date.now().toString();
    
  /*  const awesome_instance = await new User({  name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      referral: req.body.rcode,
    });
    awesome_instance.save((err) => {
      if (err) return console.error(err);
      // saved!
    });*/
   const data = await User.create({id: ids, name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      referral: req.body.rcode, }, function (err, awesome_instance) {
      if (err) return console.error(err);
      // saved!
    });

    users.push({
      id: ids,
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      referral: req.body.rcode,
    })

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

app.get('/edituserprofile',checkAuthenticated,(req,res)=>{
  res.render('edit.ejs');
})

app.post('/edituserprofile',checkAuthenticated, async(req,res,next)=>{
try {

const newname = req.body.namenew;
const newemail = req.body.emailnew;
const display = await User.findOneAndUpdate({id: req.user.id},{name:newname,email:newemail},{new: true}); 
req.user.name = newname;
req.user.email = newemail;
console.log(display);
res.redirect('/');
next();
} catch (error) {
  res.sendStatus(500);
}
  
})

app.listen(PORT,()=>{
  console.log(`Server Running at ${PORT}`);
})