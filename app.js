const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); //css

const mongodb = require('mongodb');
const mongoose = require('mongoose');


const peliculasRoutes = require('./routes/peliculas');

const app = express();

app.use(bodyParser.urlencoded({extended: false})); //cambiar a nomral

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public'))); //css


app.use('/peliculas', peliculasRoutes);

app.use((req, res, next) => {
    res.redirect('/peliculas/fecha');
})

mongoose.connect('mongodb+srv://bernardo:ErQO9E1BsWe4sfz2@cluster0-fyvkx.mongodb.net/peliculas?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(result => {
    console.log('mongodb connected')
    app.listen(8080);
})
.catch(err => console.log(err));
