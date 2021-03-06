const express = require("express");
const logger = require("morgan");
// This will be our application entry. We'll setup our server here.
const http = require("http");
// Set up the express app
const app = express();
// Log requests to the console.
app.use(logger("dev"));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(express.static(__dirname));
app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'ejs');

require("./routes/index.js")(app);
require("./routes/resources.js")(app, __dirname);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/login.html");
});

const port = parseInt(process.env.PORT, 10) || 8000;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
module.exports = app;
