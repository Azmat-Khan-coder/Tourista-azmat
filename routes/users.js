var express = require('express');
var router = express.Router();
var {User} = require('../models/user');
var validateUser = require('../middleware/validateUser');
var bcrypt = require('bcryptjs');

/* GET users listing. */
router.get('/register', function(req, res, next) {
  let registration = {
    'emailErrMsg': "Email must follow this abc@uvw.xyz format.",
    'rName': "",
    'rEmail': "",
    'rPassword':"",
    'rPswrdErrMsg': "a password should between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"
  };
  res.render('users/register', {registration});
});
router.post('/register', validateUser, async function(req, res, next) {
  let user = await User.findOne({email: req.body.email});
  if(user){
    let registration = {
      'emailErrMsg': "User with this email is already exist",
      'rName': req.body.name,
      'rEmail': req.body.email,
      'rPassword':req.body.password,
      'rPswrdErrMsg': "a password should between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter"
    };
    return res.render('users/register', { registration });
  }
  user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;
  let salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  res.redirect('/');
});
// Login
router.get('/login', function(req, res, next) {
  let loginVar = {
    'emailErrMsg': "Enter Email",
    'lEmail': "",
    'lPassword': "",
    'pswrdErrMsg': "a password should between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter",
  };
  res.render('users/login', { loginVar });
});
router.post('/login', async function(req, res, next) {
  let user = await User.findOne({email:req.body.email});
  let loginVar = {
    'emailErrMsg': "User Not Registered",
    'lEmail': req.body.email,
    'lPassword': req.body.password,
    'pswrdErrMsg': "a password should between 7 to 16 characters which contain only characters, numeric digits, underscore and first character must be a letter",
  };
  if(!user) return res.render('users/login', {loginVar});
  let isValid = await bcrypt.compare(req.body.password, user.password);
  loginVar = {
    'emailErrMsg': "",
    'lEmail': req.body.email,
    'lPassword': req.body.password,
    'pswrdErrMsg': "Invalid Password",
  };
  if(!isValid) return res.render('users/login', {loginVar});
  req.session.user= user;
  if (user.role == "admin") return res.redirect('/tours/admin');
  res.redirect('/tours/user');
});
// Logout
router.get('/logout', function(req, res, next) {
  req.session.user= null;
  res.redirect('/users/login');
});

module.exports = router;
