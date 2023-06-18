
const mongoose = require('mongoose')
const dotenv = require('dotenv').config() 

const express = require('express')
const app = express()

var multer = require('multer');

const PORT = process.env.PORT || 4500;

const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const User = require('./Models/user.js');
const Ticket = require('./Models/ticket.js');

// Require the cloudinary library
const cloudinary = require('cloudinary').v2;

// Return "https" URLs by setting secure: true
cloudinary.config({
  secure: true,
  cloud_name: 'dg3ufgyhh',
  api_key: '791971377994129',
  api_secret: 'AyozMd6dlfHJI3_1OMPMuhrUfk4',
  private_cdn: false,
  secure_distribution: null,
});



// app.use
app.use(express.static('public'))
app.use('/css',express.static(__dirname + 'public/css'));
app.use('/css',express.static(__dirname + 'public/assets/css'));
app.use('/js',express.static(__dirname + 'public/assets/js'));
app.use('/images',express.static(__dirname + 'public/assets/images'));
app.use('/scss',express.static(__dirname + 'public/assets/scss'));
app.use('/colors',express.static(__dirname + 'public/assets/colors'));
app.use('/images',express.static(__dirname + 'public/images'));
app.use('/uploads', express.static('uploads'));

// local storage
const users = []
const tickets = []

//mongo initialization
mongoose.connect("mongodb://0.0.0.0:27017/UserData", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, e => console.error(e));

//mongo connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// fetching mongo db data to local storage
fetchdata();

async function fetchdata()
{
  const userData = await User.find().exec();
  
  for(let i=0; i<userData.length; i++)
  {
    users.push(userData[i]);
    // console.log(users)
  }

  const ticketdata = await Ticket.find().exec();
  
  for(let i=0; i<ticketdata.length; i++)
  {
    tickets.push(ticketdata[i]);
    // console.log(users)
  }

}

// passport js

const initializePassport = require('./passport-config');
const user = require('./Models/user.js');
const { realpath } = require('fs');
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


app.get('/error',(req,res)=>{
  res.render('404error.ejs');
})

// Admin Dashboard 
app.get('/dashboard', checkAuthenticated , (req,res)=>{
  res.render('adminDashboard.ejs',{name: req.user.name,userimage:req.user.imagepath})
})

// Admin Dashboard - Package Relation
app.get('/choosepackage', checkAuthenticated , (req,res)=>{
  res.render('userpackage.ejs',{name: req.user.name,userimage:req.user.imagepath,status:"User"});
})

app.post('/choosepackage',(req,res)=>{
  
})

app.get('/createpackage', checkAuthenticated , (req,res)=>{
  res.render('Createpackage.ejs',{name: req.user.name,userimage:req.user.imagepath,status:"Admin"});
})

//  Admin Dashboard - Ticket Relation
app.get('/AnswerTicket',checkAuthenticated,(req,res)=>{
res.render('AnswerTicket.ejs',{name: req.user.name,userimage:req.user.imagepath});
})

app.post('/AnswerTicket',checkAuthenticated,(req,res)=>{

})

//  Admin Dashboard - Set Account Status Relation
app.get('/setaccountstatus',(req,res)=>{
  res.render('setaccountstatus.ejs')
})

app.post('/setaccountstatus',checkAuthenticated,(req,res)=>{
  
})

// routes

// Ticket/Support User-Side 
app.get('/supportpage',checkAuthenticated,(req,res)=>{
  if(req.user.email==="shiv@gmail.com" && req.user.password==="$2b$10$hjvriv/kOO4mlmJ64kkI9eJh/fmQ3wODevla2Din5gmQLfBidyTF.")
  {
  res.render('SupportPage.ejs',{ name: req.user.name,userimage:req.user.imagepath,status:"Admin"});
  }else{
    res.render('SupportPage.ejs',{ name: req.user.name,userimage:req.user.imagepath,status:"User"});
  }
})

app.get('/helpdesk', checkAuthenticated , (req,res)=>{
  res.render('helpdesk.ejs',{name: req.user.name,userimage:req.user.imagepath,status:"User"});
})


// login 
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})

// Homepage
app.get('/Home', (req,res)=>{
  res.render('landingpage.ejs')
})

// when user is loggedIn
app.get('/', checkAuthenticated, async(req, res) => 
{
if(req.user.email==="shiv@gmail.com" && req.user.password==="$2b$10$hjvriv/kOO4mlmJ64kkI9eJh/fmQ3wODevla2Din5gmQLfBidyTF.")
 {
 console.log('Hello')
 res.render('admin_index.ejs',{ name: req.user.name,userimage:req.user.imagepath,status:"Admin"})
}
  else
  {

    console.log('HelloB')
    console.log("URL is :"+ req.user.imagepath)
    res.render('index.ejs', { name: req.user.name,userimage:req.user.imagepath,status:"User"})

  }

 console.log(" current id " + req.user.id);

})

//user json
app.get('/users', (req,res)=>{
  res.json(users)
})

//ticket json
app.get('/ticket',(req,res)=>{
  res.json(tickets);
})

