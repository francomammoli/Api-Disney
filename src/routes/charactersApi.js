const {Router} = require('express');
const router = Router();
//requerimos multer para la subida de imagenes
const multer = require('multer');
const path = require('path');

//require controller
const personajeController = require('../controllers/charactersApi');

//config de multer
const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./src/public/imagenes');
    },
    filename : (req,file,cb) => {
        let fileName = `${Date.now()}_img${path.extname(file.originalname)}`;
        cb(null, fileName);
    }
});

const uploadFile = multer({storage});

//listar
router.get('/',personajeController.show);

//detalle
router.get('/:id',personajeController.detail);

//crear 
router.post('/',uploadFile.single('img'),personajeController.create);

//edit
router.post('/:id',uploadFile.single('img'),personajeController.edit);

//delete
router.delete('/:id',personajeController.delete);

module.exports = router;