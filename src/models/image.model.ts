export const ImagenSchema = Joi.object({
  titulo: Joi.string().required(),
  descripcion: Joi.string().required(),
  imagePath: Joi.number().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});
