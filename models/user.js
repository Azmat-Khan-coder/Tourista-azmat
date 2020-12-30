var mongoose = require("mongoose");
const Joi = require('@hapi/joi');

var UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role:{
    type:String,
    default: "user",
  }
});
const User = mongoose.model("User", UserSchema);

function validateUserData(data){
  const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(0).regex(/^[A-Za-z]\w{7,14}$/).required(),
  });
  return schema.validate(data, { abortEarly: false});
}
module.exports.User = User;
module.exports.validateUserData = validateUserData;
