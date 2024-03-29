var express=require("express")
var bodyParser=require("body-parser")
var mongoose=require("mongoose")
const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology:true

});
var db=mongoose.connection;
db.on('error',()=>{
    console.log("Error in connecting to the database");
})
db.once('open', ()=>{
    console.log("Connected with Database!");

})

app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone=req.body.phone;
    var password=req.body.password;
    var data={
        "name":name,
        "email":email,
        "phno":phone,
        "password":password
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("recored inserted successfully");
    });
    return res.redirect('signup_success.html')
})




app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')

}).listen(3000);
console.log("listening on 3000");

