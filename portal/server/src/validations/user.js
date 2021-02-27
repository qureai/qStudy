import Joi from 'joi';

const user_id = Joi.number()
  .required();

const email = Joi.string()
  .email()
  .message('email must in the format example@domain.com')
  .required();

const password = Joi.string()
  .regex(/^(?=.*[a-z])(?=.*\d)[a-zA-Z0-9!@#$%^&*]{6,16}$/)
  .message('password must be between 6-16 characters, ' +
    'one lowercase letter, one digit')
  .required();

export const signUp = Joi.object().keys({
  user_id,
  email,
  password
});

export const signIn = Joi.object().keys({
  email,
  password
});
