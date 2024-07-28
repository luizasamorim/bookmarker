const Joi = require("joi")

const userValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
    .pattern(new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).*$')), //um número, um símbolo e uma letra maiúscula
    admin: Joi.boolean().valid(false).default(false),
})
  
module.exports = userValidator