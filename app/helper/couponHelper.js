var couponModel = require('../models/coupon');
var accountModel = require('../models/account');

/*
var CouponSchema = new Schema({
  start_date : {type:String},
  end_date : {type:String},
  promote : {type:String},
  store_name: { type: String },
  image_url : {type:String},
  store_address : {city:{type:String}, state:{type:String}, Zip:{type:Number}},
  store_contact : {email : {type:String},phone:{type:String}},
  image :  {type:String},
  creator_id : {type:String}


});
 */
var couponModule = function()
{
	var self = this;
	var temp = {};
	var limit = 5;
	var offset = 0;
	var where = {};
	var associate = null;

self.addToUser  =function(uid)
{
	associate = uid;
	return this;
}
self.setLimit = function(l)
{
	if(l != undefined)
	{
	limit = l;
}
return this;
};
self.setOffset = function(o)
{
if(o != undefined)
{
offset = o;
}
return this;
}
self.setWhere = function(w)
{
	where = w;
	return this;
}
self.findArray = function(array,callback)
{
	couponModel.find({"_id": { $in : array}}, function(e,r){

		callback(e,r);
	})

}
self.share = function(cid)
{

}
self.find =function(cb)
{

var q = couponModel.find(where).limit(limit).skip(offset);
q.exec(function(err, results) {
cb(err,results)
});
return this;
}
self.findOne =function(cb)
{

var q = couponModel.findOne(where).limit(limit).skip(offset);
q.exec(function(err, results) {
cb(err,results)
});
return this;
}


	self.set = function(param,val)
	{
	temp[param] = val;
	return self;
	}

	self.create = function(obj,callback)
	{



var newCoupon = new couponModel(obj);
newCoupon.save(function(e){
	if(e)
	{
		console.log('error');
	callback(e,newCoupon);
	return;
}

if(associate)
{
	var q = accountModel.findOne({_id:associate});

	q.exec(function(e,r){
		r.merchantCoupons.push(newCoupon._id);
		r.save(function(e){
			console.log('coupon pushed')
			callback(e,newCoupon);
			return;
		})
	})
}else{
callback({message:'saved'});
}

});


	};
	self.remove = function(callback)
	{
console.log(where)
couponModel.findOne(where, function(e,r)
{
	console.log(e)
	if(r)
	{
	r.remove()
}
callback();

})






		return self;
	};


return {
	set : self.set,
	create : self.create,
	remove : self.remove,
	find : self.find,
	findOne : self.findOne,
	where : self.setWhere,
	limit : self.setLimit,
	offset : self.setOffset,
	addToUser : self.addToUser,
	loadUserCoupons : self.findArray,
	loadSharedCoupons : self.findArray,
	loadAllCoupons : self.find

}
}


module.exports= couponModule;