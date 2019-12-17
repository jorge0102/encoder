//estamos declarando las variables para requerrilas en controller
let mysql = require('mysql');
const connection = require('../config/db.js');

//esto es una funcion estatic para poder untilizar los metodos que le declaremos.
const controller = {};
/////////////////////////////compra
controller.buy = (req, res) => {
    const { id } = req.params;
    connection.query("SELECT * FROM producto WHERE producto_id = ?", [id], (err, result) => {
        if (err) {
            throw err;
        }
        else {
            res.render('compra.ejs', {
                result: result
            });
        };
    });
};
////////////////////////////////////Para pintar en clientes 2
controller.paint2 = (req, res) => {
    let sql = "SELECT * FROM producto ;"


    connection.query(sql, function (err, results) {
        res.render('cliente2.ejs', {
            results: results

        });
    });

}


//////////////////////////////////////////////////
//aqui le declaramos los metodos que va a tener la funcion estatica
controller.list = (req, res) => {
    let sql = "SELECT * FROM producto ;"


    connection.query(sql, function (err, results) {
        res.render('index.ejs', {
            results: results

        });
    });

}
controller.save = (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let price = req.body.price;
    let stock = req.body.stock;
    let imagen = req.file.originalname;
    let talla = req.body.talla;

    let sql = "INSERT INTO producto SET? ";
    connection.query(sql, {
        name,
        description,
        price,
        stock,
        imagen,
        talla

    }, function (err, results) {
        console.log(results);
        res.redirect('/');
    })

}

///////////////////////
//  Aqui estamos redirigiendo a la pagina clientes 
controller.paint = (req, res) => {
    let sql = "SELECT * FROM producto ;"


    connection.query(sql, function (err, results) {
        res.render('cliente.ejs', {
            results: results

        });
    });

}

//////
controller.delete = (req, res) => {
    let id = req.params.id;


    console.log(id)
    connection.query('DELETE FROM producto WHERE producto_id = ' + id, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            connection.query('DELETE FROM producto WHERE producto_id = ' + id, function (err, results) {
                res.send('BORRADO');
            });
        };

    });

};
////////AQUI ESTA LA PARTE ADMIN
controller.edit = (req, res) => {
    const { id } = req.params;
    connection.query("SELECT * FROM producto WHERE producto_id = ?", [id], (err, results) => {
        if (err) {
            throw err;
        }
        else {
            connection.query("SELECT * FROM producto WHERE producto_id = ?", [id], (err, result) => {
                res.render('admin.ejs', {
                    results: results[0],
                    result: result[0]
                });
            });
        };
    });
};

controller.update = (req, res) => {
    let id = req.params.id;

    connection.query("SELECT * FROM producto WHERE producto_id = " + id, (err, results) => {
        
        if (req.file === undefined) {
            console.log( results[0].imagen)
            let id = req.params.id;
            let name = req.body.name;
            let description = req.body.description;
            let price = req.body.price;
            let stock = req.body.stock;
            var imagen = results[0].imagen;
            let talla = req.body.talla;
            let sql = 'UPDATE producto set? where producto_id =' + id;
            connection.query(sql, { name, description, price, stock, imagen, talla }, (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    res.redirect('/')
                };
            })
        }
        //////////////////////////////////////////
        else {

            let id = req.params.id;
            let name = req.body.name;
            let description = req.body.description;
            let price = req.body.price;
            let stock = req.body.stock;
            let imagen = req.file.originalname;
            let talla = req.body.talla;

            connection.query('UPDATE producto SET? WHERE producto_id = ' + id, { name, description, price, stock, imagen, talla }, (err, rows) => {
                if (err) {
                    throw err;
                }
                else {
                    res.redirect('/');
                };
            });
        }
    })
}

module.exports = controller;