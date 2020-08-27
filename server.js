// Require/import the HTTP module
var http = require("http");
var fs = require("fs");
var express = require("express");
var app = express();
var path = require('path');

// Define a port to listen for incoming requests
var PORT = process.env.PORT || 8080;

// Use the Node HTTP package to create our server.
// Pass the handleRequest function to empower it with functionality.
/* var server = http.createServer(handleRequest); */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Start our server so that it can begin listening to client requests.
/* server.listen(PORT, function() {

  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
}); */

// Create a function for handling the requests and responses coming into our server
/* function handleRequest(req, res) {

    // Here we use the fs package to read our index.html file
    
    fs.readFile(__dirname + "/public/index.html", function(err, data) {
      if (err) throw err;
      // We then respond to the client with the HTML page by specifically telling the browser that we are delivering
      // an html file.
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });

} */
//Routes



app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
app.get('/api/notes', function(req, res){
  res.sendFile(path.join(__dirname, "db/db.json"));
});

//var NotesSave = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));

app.get('/api/notes/:id', function(req, res){
  let NotesSave = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  res.json(NotesSave[Number(req.params.id)]);
});

app.post('/api/notes', function(req, res){
  let NotesSave = JSON.parse(fs.readFileSync("db/db.json", "utf-8"));
  var newNote = req.body;
  

  NotesSave.push(newNote);
  fs.writeFileSync("db/db.json", JSON.stringify(NotesSave));
  res.json(NotesSave);

});






app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

/*
fs.readFile(__dirname+'/db/db.json', (err, data) => {
    if (err) throw err;
    console.log(JSON.parse(data));
    //res.json(data);
  }); */
//test test