// settings - user side
app.get('/settings',checkAuthenticated,(req,res)=>{
  if(req.user.email==="shiv@gmail.com" && req.user.password==="$2b$10$hjvriv/kOO4mlmJ64kkI9eJh/fmQ3wODevla2Din5gmQLfBidyTF.")
  {
  res.render('settings.ejs',{ name: req.user.name,userimage:req.user.imagepath,status:"Admin"});
  }else{
    res.render('settings.ejs',{ name: req.user.name,userimage:req.user.imagepath,status:"User"});
  }
})

// profile - pic user side
app.get('/profilepicupload',(req,res)=>{
  if(req.user.email==="shiv@gmail.com" && req.user.password==="$2b$10$hjvriv/kOO4mlmJ64kkI9eJh/fmQ3wODevla2Din5gmQLfBidyTF.")
  {
  res.render('profilepicupload.ejs',{ name: req.user.name,userimage:req.user.imagepath,status:"Admin"});
  }else{
    res.render('profilepicupload.ejs',{ name: req.user.name,userimage:req.user.imagepath,status:"User"});
  }
})


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}
))

// user registration
app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})


// edit user profile 
app.get('/editpassword',checkAuthenticated,(req,res)=>{
  res.render('editpass.ejs');
})

app.post('/editpassword',checkAuthenticated,async(req,res)=>{
  const newpassword = await bcrypt.hash(req.body.newpass, 10)
  res.redirect('/');
const display = await User.findOneAndUpdate({id: req.user.id},{password:newpassword},{new: true}); 

req.user.password = newpassword;
})


// registration

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

// session checkin-checkout

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/Home')
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

//edit user profile - user profile
app.get('/edituserprofile',checkAuthenticated,(req,res)=>{

  if(req.user.email==="shiv@gmail.com" && req.user.password==="$2b$10$hjvriv/kOO4mlmJ64kkI9eJh/fmQ3wODevla2Din5gmQLfBidyTF.")
  {
    res.render('edit.ejs', { name: req.user.name,userimage:req.user.imagepath,status: "Admin"})
  }else{
    res.render('edit.ejs', { name: req.user.name,userimage:req.user.imagepath,status:  "User"})
  }
      // res.render('edit.ejs', { name: req.user.name,userimage:req.user.imagepath})
   
})

app.post('/edituserprofile',checkAuthenticated, async(req,res,next)=>{
try {

const newname = req.body.namenew;
const newemail = req.body.emailnew;
const country = req.body.country;
const phoneNo = req.body.phnNo;
const display = await User.findOneAndUpdate({id: req.user.id},{name:newname,email:newemail,country:country,phonenumber:phoneNo},{new: true});
req.user.name = newname;
req.user.email = newemail;
res.redirect('/');

next();

} catch (error) {
  res.redirect('/error');
}
  
})


// multer for saving images to local
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })


// uploading images to cloudinary
app.post('/profilepicupload', upload.single('path'), async (req,res)=>{
try{
 
  //image upload start
 
  const uploadImage = async (imagePath) => {

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };
  
    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath);
      console.log(result.public_id);
      return result.public_id;
    } catch (error) {
      console.error(error);
    }
  };

  const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
      colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId);
        console.log(result.secure_url);
        const display = await User.findOneAndUpdate({id: req.user.id},{imagepath:result.secure_url},{new: true});
        return result.colors;
        } catch (error) {
        console.error(error);
    }
};

const createImageTag = (publicId, ...colors) => {

  // Set the effect color and background color
  const [effectColor, backgroundColor] = colors;

  // Create an image tag with transformations applied to the src URL
  let imageTag = cloudinary.image(publicId, {
    transformation: [
      { aspect_ratio: "1.0", height: 100, crop: "fit",quality:20},
      { radius: 'max' },
      { effect: 'outline:10', color: effectColor },
      { background: backgroundColor },
    ],
  });
  return imageTag;
};
(async () => {

  // Set the image to upload
  const realpath = req.file.path;
  const imagePath = `${realpath}`;

  // Upload the image
  const publicId = await uploadImage(imagePath);

  // Get the colors in the image
  const colors = await getAssetInfo(publicId);

  // Create an image tag, using two of the colors in a transformation
  const imageTag = await createImageTag(publicId);

  // Log the image tag to the console
})();

req.user.imagepath = req.file.path;

res.redirect('/');

//image upload ends

}catch(error)
{
  res.redirect('/error');
}
})

// Ticketing/Support System 

app.post('/helpdesk', checkAuthenticated , async(req,res) =>{
  try {
    const issuename = req.body.issuename;
    const issuebody = req.body.issuebody;
    console.log(issuename);
    console.log(issuebody);

    const disp = await Ticket.create({user_id:req.body.id,issue_name:issuename,issue_body:issuebody},{new: true}, function (err, awesome_instance) {

  tickets.push({issue_name:issuename,issue_body:issuebody});

if (err) return console.error(err)})
     res.redirect('/supportpage');   
  } catch (error) {
    res.redirect('/error');
  }
})


// PORT

app.listen(PORT,()=>{
  console.log(`Server Running at ${PORT}`);
})