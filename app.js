const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const {MongoClient}= require('mongodb');
const uri = "mongodb+srv://mydatabase:mydatabase@cluster0.ozajz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use('/', express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended:true
}));
app.set('view engine', 'ejs');


var results, len, id,obj;

async function main(collection) {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const cursor = client.db("CoviCare").collection(collection).find();
        results = await cursor.toArray();
        len = results.length;

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createListing(newListing, collection) {
    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#insertOne for the insertOne() docs
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const cursor = client.db("CoviCare").collection(collection).find();
        results = await cursor.toArray();
        console.log(results.length);
        newListing._id = results.length;
        const result = await client.db("CoviCare").collection(collection).insertOne(newListing);
        console.log(`New listing created with the following id: ${result.insertedId}`);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}

app.get('/', async function(req, res) {
    await main('Vaccination_Today');

    res.render(__dirname+'/views/home.ejs',{
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

app.get('/volunteer/:a',async(req,res)=>{
    console.log(req.params.a);

    res.render(__dirname+'/views/form.ejs',{
        name:req.params.a
    });

    ngo=req.params.a;
})

app.post('/submit',async(req,res)=>{
    console.log(req.body);

    obj._id=id;
    obj.NGO=ngo;
    obj.Name=req.body.Name; 
    obj.Age=req.body.Age;
    obj.DOB=req.body.DOB;
    obj.Address=req.body.Address;
    obj.Phone=req.body.Phone;
    obj.Zipcode=req.body.Zipcode;
    obj.Email=req.body.Email;

    await createListing(obj,'Volunteers');
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

    response._id=id;
    response.Name=req.body.Name; 
    response.Email=req.body.Email;
    response.Feedback=req.body.Feedback;
    response.Additional_info=req.body.Additional_info;
    createListing(response,'Responses');
    res.sendFile(__dirname+'/views/submit.html');
})

app.listen(process.env.PORT || 5000)