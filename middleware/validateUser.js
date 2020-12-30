var {validateUserData} = require('../models/user');

function validateUser(req, res, next){
    let {error} = validateUserData(req.body);
    if (error){
        res.locals.message = error.details[0].message;
        res.locals.status = 400;
        return res.render('error');
    }
    next();
}

module.exports = validateUser;