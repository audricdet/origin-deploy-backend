import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook';
import session from 'express-session'
import * as dotenv from 'dotenv'
import client from '../../db/connect.mjs'
import express from 'express'
const facebookRouter = express.Router()


passport.use(new FacebookStrategy({
    clientID : process.env.FACEBOOK_APP_ID,
    clientSecret : process.env.FACEBOOK_APP_SECRET, 
    callbackURL : 'https://origin-app.herokuapp.com/auth/f/facebook/callback',
    profileFields:["emails"]
},
async function(accessToken, refreshToken, profile, done) {

    try {
        let user_profile  = await client.query(`SELECT * FROM profile WHERE facebook_id = '${profile.id}'`)
        console.log("here")
        console.log(profile)
        console.log(profile.id)
        console.log(user_profile)
        console.log(user_profile.length);
        if (user_profile.rows.length > 0) {
            return done(null, {redirect: `/profile/${user_profile.rows[0].id}`})
        } else {
            try {
                let user = await client.query(`INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *`, [ profile.emails[0].value, "guyguyguyguygugu"])
                console.log(user)
                await client.query(`INSERT INTO profile (user_id, facebook_id) VALUES ('${user.id}', '${profile.id}')`)
                return done(null, {redirect: '/create-profile'})
            } catch (error) {
                console.log(error)
            }
        }
    } catch (error) {
        console.log(error);
        return done(error);
    }
}
))

facebookRouter.get('/facebook', passport.authenticate('facebook', {scope: ["email"]}))

facebookRouter.get('/facebook/callback', 
passport.authenticate('facebook', { session : false }),
    function(req,res) {
    if(req.user.redirect){
        return res.redirect(req.user.redirect);
    }
    //successful authentication, redirect home.
    res.redirect('/');
})


export default facebookRouter