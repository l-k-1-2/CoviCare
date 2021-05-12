const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const {MongoClient}= require('mongodb');

app.use('/', express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine', 'ejs');

var results, len, id,obj;



async function main(collection) {

    const uri = "mongodb+srv://mydatabase:mydatabase@cluster0.ozajz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);


    try {
        await client.connect();

        // Make the appropriate DB calls
        //await createListing(client, val);
        const cursor = client.db("CoviCare").collection(collection).find();
        results = await cursor.toArray();
        // console.log(results);
        len = results.length;

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createListing(newListing, collection) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
    const uri = "mongodb+srv://mydatabase:mydatabase@cluster0.ozajz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        // Make the appropriate DB calls
        const result = await client.db("CoviCare").collection(collection).insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
        //await createListing(client, val);
        // console.log(results);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}

app.get('/', async function(req, res) {
    
    /*var url='https://firebasestorage.googleapis.com/v0/b/covicare-b2bc3.appspot.com/o/WhatsApp%20Image%202021-05-11%20at%209.06.04%20PM.jpeg?alt=media&token=553a7d2b-d40e-44ad-bd05-179acdddfb77';
    var content='India to extend interval between Covishield vaccine doses to up to eight weeks.';
    var val='{"url":"'+url+'","content":"'+content+'"}';
    val=JSON.parse(val);*/
    
    await main('Vaccination_Today');

    res.render(__dirname+'/views/index.ejs',{
        array: results,
        size: len
   });
    
})

app.get('/Covid-19', (req, res) => {
    res.sendFile(__dirname + '/views/covid.html');
})

app.get('/Statistics', (req, res) => {
    res.sendFile(__dirname + '/views/statistics.html');
})

app.get('/Vaccination', (req, res) => {
    res.sendFile(__dirname + '/views/vaccination.html');
})

app.get('/Donations', async(req, res) => {


    /*var name="Red Ribbon";
    var add="Vit,Vellore";
    var ph="+91 1234567890"
    var web="https://google.com"; 
    var insta="https://instagram.com";
    var fb="https://facebook.com";
    var map="https://google.com";
    var val='{"Name":"'+name+'","Address":"'+add+'","Phone":"'+ph+'","Website":"'+web+'","Instagram":"'+insta+'","Facebook":"'+fb+'","Geolocation":"'+map+'"}';
    val=JSON.parse(val);
    var results;
    console.log(val);*/

    await main('NGOs').catch(console.error);

    res.render(__dirname+'/views/donation.ejs',{
        array: results,
        size: len
   });

})

app.get('/Emergency-Contacts', (req, res) => {
    res.sendFile(__dirname + '/views/emergency.html');
})

app.get('/Contact-Us', (req, res) => {
    res.sendFile(__dirname + '/views/contactus.html');
})

obj={
    "_id":0,
    "NGO":"",
    "Name":"",
    "Age":"",
    "DOB":"",
    "Email":"",
    "Address":"",
    "Zipcode":"",
    "Phone":""
};
var ngo;
// obj=JSON.parse(obj);
app.get('/volunteer/:a',async(req,res)=>{
    console.log(req.params.a);

    res.render(__dirname+'/views/form.ejs',{
        name:req.params.a
    });

    ngo=req.params.a;
})

app.post('/submit',async(req,res)=>{
    console.log(req.body);
    const uri = "mongodb+srv://mydatabase:mydatabase@cluster0.ozajz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        // Make the appropriate DB calls
        //await createListing(client, val);
        const cursor = client.db("CoviCare").collection("Volunteers").find();
        results = await cursor.toArray();
        id = results.length;
    } catch (e) {
        id=0;
        console.error(e);
    } finally {
        await client.close();
    }
    obj._id=id;
    obj.NGO=ngo;
    obj.Name=req.body.Name; 
    obj.Age=req.body.Age;
    obj.DOB=req.body.DOB;
    obj.Address=req.body.Address;
    obj.Phone=req.body.Phone;
    obj.Zipcode=req.body.Zipcode;
    obj.Email=req.body.Email;
    createListing(obj,'Volunteers');
    res.sendFile(__dirname+'/views/submit.html');
})

var response={
    "_id":0,
    "Name":"",
    "Feedback":"",
    "Additional_info":""
}

app.post('/confirm',async(req,res)=>{
    console.log(req.body);
    const uri = "mongodb+srv://mydatabase:mydatabase@cluster0.ozajz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
    
    try {
        await client.connect();
        // Make the appropriate DB calls
        //await createListing(client, val);
        const cursor = client.db("CoviCare").collection("Responses").find();
        results = await cursor.toArray();
        id = results.length;
        
    } catch (e) {
        id=0;
        console.error(e);
    } finally {
        await client.close();
    }

    response._id=id;
    response.Name=req.body.Name; 
    response.Email=req.body.Email;
    response.Feedback=req.body.Feedback;
    response.Additional_info=req.body.Additional_info;
    createListing(response,'Responses');
    res.sendFile(__dirname+'/views/submit.html');
})


app.listen(3000, function () {
    console.log('listening on 3000')
})