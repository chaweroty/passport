const express = require('express');
const app = express();
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PasssportLocal = require('passport-local').Strategy;

app.use(express.urlencoded({ extended: true}));

app.use(cookieParser('mi ultra hiper secreto'));

app.use(session({
    secret: 'mi ultra hiper secreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new PasssportLocal(function(username,password,done){
    if(username === "codigofacilito"&&password === "12345678") 
        return done(null, {id:1, name:"Cody"});
    done(null, false);
}));

//serialization
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//Deserialization
passport.deserializeUser(function(id,done){
    done(null,{id:1, name:"Cody"});
});

app.set('view engine', 'ejs');

app.get("/",(req,res,next)=>{
    if(req.isAuthenticated()) return next();

    res.redirect('/login');

},(req,res)=>{
    // si ya iniciamos mostrar bienvenida


    // si no hemos inciado sesion redireccionar a / login
})
app.get("/login",(req,res)=>{
    //mostrar formulario de login
   res.send("hola");
});

app.post("/login", passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/login"
}));

app.listen(8080,()=>console.log("Server started"));