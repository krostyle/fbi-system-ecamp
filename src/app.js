const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config();

const paths = {
    auth: ''
}


//Initialize the app
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine(
    '.hbs',
    exphbs({
        defaultLayout: 'main',
        layoutsDir: path.join(app.get('views'), 'layouts'),
        partialsDir: path.join(app.get('views'), 'partials'),
        extname: '.hbs'
    })
);
app.set('view engine', '.hbs');

app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Public folder
app.use(express.static(path.join(__dirname, '/public')));

//Routes
app.use(paths.auth, require(path.join(__dirname, '/routes/auth.routes')));

module.exports = app;