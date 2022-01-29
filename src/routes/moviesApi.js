const {Router} = require('express');
const router = Router();

//requerimos multer para la subida de imagenes
const multer = require('multer');
const path = require('path');

//require controller
const peliculaController = require('../controllers/moviesApi');

//config de multer
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./src/public/imagenes/movies');
    },
    filename : (req,file,cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});

//listado
router.get('/', peliculaController.show);

//detalle de pelicula
router.get('/:id',peliculaController.detailmovies);

//creacion
router.post('/',uploadFile.single('img'),peliculaController.create);

//edit
router.post('/:id',uploadFile.single('img'),peliculaController.edit);

//delete
router.delete('/:id',peliculaController.delete);

module.exports = router;