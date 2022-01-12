var express = require('express');
var itemCotroller = require('../controllers/item');
var router = express.Router();

/* GET home page. */
router.get('/', itemCotroller.crearItem);
router.get('/:idList', itemCotroller.itemsDeLista);
router.post('/agregarItem', itemCotroller.agregarItem);
router.post('/updateItem', itemCotroller.updateItem);
router.post('/deleteItem', itemCotroller.deleteItem);


module.exports = router;