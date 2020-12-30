var { validateTourData } = require('../models/tour');
var {Tour} = require('../models/tour');

function validateTour(req, res, next){
    let {error} = validateTourData(req.body);
    if(error) return res.render('error', { message: error.details[0].message});
    next();
}

async function validateTourId(req, res, next){
    try {
        let tour = await Tour.findById(req.params.id);
        status = "Error: 400 Bad Request";
        message = "Tour with given Id is not present";
        if(!tour) return res.render('error', { status, message });
        next();
      } catch (error) {
            status = "Error: 400 Bad Request";
            message = "Invalid Id";
        res.render('error', { status, message});
      }
}
module.exports.validateTour = validateTour;
module.exports.validateTourId = validateTourId;