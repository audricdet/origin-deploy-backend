// IMPORT PACKAGES
import express from 'express'
import passport from 'passport'
import { Strategy as FacebookStrategy } from 'passport-facebook';
import session from 'express-session'
import * as dotenv from 'dotenv'
import client from './src/db/connect.mjs' 
import cookieParser from 'cookie-parser';

//IMPORT ROUTERS
import facebookRouter from './src/api/auth/facebookAuth.mjs'
import googleRouter from './src/api/auth/googleAuth.mjs';
import loginRouter from './src/api/auth/login.mjs'
import registerRouter from './src/api/auth/register.mjs'

// IMPORT MIDDLEWARE
import auth from './src/middleware/verifyToken.mjs'

//IMPORT CONTROLLERS
import getFamilyInfos from './controllers/getFamilyInfos.mjs';
import getAllFamilyMembers from './controllers/getAllFamilyMembers.mjs';
import GetAllProfileInfos from './controllers/getAllProfileInfos.mjs';
import insertProfileInfos from './controllers/insertProfileInfos.mjs';
import addUserToFamily from './controllers/addUserToFamily.mjs';

const app = express() 
const PORT = 3000
const router = express.Router()
dotenv.config()

//USE 
app.use(cookieParser())
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
//GET 
app.get("/family/:name", auth, getFamilyInfos)
app.get("/family/:name/members", auth, getAllFamilyMembers)
app.get("/profile/:id", auth, GetAllProfileInfos)

//POST 
app.post("/family/:name/addUser", auth, addUserToFamily)
app.post("/profile/:id/insertProfileInfos", auth, insertProfileInfos)






