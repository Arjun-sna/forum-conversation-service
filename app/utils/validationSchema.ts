import Joi from "joi";

export const getConversationsSchema = {
  query: Joi.object({
    page: Joi.number(),
    per_page: Joi.number(),
    type: Joi.string().valid("all", "trash"),
  }),
};

export const createConversationSchema = {
  body: Joi.object({
    subject: Joi.string().min(3).required(),
    toUserId: Joi.number().required(),
    message: Joi.string(),
  }).required(),
};

export const conversationIdParamSchema = {
  params: Joi.object({
    conversationId: Joi.number().required(),
  }).required(),
};

export const addMessageSchema = {
  body: Joi.object({
    message: Joi.string().required(),
  }).required(),
  params: Joi.object({
    conversationId: Joi.number().required(),
  }).required(),
};

export const userCreateSchema = Joi.object({
  id: Joi.number().required(),
  username: Joi.string().required(),
  email: Joi.string().required(),
}).required();
