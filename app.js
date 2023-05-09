// const express = require("express");
// const app = express();
// const request = require("request");
// const bodyParser = require("body-parser");
// const https = require("https");
// const { options } = require("request");

// app.use(bodyParser.urlencoded({extended:true}));

// app.use(express.static("public"));

// app.get("/",(req,res) =>{
//    res.sendFile(__dirname + "/signup.html");
// });

// // app.post("/",(req,res) =>{
// //    const fname = req.body.firstName ;
// //    const lname = req.body.lastName;
// //    const email = req.body.userEmail;


 
// // });


// const client = require("@mailchimp/mailchimp_marketing");

// client.setConfig({
//    apiKey: '4f93443509e697213bb7d28494102931-us13',
//    server: 'us13',
// });

// const run = async () => {
//    const response = await client.lists.createList({
//      name: "name",
//      permission_reminder: "permission_reminder",
//      email_type_option: true,
//      contact: {
//        company: "company",
//        address1: "address1",
//        city: "city",
//        country: "country",
//      },
//      campaign_defaults: {
//        from_name: "from_name",
//        from_email: "Beulah_Ryan@hotmail.com",
//        subject: "subject",
//        language: "language",
//      },b    
//    });
//    console.log(response);
//  };
//  run();

 



// app.listen("3000", (req,res) =>{
//    console.log("Connected to 3000 port");
// });


// // api key md-l86z2mnC1K9oge36nwjruw
// // api key 4f93443509e697213bb7d28494102931-us13
// //  9ae65a6159 listid

// ----------required packages---------//
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");

// new instance of express
const app = express();

//mailChimp api key
//api key 
//Mailchimp list id  

//app.use
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;
  const data = {
    //the members, status,merge_fields ---comes from mailChimp api
    'members':[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:firstName,
          LNAME:lastName
        }
      }
    ],
  }
  var jsonData = JSON.stringify(data)

  console.log(firstName, lastName, email);

  // NOTE: The API KEY BELOW HAS BEEN DISABLED ON MAILCHIMP
  //       AS THIS CODE WILL BE PUSHED TO PUBLIC GITHUB

var jsonData = JSON.stringify(data);
const url = "https://us13.api.mailchimp.com/3.0/lists/9ae65a6159";

const options = {
  method:"POST",
  auth:"vr:4f93443509e697213bb7d28494102931-us13"
}

const request = https.request(url, options, function(response){
  if (response.statusCode === 200){
    res.sendFile(__dirname + "/success.html");
  }else {
    res.sendFile(__dirname + "/failure.html");
  }

response.on("data",function(data){
  console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();
});


app.post("/failure", function (req, res){
  res.redirect("/");
});

//to test the app locally in port 3000
// app.listen(process.env.PORT || 3000, function(){
app.listen(process.env.PORT || 3000, function(){
console.log("Server is running in port 3000")
});