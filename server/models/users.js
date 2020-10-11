var mongoose =require('mongoose');
var Users =mongoose.model('users',{
	email:{
type:String
	},
	password:{
type:String
	}
});

module.exports={Users};