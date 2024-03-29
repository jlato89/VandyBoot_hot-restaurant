// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =============================================================
// Variables

var reservations = [];
var waitingList = [];

// Routes
// =============================================================

//Basic Routes
app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
   res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
   res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays reservations
app.get("/api/reservations", function (req, res) {
   return res.json(reservations);
});

// Displays waiting list
app.get("/api/waiting-list", function (req, res) {
   return res.json(waitingList);
});


// Create New reservation - takes in JSON input
app.post("/api/reservations", function (req, res) {
   // req.body hosts is equal to the JSON post sent from the user
   // This works because of our body parsing middleware
   var newReservation = req.body;

   // Using a RegEx Pattern to remove spaces from newCharacter
   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
   newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

   console.log(newReservation);

   // if reservations is 5 or more, add to wait list
   if (reservations.length !== 5) { reservations.push(newReservation); } 
   else { waitingList.push(newReservation); }

   res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
   console.log("App listening on PORT " + PORT);
});