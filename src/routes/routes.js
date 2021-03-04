const express = require ('express');
const passport = require('passport');
const path = require('path');

const app = express();

// *** Motor de vistas ***
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// Si ya iniciamos session mostrar bienvenida, si no iniciamos session redireccionar a /login
app.get("/", (req, res, next) => { 
    if(req.isAuthenticated()) // Middleware de passport para ver si el usuario esta autenticado
        return next();

    res.redirect('/login');
    
},(req, res) => {
    res.send('Hola mundo');
});

// Mostrar formulario de login
app.get('/login', (req, res) => {
    res.render('login');
});

// Recibir credenciales e iniciar session
app.post("/login", passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

module.exports = app;