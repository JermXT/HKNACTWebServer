// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const {spawn} = require('child_process');

// our default array of dreams
const dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});


// send the default array of dreams to the webpage
app.post("/vuln", (request, response) => {
  console.log(request.headers.args);
  var arg  = request.headers.args;
  var dataToSend;
  var sh = spawn("./vuln", [arg]);
  sh.stdout.on("data", data => {
    console.log(data.toString());
    response.json({"response":data.toString()});
  })	
  sh.stderr.on("data", data => {
    console.log(data.toString());
    response.json({"response":data.toString()});
  })

/*
  const python = spawn('python', ['script.py', arg]);
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
    console.log("ok");
    console.log(dataToSend);
    response.json({"response":dataToSend});
  });*/

  // express helps us take JS objects and send them as JSON
  //response.json({"response":"vuln response from server"});
});

// listen for requests :)
const listener = app.listen(7000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});


process.on('SIGINT', function() {
	console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
	// some other closing procedures go here
	process.exit(1);
});
