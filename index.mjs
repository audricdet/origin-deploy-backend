import express from 'express'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook';
import session from 'express-session'
import * as dotenv from 'dotenv'
import client from './src/db/connect.mjs' 
import facebookRouter from './src/api/auth/facebookAuth.mjs'
import googleRouter from './src/api/auth/googleAuth.mjs';
import loginRouter from './src/api/auth/login.mjs'
import registerRouter from './src/api/auth/register.mjs'

import getFamilyInfos from './controllers/getFamilyInfos.mjs';
import getAllFamilyMembers from './controllers/getAllFamilyMembers.mjs';

const app = express() 
const PORT = 3000
const router = express.Router()
dotenv.config()

app.use(passport.initialize())
app.use(express.json())


// FACEBOOK
app.use('/auth/f', facebookRouter)
//GOOGLE
app.use('/auth/g', googleRouter)
//CLASSIC 
app.use('/', loginRouter)
app.use('/', registerRouter)

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Origin app listening on port 3000!');
});


// REQUEST 

app.get("/family/:name", getFamilyInfos)
app.get("/family/:name/members", getAllFamilyMembers)







