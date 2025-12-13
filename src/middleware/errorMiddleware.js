const errorMiddleware = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'
  const details = err.details || undefined

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(err)
  }

  res.status(statusCode).json({
    message,
    ...(details ? { details } : {})
  })
}

export default errorMiddleware

