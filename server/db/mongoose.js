var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://<add access>@cluster0-nauop.mongodb.net/Users?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://vasujain314:3vAGvcl4GPdevicesUXo69W@cluster0-nauop.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });



module.exports = {mongoose};
