const Joi = require("joi")

const queryValidator = Joi.object({
    limit: Joi.number().integer().valid(5,10,30).default(30),
    page: Joi.number().integer().default(1)
})
  
module.exports = queryValidator