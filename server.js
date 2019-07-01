const express=require('express');
const bodyparser=require('body-parser');
const bcrypt=require('bcrypt');
const cors=require("cors");
const knex=require('knex');

const register=require('./controllers/register')
const signin=require('./controllers/signin')
const image=require('./controllers/image')
const profile=require('./controllers/profile')

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1234',
    database : 'smartbrain'
  }
});




const app=express();

app.use(bodyparser.json());
app.use(cors());

app.get("/",(req,res)=>{res.status(200).json('ok')});
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)});
app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)});
app.get('/profile/:id',(req,res)=>{profile.handleProfie(req,res,db)});
app.post('/image',(req,res)=>{image.handleImage(req,res,db)});
app.post('/imageurl',(req,res)=>{image.handleApiCall(req,res)});


var PORT=process.env.PORT||8080
app.listen(PORT,()=>{
	console.log(`server is listening to port ${PORT}`);

})


