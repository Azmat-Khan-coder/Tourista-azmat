const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const tourSchema = mongoose.Schema({
    title:String,
    noOfDays:Number,
    perHeadPrice:Number,
});
const Tour = mongoose.model("Tour", tourSchema);

function validateTourData(data) {
    const schema = Joi.object({
        title: Joi.string().min(3).max(30).required(),
        noOfDays: Joi.number().positive().required(),
        perHeadPrice: Joi.number().positive().required(),
    });
    return schema.validate(data, { abortEarly: false});
}

module.exports.Tour = Tour;
module.exports.validateTourData = validateTourData;