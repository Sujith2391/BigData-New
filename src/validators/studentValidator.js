import Joi from 'joi'

const marksSchema = Joi.number().min(0).max(100)

export const createStudentSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  usn: Joi.string().trim().uppercase().regex(/^[A-Z0-9]{6,12}$/).required()
    .messages({
      'string.pattern.base': 'usn must be alphanumeric (6-12 uppercase characters)'
    }),
  email: Joi.string().email().optional(),
  department: Joi.string().trim().min(2).max(50).required(),
  semester: Joi.number().integer().min(1).max(8).required(),
  marks: marksSchema.required(),
  subjects: Joi.array().items(
    Joi.object({
      code: Joi.string().trim().min(2).max(10).required(),
      name: Joi.string().trim().min(2).max(100).required(),
      marks: marksSchema.required()
    })
  ).default([])
})

export const updateStudentSchema = createStudentSchema.fork(
  ['name', 'usn', 'department', 'semester', 'marks'],
  schema => schema.optional()
)

export const querySchema = Joi.object({
  minMarks: marksSchema.optional(),
  maxMarks: marksSchema.optional(),
  sort: Joi.string().valid('asc', 'desc').optional(),
  department: Joi.string().trim().optional(),
  semester: Joi.number().integer().min(1).max(8).optional(),
  limit: Joi.number().integer().min(1).max(100).optional()
})

