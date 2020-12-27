var express = require("express");
var path = require('path');
var app = express();
var port = 3001;
var hostname = 'localhost';
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/design", { useNewUrlParser: true ,useUnifiedTopology: true});

// var admissionSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     message: String,
//     course: String
// });

var contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

// var admissionModel = mongoose.model("admissionModel", admissionSchema);
var contactModel = mongoose.model("contactModel", contactSchema);

app.use(express.static(path.join(__dirname, '/public')));

//ENDPOINTS

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/index", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/bathroom", (req, res) => {
    res.sendFile(path.join(__dirname + "/bathroom.html"));
});

app.get("/aboutus", (req, res) => {
    res.sendFile(path.join(__dirname + "/aboutus.html"));
});

app.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname + "/contact.html"));
});

app.get("/kitchen", (req, res) => {
    res.sendFile(path.join(__dirname + "/kitchen.html"));
});

app.get("/office", (req, res) => {
    res.sendFile(path.join(__dirname + "/office.html"));
});

app.get("/pricing", (req, res) => {
    res.sendFile(path.join(__dirname + "/pricing.html"));
});

app.get("/wardrobe", (req, res) => {
    res.sendFile(path.join(__dirname + "/wardrobe.html"));
});

// app.post("/registercourse", (req, res) => {
//     var myData = new admissionModel(req.body);
//     myData.save()
//         .then(item => {
//             res.send("Form saved to database");
//         })
//         .catch(err => {
//             res.status(400).send("Unable to save to database");
//         });
// });

app.post("/contactUs", (req, res) => {
    var contactData = new contactModel(req.body);
    console.log(req.body);
    contactData.save()
        .then(item => {
            res.send("We have received your message");
        })
        .catch(err => {
            res.status(400).send("Unable to send message");
        });
});

app.listen(port,hostname, () => {
    console.log("Server listening on port " + port);
});