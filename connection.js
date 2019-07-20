var express = require('express');
var app = express();
var path = require("path")


var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/reserve", function(req,res){
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res){
    res.sendFile(path.join(__dirname, "tables.html"))
})





app.listen(PORT, function(){
    console.log("app listening on PORT:" + PORT)
})