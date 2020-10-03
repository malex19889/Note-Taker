const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.static("db"));
app.use(express.json());
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})
app.get("/notes",function (req,res) {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
});
app.get("/api/notes",function (req,res) {
    res.sendFile(path.join(__dirname,"/db/db.json"));
});
app.post("/api/notes",function (req,res) {
    res.send('<p>some html</p>');
})
app.listen(PORT,function(){
    console.log("server listening on "+PORT);
});
