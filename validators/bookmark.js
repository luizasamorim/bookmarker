const Joi = require("joi")

const bookmarkValidator = Joi.object({
    title: Joi.string().required(),
    link: Joi.string().required(),
    lastAccess: Joi.date(),
    userId: Joi.number().required(),
    categoryId: Joi.number().required()
})
  
module.exports = bookmarkValidator