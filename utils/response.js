const response = {
  success : (res, {code, data, message}) => {
    res.status(code).json({
      success: true,
      code,
      payload: data,
      message
    })
  },

  error: (res,{code, message, error}) => {
    res.status(code).json({
      success: false,
      code,
      message,
      error
    })
  },

  custom: (res, {code, data, message}) => {
    res.status(code).json({
      success: false,
      code,
      payload: data,
      message
    })
  }
}

export default response