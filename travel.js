const express = require("express");
const bodyParser = require("express");
const request = require("express");
const https = require("https");

const app = express();
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.get("/" ,function(req , res)
{
   res.sendFile(__dirname + "/index.html");
});
app.post("/" , function(req,res)
{
   const email = req.body.mail;
   const password = req.body.pass;

    console.log(email, password);

    var data = {
        members:
        [
            {
                email_address: email,
                Password: password,
                status: "subscribed",
                merge_fields:
                {

                }
            }
        ]
    };
    const jsonval = JSON.stringify(data);
    const url = "https://us6.api.mailchimp.com/3.0/lists/58231c7fdc";

    const options = 
    {
        method:"POST",
        auth : "Yadav:ee892f6fb2921f399c43e442ad04845e-us6"
    }
    const request =  https.request(url , options , function(response)
    {
        if(response.statusCode == 200)
        {
            res.sendFile(__dirname + "/loginS.html");
        }
        else
        {
            res.sendFile(__dirname + "/fail.html");
        }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
  request.write(jsonval);
   request.end();
});

app.post("/fail" , function(req,res)
{
    res.redirect("/");
})
app.listen( process.env.PORT  || 3000 , function()
{
    console.log("Server is at http://localhost:3000");
});