const responseHandler = (status, msg) => {
  return (res, content) => {
    switch (status) {
      case 200:
        if (!content) {
          res.status(status).json({ message: msg || 'Ok' })
        } else {
          res.status(status).json(content)
        }
        break
      case 204:
        res.status(status).json()
        break
      case 400:
        res.status(status).json({ message: msg || 'Bad Request' })
        break
      case 401 || 403:
        res.status(status).json({ auth: false, message: msg || 'Unauthorized' })
        break
      case 404:
        res.status(status).json({ message: msg || 'Not found' })
        break
    }
  }
}
module.exports = responseHandler
