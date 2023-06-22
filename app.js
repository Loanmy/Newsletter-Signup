const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req, res) {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            }
        }]
    };

    var jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/9405be1002Delete';
    const options = {
        method: "POST",
        auth: "Loanmy:9cef99bf2d69260c7af6a943a4c28d35-us21"
    }

    const request = https.request(url, options, function(response) {
        response.on("data", function(data) {
           if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
           } else {
            res.sendFile(__dirname + "/failure.html");
           }
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});










app.listen(3000, function() {
    console.log("Server running on port 3000");
});

// API Key
// 9cef99bf2d69260c7af6a943a4c28d35-us21

// list ID
// 9405be1002











