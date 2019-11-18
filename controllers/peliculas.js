const Pelicula = require('../models/pelicula');

//ordenado por fecha
exports.getPeliculas = (req, res, next) => {
    //get peliculas from db peliculas =[]
    Pelicula.find()
        .then(peliculas => {
            peliculaTitleCase(peliculas);
            res.render('index', {
                peliculas: peliculas.reverse(),
                buscarPor: 'fecha',
                borrado: false
            });
        })
};

exports.getPeliculasTitulo = (req, res, next) => {
    //get from db search bar input
    Pelicula.find()
        .then(peliculas => {
            peliculaTitleCase(peliculas);
            res.render('titulo', {
                peliculas: peliculas.reverse(),
                buscarPor: 'titulo'
            });
        })
};
exports.getPeliculasDirector = (req, res, next) => {
    Pelicula.find()
        .then(peliculas => {
            peliculaTitleCase(peliculas);
            res.render('director', {
                peliculas: peliculas.reverse(),
                buscarPor: 'director'
            });
        })
};

exports.getPeliculasCategoria = (req, res, next) => {
    Pelicula.find()
        .then(peliculas => {
            peliculaTitleCase(peliculas);
            res.render('categoria', {
                peliculas: peliculas.reverse(),
                buscarPor: 'categoria',
                categoria: ""
            });
        })
};

exports.getAgregarPelicula = (req, res, next) => {
    res.render('agregar-pelicula', {
        error: ''
    });
};

exports.getPelicula = (req, res, nest) => {
    const peliculaId = req.params._id;
    Pelicula.findById(peliculaId)
        .then(pelicula => {
            pelicula = [pelicula];
            peliculaTitleCase(pelicula);
            res.render('detalle-pelicula', {
                pelicula: pelicula
            });
        })
        .catch(err => {
            console.log(err);
        })
}

exports.editarPelicula = (req, res, next) => {
    const peliculaId = req.params._id;
    Pelicula.findById(peliculaId)
        .then(pelicula => {
            pelicula = [pelicula];
            peliculaTitleCase(pelicula);
            res.render('editar-pelicula', {
                pelicula: pelicula,
                error: ""
            });
        })
        .catch(err => {
            console.log(err);
        })
}

//guardar edit de pelicula post
exports.guardarPelicula = (req, res, next) => {

    const titulo = req.body.titulo.toLowerCase();
    const duracion = req.body.duracion;
    const director = req.body.director.toLowerCase();
    const categoria = req.body.categoria.toLowerCase();
    const img = req.body.img;
    const protagonistas = req.body.protagonistas;
    const peliculaId = req.params._id;

    Pelicula.findById(peliculaId)
    .then(pelicula => {
        pelicula.titulo = titulo;
        pelicula.duracion = duracion;
        pelicula.director = director;
        pelicula.categoria = categoria;
        pelicula.img = img;
        pelicula.protagonistas = protagonistas;

        Pelicula.find({ titulo: pelicula.titulo }) //validar que no exista la pelicula ya en la bd
            .then(resultado => {
                /*if (resultado.titulo > 0) {//ya existe
                    res.render('editar-pelicula', {
                        pelicula: [pelicula],
                        error: 'La pelicula registrada ya existe!'
                    });
                    res.end();
                } else { //no existe*/
                    pelicula.save()
                    .then(e => {
                        res.redirect('/peliculas/fecha');
                    });
               // }
            })
            .catch(e => console.log(e))

    })

}

//guardar pelicula nueva
exports.postPelicula = (req, res, next) => {
    const titulo = req.body.titulo.toLowerCase();
    const duracion = req.body.duracion;
    const director = req.body.director.toLowerCase();
    const categoria = req.body.categoria.toLowerCase();
    const img = req.body.img;
    const protagonistas = req.body.protagonistas;

    const pelicula = new Pelicula({
        titulo: titulo,
        duracion: duracion,
        director: director,
        categoria: categoria,
        img: img,
        protagonistas: protagonistas
    })
    Pelicula.find({ titulo: titulo }) //validar que no exista la pelicula ya en la bd
        .then(resultado => {
            if (resultado.length > 0) {//ya existe
                res.render('agregar-pelicula', {
                    error: 'La pelicula registrada ya existe!'
                });
                res.end();
            } else { //no existe
                pelicula.save()
                    .then(result => {
                        console.log('pelicula agregada');
                        res.redirect('/peliculas/fecha');
                    })
                    .catch(err => { console.log(err) });

            }
        })
        .catch(e => console.log(e))


};

exports.borrarPelicula = (req, res, next) => {
    const peliculaId = req.params._id;
    Pelicula.findByIdAndRemove(peliculaId)
        .then(result => {
            Pelicula.find()
            .then(peliculas => {
                peliculaTitleCase(peliculas);
                res.render('index', {
                    peliculas: peliculas.reverse(),
                    buscarPor: 'fecha',
                    borrado: true
                });
            })



            //console.log('pelicula borrada');
            //res.redirect('/peliculas/fecha');
        })
        .catch(err => {
            console.log(err);
        })
}


exports.buscarTitulo = (req, res, next) => {
    const search = req.params.search.toLowerCase();
    Pelicula.find({
        titulo: {
            $regex: new RegExp(search)
        }
    }, {
            _id_: 0,
            __v: 0
        }, (err, data) => {
            return (data);
        })
        .then(peliculas => {
            peliculaTitleCase(peliculas);
            res.render('titulo', { peliculas: peliculas });
        })
        .catch(err => { console.log(err) });
}

exports.buscarDirector = (req, res, next) => {
    const search = req.params.search.toLowerCase();
    Pelicula.find({
        director: {
            $regex: new RegExp(search)
        }
    }, {
            _id_: 0,
            __v: 0
        }, (err, data) => {
            return (data);
        })
        .then(peliculas => {
            peliculaTitleCase(peliculas);
            res.render('director', { peliculas: peliculas });
        })
        .catch(err => { console.log(err) });
}

exports.buscarCategoria = (req, res, next) => {
    const categoria = req.params.categoria.toLowerCase();
    Pelicula.find({
        categoria: {
            $regex: new RegExp(categoria)
        }
    }, {
            _id_: 0,
            __v: 0
        }, (err, data) => {
            return (data);
        })
        .then(peliculas => {
            peliculaTitleCase(peliculas);
            res.render('categoria', {
                peliculas: peliculas,
                categoria: categoria
            });
        })
        .catch(err => { console.log(err) });
}



//formato titulos
function peliculaTitleCase(peliculas) {
    peliculas.forEach((pelicula) => {
        pelicula.titulo = titleCaps(pelicula.titulo);
        pelicula.director = titleCaps(pelicula.director);
        pelicula.categoria = titleCaps(pelicula.categoria);
    });
    return peliculas;
}

function titleCaps(title) {
    var ignore = "and,the,in,with,an,or,at,of,a,to,for".split(",");
    var theTitle = title;
    var split = theTitle.split(" ");

    for (var x = 0; x < split.length; x++) {
        if (x > 0) {
            if (ignore.indexOf(split[x].toLowerCase()) < 0) {
                split[x] = split[x].replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
        } else {
            split[x] = split[x].replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        }
    }
    title = split.join(" ");
    return title;
};

