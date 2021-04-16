const express= require("express");
const bodyParser= require("body-parser");
const mongoose= require("mongoose");
// const encrypt= require("mongoose-encryption");
const ejs= require("ejs");
const app= express();
mongoose.connect("mongodb://localhost:27017/shreyaDB", {useNewUrlParser: true, useUnifiedTopology:true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const passSchema= new mongoose.Schema({
  password: String,
});
//  const key= "Thisismykey";
// passSchema.plugin(encrypt, {secret:key});

const Password= mongoose.model("Password", passSchema);

app.get("/", function(req,res)
{res.render("home")});

app.post("/", function(req, res)
{ const password= req.body.password;
  const userPassword= new Password({
    password:password,
  });
  userPassword.save(function(err)
{if(err)
{console.log(err);}
else {res.redirect("/");}});
});


app.listen(5000, function()
{console.log("Connected");})
