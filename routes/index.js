var express = require('express');
var router = express.Router();
const camisetasController = require('../camisetasController/camisetasController.js');

/////////////imagenes
let multer= require('multer');
let path= require('path');

let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "public/uploads");
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname );
    }
 });
 var upload = multer({
    storage: storage
 }).single('file')


///////////////////
router.get('/', camisetasController.list);
///////

//////
router.post('/',upload, camisetasController.save);
router.get('/delete/:id', camisetasController.delete);
router.get('/update/:id', camisetasController.edit);
router.post('/update/:id',upload, camisetasController.update);
/////////
router.get('/client/', camisetasController.paint);

//////////cliente 2
router.get('/cliente/', camisetasController.paint2);

////////////////////////compra
router.get('/buy/:id', camisetasController.buy);


module.exports = router;