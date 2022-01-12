var express = require('express');
var listCotroller = require('../controllers/list');
var router = express.Router();

/* GET home page. */
router.get('/', listCotroller.crearLista);
router.get('/listas',listCotroller.verListas);
router.post('/agregarList', listCotroller.agregarLista);
router.post('/updateList', listCotroller.updateList);
router.post('/deleteList', listCotroller.deleteList);

module.exports = router;