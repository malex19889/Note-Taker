const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());

let notes = JSON.parse(fs.readFileSync("./db/db.json"));

app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"index.html"));
})

app.get("/notes",function (req,res) {
    res.sendFile(path.join(__dirname,"/public/notes.html"));
})

app.get("/api/notes",function (req,res) {
    res.sendFile(path.join(__dirname,"./db/db.json"));
})

app.post("/api/notes",function(req,res){
    
    let newNote = req.body;
    newNote.id = notes.length;
    notes.push(newNote);
    fs.writeFileSync("./db/db.json",JSON.stringify(notes));
    res.sendFile(path.join(__dirname,"./db/db.json"));
})

app.delete("/api/notes/:id",function(req,res){
    let deleteNoteID = parseInt(req.params.id);
    console.log("delete note with id: "+deleteNoteID);
    notes.forEach(function(note,idx) {
      if(note.id === deleteNoteID){
         notes.splice(idx,1);
         fs.writeFileSync("./db/db.json",JSON.stringify(notes));
      }
    });
    res.sendFile(path.join(__dirname,"./db/db.json"));
})
 
app.listen(PORT,function(){
    console.log("server listening on "+PORT);
});