
//Session

const LocalStrategy = require('passport-local').Strategy;

function initialize(passport)
{
    
    const authenticateUser = (email,password,done) =>
    {
const email = getUserByEmail(email);

if(user === null)
{
    return done(null,false, { message:"No User Found"});
}

    }

    try {
        if (await bcrypt.compare(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      } catch (e) {
        return done(e)
      }
 

passport.use(new LocalStrategy({ usernameField:'email'}));
passport.serializeUser((user,done)=>{

})

passport.deserializeUser((id,done)=>{
    
})

}

module.exports = initialize;