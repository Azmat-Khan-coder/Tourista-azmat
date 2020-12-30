var express = require('express');
var router = express.Router();
var {Tour} = require("../models/tour");
var {validateTour, validateTourId} = require('../middleware/validateTour');
var checkSessionAuth = require('../middleware/checkSessionAuth');


/* GET Tour page. */
router.get('/admin', async function(req, res, next) {
  // let totalRecords = await Tour.count();
  // // console.log(totalRecords);
  // let page = Number(req.query.page ? req.query.page : 1);
  // let perPage = Number(req.query.perPage ? req.query.perPage : 5);
  // let skipRecord = perPage*(page-1);
  // let tours = await Tour.find().skip(skipRecord).limit(perPage);
  let tours = await Tour.find();
  res.render('tours/list', { tours });
});
router.get('/user', async function(req, res, next) {
  let tours = await Tour.find();
  res.render('tours/userView', { tours});
});
//Route for Add
router.get('/add', checkSessionAuth, async function(req, res, next) {
  res.render('tours/add');
});
router.post('/add', validateTour, async function(req, res, next) {
  let tour = new Tour(req.body);
  await tour.save();
  res.redirect('/tours/admin');
});
//Route For delete
router.get('/delete/:id', validateTourId, async function(req, res, next) {
  let tour = await Tour.findByIdAndDelete(req.params.id);
  res.redirect('/tours/admin');
});
//Route for Edit
router.get('/edit/:id', validateTourId, async function(req, res, next) {
  let tour = await Tour.findById(req.params.id);
  res.render('tours/edit', { tour });
});
router.post('/edit/:id',  validateTour, async function(req, res, next) {
  let tour = await Tour.findById(req.params.id);
  tour.title = req.body.title;
  tour.noOfDays = req.body.noOfDays;
  tour.perHeadPrice = req.body.perHeadPrice;
  await tour.save();
  res.redirect("/tours/admin");
});
// router.get('*', async function(req, res, next) {
//   res.locals.message = "Oops Page Not Found";
//   res.locals.status = 404;
//   res.render('error');
// });
module.exports = router;
