export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
    errors: { label: 'key' },
  })
  if (error) {
    const details = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message.replace(/"/g, ''),
    }))

    return res.status(400).json({
      status: 'error',
      message: details.map((detail) => detail.message).join(', '),
      details,
    })
  }
  req.body = value
  next()
}
