import Joi from 'joi';

export default function validationUser() {
    return Joi.object({
        name: Joi.string()
            .min(3)
            .max(250)
            .required()
            .messages({
                'string.base': 'Nome deve ser um texto',
                'string.empty': 'Nome não pode ser vazio',
                'string.min': 'Nome deve ter pelo menos 3 caracteres',
                'string.max': 'Nome deve ter no máximo 250 caracteres',
                'any.required': 'Nome é um campo obrigatório'
            }),
        email: Joi.string()
            .email()
            .required()
            .messages({
                'string.base': 'Email deve ser um texto',
                'string.empty': 'Email não pode ser vazio',
                'string.email': 'Email deve ser um email válido',
                'any.required': 'Email é um campo obrigatório'
            })
    });
}
