const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('./Models/user.js');

async function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (emails, password, done) => {
    const user = getUserByEmail(emails)
    // const mongoid = await User.find({email:user}).exec();
    // console.log(mongoid);
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
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
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize