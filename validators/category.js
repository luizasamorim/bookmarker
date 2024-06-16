const Joi = require("joi")

const categoryValidator = Joi.object({
    name: Joi.string().required(),
    color: Joi.string().required(),
    userId: Joi.number().required(),
})
  
module.exports = categoryValidator