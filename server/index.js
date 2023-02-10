var express = require('express');
var app = express();
var fs = require("fs");
var cors = require('cors')

let id = 0
var data = []

app.use(express.json())
app.use(cors())

app.get('/users',(req,res) => {
    res.send(data)
});

app.get('/users/:id',(req,res) => {
    console.log(typeof req.params.id)
    const result = data.find(({ id }) => id === parseInt(req.params.id));
    if(result){
        res.send(result)
    }else{
        res.statusCode = 401
        res.send("Data not found")
    }
});

app.put('/user',(req,res) => {
    const result = data.findIndex(({ id }) => id === req.body.id);
    Object.keys(req.body).map((item) => {
        if(item !== 'id'){
            data[result][item] = req.body[item]
        }
    })
    console.log(data)
    res.send("Successfully Updated")

});

app.delete('/user/:id',(req,res) => {
    const result = data.findIndex(({ id }) => id === parseInt(req.params.id));
    delete data[result]
    res.send("Succesfully Deleted");

});

app.post('/user', function (req, res) {
    id++
    let datum = {...req.body,id:id,phonenumber:{...req.body.phonenumber},altPhonenumber:req.body.altPhonenumber}
    console.log(req.body)
    data.push(datum)
    console.log(data)
    res.send({status:200})
    
})

var server = app.listen(8081, function () {
console.log("listening on port 8081")
})