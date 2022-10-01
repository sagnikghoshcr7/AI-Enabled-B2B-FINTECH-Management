if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
// Libraries
const express = require('express');
/*const passport = require('passport')
*/
const cors = require('cors')
const bcrypt = require('bcrypt')

//Variables
/*const initializePassport = require('./passport-config');
initializePassport(passport)
*/
const app =  express();
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(cors());
app.use(express.json())
//Profile Login-Signup 

const users = []

app.get('/users', (req,res) => {

    res.json(users);

})
//Routes

app.get('/', (req,res) =>{
    res.sendFile('home.html' , {root:'./views'})
})


app.get('/login' , (req,res) =>{
    res.sendFile('login.html' , {root:'./views'})
})

app.get('/signup', (req,res)=>{
    res.sendFile('signup.html',{ root: './views'})
})

app.get('/users/loggedin', async(req,res)=>{
    try{
        res.sendFile('user.html', {root:'./views'})
    }catch{
res.sendStatus(500).send("Internal Server Error");
    }
    
})


//Signup completes
app.post('/signup', urlencodedParser , async(req,res)=>{
    try{
        const salt = await bcrypt.genSalt();
        const User =  { name:req.body.Username1, password: await bcrypt.hash(req.body.Password1,salt) , email:req.body.email1 }
        users.push(User);
        console.log(User);
        console.log(users.length)
       /* res.redirect('/signup')
        res.addListener("error", ()=>{
            alert("Please Enter your details")
        })
    */
    
   res.redirect('/login');
        res.sendStatus(200);
    
    }catch(error){
    res.sendStatus(500).send("Internal Server Error");
    }

    
})

//Redirect to the Profile if the password is correct
app.post('/login', urlencodedParser , async(req,res)=>{

    
        try{
            const logindetail = await req.body.Password01;
            const email = req.body.email01;
            for(let i=0; i<users.length; i++)
            {
                if(email===users[i].email)
                {
                    if(await bcrypt.compare(logindetail,users[0].password) && email===users[0].email)
                    {
                        res.redirect('/users/loggedin')
                        res.sendStatus(200).send("Got it");
                    }else{
                        res.send("Wrong Password")
                    }
                }else{
                    res.sendStatus(404).send("Not found")
                }
            }
            
        }catch(error){
            res.sendStatus(500).send("error");
        }
    
      
})



app.get('/users/loggedout', async(req,res) => {
    try {
        res.sendFile('home.html' , {root:'./views'})
    } catch (error) {
        
    }
   
})


//PORT
app.listen(PORT,() =>{
    console.log(`the server is running ${PORT}`)
})