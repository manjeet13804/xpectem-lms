import * as joi from 'joi';

export const verifySchema = joi.object().keys({
  token: joi.string().required(),
});

export const delNotifySchema = joi.object().keys({
  token: joi.string().required(),
  notifyIds: joi.array().items(
        joi.number(),
    ).min(1).required(),
});
