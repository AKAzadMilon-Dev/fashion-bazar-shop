import express from 'express';
import data from './Data.js'
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/products', function (req, res) {
    res.send(data)
})

app.get('/products/:slug', function (req, res) {
    let product = data.find((item)=>{
        if(req.params.slug == item.slug){
            return item
        }
    })
    res.send(product)
})

app.get('/productcart/:id', function (req, res) {
    let product = data.find((item)=>{
        if(req.params.id == item._id){
            return item
        }
    })
    res.send(product)
})

let port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log("8000 port")
})