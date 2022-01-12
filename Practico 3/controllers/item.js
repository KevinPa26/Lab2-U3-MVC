const Item = require('../models').Item;
const Lista = require('../models').List;

exports.crearItem = async function(req, res){
    let lista = await Lista.findAll();
    res.render('index',{title:'AGREGAR ITEM', form:true, modificar:false, item:true, lista:lista, pretty:true});
    res.end()
}

exports.agregarItem = async function(req, res){
    let lista = await Lista.findByPk(req.body.lista);
    if(lista != null){
        await lista.createItem({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad,
        estado: req.body.estado,
        fecha_limite: req.body.fechaL,
        createdAt: req.body.fechaC
        });
    }else{
        await Item.create({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        prioridad: req.body.prioridad,
        estado: req.body.estado,
        fecha_limite: req.body.fechaL,
        createdAt: req.body.fechaC
        });
    }
    res.redirect(301, '/list/listas');
}

exports.updateItem = async function(req, res){
    let item = await Item.findByPk(req.body.idItem);
    console.log(item);
    item.ListId = req.body.lista;
    item.estado = req.body.estado;
    await item.save();
    res.redirect(req.get('referer'));
}

exports.deleteItem = async function(req, res){
    let item = await Item.findByPk(req.body.idItem);
    await item.destroy();
    res.redirect(301, req.get('referer'));
}

exports.itemsDeLista = async function(req, res){
    let l = await Lista.findByPk(req.params.idList);
    let lista = await Lista.findAll();
    let items = await l.getItems();
    let itemsNull = await Item.findAll({where:{listid: null}});
    res.render('items',{pretty:true,item:true,modificar:true, lista:lista, items:items, itemsNull:itemsNull, nlista:l.titulo});
    res.end()
}