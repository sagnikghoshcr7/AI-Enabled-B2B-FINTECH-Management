
// Libraries
const express = require('express');


//Variables

const app =  express();
var bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
var urlencodedParser = bodyParser.urlencoded({ extended: false })



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

app.get('/users/loggedin', (req,res)=>{
    try{
        res.sendFile('user.html', {root:'./views'})
    }catch{
res.sendStatus(500).send("Internal Server Error");
    }
    
})


//Signup completes
app.post('/signup', urlencodedParser , (req,res)=>{
try{
    const User =  { name:req.body.Username1, password:req.body.Password1 , email:req.body.email1 }
    users.push(User);
    console.log(users);
   /* res.redirect('/signup')
    res.addListener("error", ()=>{
        alert("Please Enter your details")
    })
*/

res.redirect('/login');
    res.sendStatus(200);

}catch{
res.sendStatus(500).send("Internal Server Error");
}
    
})

//Redirect to the Profile if the password is correct
app.post('/login', urlencodedParser , (req,res)=>{
    try{
        const logindetail = req.body.Password01;
        const email = req.body.email01;
        for(let i=0; i<users.length; i++)
        {
            if(email===users[i].email)
            {
                if(logindetail===users[0].password && email===users[0].email)
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
        
    }catch{
        res.sendStatus(500).send("error");
    }
      
})

app.get('/users/loggedout', (req,res) => {
    res.sendFile('home.html' , {root:'./views'})
})


//PORT
app.listen(PORT,() =>{
    console.log(`the server is running ${PORT}`)
})