const express = require('express');
const app = express();
const port = 3000;

let clientes = [
    {_id: 1, nombre: 'gas natural', cif: 'A12345678', localidad: 'madrid'},
    {_id: 2, nombre: 'jazztel', cif: 'A87654321', localidad: 'madrid'},
    {_id: 3, nombre: 'iberdrola', cif: 'A4443241', localidad: 'bilbao'}
]

// Get para todos los registros

app.get('/', (req, res) => {
    // res.status(200).send(clientes); No se suele utilizar
    res.status(200).json({
        mensaje: 'ok',
        clientes // equivalente a clientes: clientes
    })
})

// Get con parámetros (route-params) se definen con ruta/:nombreparametro/:nombreparametro

app.get('/cliente-id/:_id', (req, res) => {
    let cliente = clientes.find(elem => {
        return elem._id === Number(req.params._id);
    })
    if(cliente === undefined) {
        return res.status(404).json({
            mensaje: 'No se encontró ningún cliente con ese _id'
        })
    }
    res.status(200).json({
        mensaje: 'ok',
        cliente
    })
})

// Get con parámetros (query-params) se definen en la url de la petición ruta?clave1=valor1&clave2=valor2

app.get('/cliente-localidad', (req, res) => {
    let clientesSeleccionados = [];
    clientesSeleccionados = clientes.filter(elem => {
        if(elem.localidad === req.query.localidad.toLowerCase()) {
            return elem;
        }
    })
    res.status(200).json({
        mensaje: 'ok',
        clientesSeleccionados
    })
})



app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})