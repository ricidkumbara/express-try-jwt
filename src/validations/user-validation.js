import Joi from "joi"

const registerUserValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required()
})

const loginUserValidation = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
})

const updateUserValidation = Joi.object({
    name: Joi.string().required()
})

export {
    registerUserValidation,
    loginUserValidation,
    updateUserValidation
}