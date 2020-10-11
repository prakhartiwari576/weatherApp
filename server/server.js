var express=require('express');
const path = require('path')
var bodyParser =require('body-parser');
var {mongoose}=require('./db/mongoose.js');
var {Users}=require('./models/users');
const { google } = require('googleapis');
const OAuth2Data = require('./google_key.json')


const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)

//console.log(oAuth2Client);

var authed = false;


var app=express();
const port=process.env.PORT || 3000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: true
})); 
app.use(express.static(path.join(__dirname,'/../public')));


app.get('/home.html', (req, res) => {
    if (!authed) {
	   url="http://localhost:3000/index.html"
       res.redirect(url);
	} 
	else {
		res.redirect('/home.html');
        console.log("already loggedin");
    }
});

// app.all('/auth', function (req, res) {
//     console.log("we landed here after sign in");

// 	const code = req.query.code
// 	console.log(code);
//     if (code) {
//         // Get an access token based on our OAuth code
//         oAuth2Client.getToken(code, function (err, tokens) {
//             if (err) {
//                 console.log('Error authenticating')
//                 console.log(err);
//             } else {
//                 console.log('Successfully authenticated');
//                 oAuth2Client.setCredentials(tokens);
// 				authed = true;
// 				res.redirect('/home.html');
// 				console.log("successfullyy logged in");
//             }
//         });
// 	}
// 	else{
// 		res.send("hello");
// 	}
// });

app.post('/signup',(req,res)=>{
	
	Users.find({email : req.body.email}).exec().then(user=>{
		
		if(user.length >= 1 )
		{
		res.send("user already exists");
		return res.status(400);
	    }
		else{
			const user= new Users({
				email: req.body.email,
				password: req.body.password
			});
			user.save().then((doc)=>{
				res.send("User signed up successfully"); },(e)=>{
				res.status(400).send(e) });
		    }
	}).catch(err=>{
		alert(err);
	});
});
	
app.post('/login',(req,res)=>{
	Users.find({email : req.body.email,
		       password:req.body.password  }).then(user=>{
				   if(user.length >= 1)
				   {
		           res.send("User logged in successfully");
				   }
				   else{
					   res.send("invalid username or password");
				   }
	}).catch(err=>{
		alert(err);
	});
	
});

app.listen(port,()=>{
	console.log(`started at  port ${port}`);
});