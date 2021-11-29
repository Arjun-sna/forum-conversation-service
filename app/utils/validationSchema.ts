import Joi from "joi";

export const getConversationSchema = {
  query: Joi.object({
    page: Joi.number(),
    per_page: Joi.number(),
    type: Joi.string().valid("all", "trash"),
  }),
};
