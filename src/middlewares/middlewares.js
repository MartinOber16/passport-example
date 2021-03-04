require('dotenv').config()
const express = require ('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy; // estrategia para passport

const app = express();

// Permite leer los datos enviados por un formulario
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SECRET));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());

app.use(passport.session());

passport.use(new PassportLocal( (username, password, done) => {
    // Buscar usuario aqui
    if(username === 'User1@mail.com' && password === '123456')
        return done(null, { id: 1, nombre: 'Usuario 1'});

    done(null, false);
}));

// { id: 1, nombre: 'Usuario 1'}
// 1 => Serialización
passport.serializeUser( (user, done) => {
    done(null,user.id);
});

// Deserialización
passport.deserializeUser( (id, done) => {
    // Buscar el usuario aqui
    done(null, { id: 1, nombre: 'Usuario 1'});
})

module.exports = app;