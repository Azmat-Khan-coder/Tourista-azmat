function sessionAuth(req, res, next){
    res.locals.user = req.session.user;
    if(req.session.user){
        res.locals.role = req.session.user.role == "admin"? req.session.user.role: "";
    }
    else{
        res.locals.role = "";
    }
    next();
}

module.exports = sessionAuth;