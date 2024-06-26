const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/sendDetails", function (req, res) {
  const fname = req.body.fName;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);
  const apiKey = "6e089f11e49fe6a4c1af3c6ad2742d98-us13";
  const serverPrefix = apiKey.split("-")[1];
  const listId = "d74c1eef9b";

  const url = "https://us13.api.mailchimp.com/3.0/lists/" + listId;
  const options = {
    method: "POST",
    auth: "SreeTeja1:6e089f11e49fe6a4c1af3c6ad2742d98-us13",
  };

  const request = https.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// mail chimp API Key
// 6e089f11e49fe6a4c1af3c6ad2742d98-us13

// mail chimp audience id or unique id
// d74c1eef9b
// This is nothing but list id in api documentation
