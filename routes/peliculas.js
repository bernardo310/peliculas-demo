const express = require('express');

const catalogoController = require('../controllers/peliculas');

const router = express.Router();

router.get('/fecha', catalogoController.getPeliculas);
router.get('/titulo', catalogoController.getPeliculasTitulo);
router.get('/titulo/:search', catalogoController.buscarTitulo);

router.get('/director', catalogoController.getPeliculasDirector);
router.get('/director/:search', catalogoController.buscarDirector);


router.get('/categoria', catalogoController.getPeliculasCategoria);
router.get('/categoria/:categoria', catalogoController.buscarCategoria);

router.get('/agregar-pelicula', catalogoController.getAgregarPelicula)

router.post('/agregarPelicula', catalogoController.postPelicula);

//detalle de pelicula
router.get('/:_id', catalogoController.getPelicula);

router.get('/editar-pelicula/:_id', catalogoController.editarPelicula);
router.post('/guardar-pelicula/:_id', catalogoController.guardarPelicula);

router.get('/borrar-pelicula/:_id', catalogoController.borrarPelicula);



module.exports = router;