var note = require("../db/db.json");
var fs = require("fs");

module.exports = function(app){

    app.get('/api/notes', function(req, res){
        res.json(note);
    });

    app.post('/api/notes', function(req, res){
        note.push(req.body);
        res.json(note);
    });

    app.delete('/api/notes/:id', function(req, res){
        note.splice(this.req);
        res.json(note);
    })
}