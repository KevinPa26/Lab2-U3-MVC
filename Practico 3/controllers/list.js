const Lista = require('../models').List;
const Item = require('../models').Item;

exports.crearLista = function(req, res){
    res.render('index',{title:'AGREGAR LISTA', form:true, item:false, pretty:true});
    res.end();
}

exports.agregarLista = async function(req, res){
    await Lista.create({
        titulo: req.body.titulo,
        estado: req.body.estado,
        createdAt: req.body.fechaC,
        fecha_resolucion: req.body.fechaR
    });
    res.redirect(301, '/list/listas');
}

exports.updateList = async function(req, res){
    let lista = await Lista.findByPk(req.body.idList);
    lista.estado = req.body.estado;
    await lista.save();
    res.redirect(301, req.get('referer'));
}

exports.deleteList = async function(req, res){
    let lista = await Lista.findByPk(req.body.idList);
    let items = await lista.getItems();
    if(req.body.estado != 'Resuelto' && items.length == 0){
        console.log("entro aca");
        await lista.destroy();
    }else{
        console.log("No se puede borrar la lista esta 'Resuelto' o tiene items");
    }
    res.redirect(301, req.get('referer'));
}

exports.verListas = async function(req, res){
    let lista = await Lista.findAll();
    res.render('listas',{pretty:true, title:'VER LISTAS', lista:lista, item:false, modificar:true});
}