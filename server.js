const express = require("express");
const path = require("path");
const fs = require("fs");
const { parse } = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const util =require("util");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

const notes = JSON.parse(fs.readFileSync("./db/db.json"));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})

app.get("/notes",function (req,res) {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
})

app.get("/api/notes",function (req,res) {
    console.log(notes)
    res.sendFile(path.join(__dirname,"./db/db.json"));
})

app.post("/api/notes",function(req,res){
    let newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    fs.writeFileSync("./db/db.json",JSON.stringify(notes));
})

app.listen(PORT,function(){
    console.log("server listening on "+PORT);
});
