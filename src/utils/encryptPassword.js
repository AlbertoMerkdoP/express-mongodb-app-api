const bcrypt = require('bcryptjs')

const encrypt = async (textoPlano) => {
  const hash = await bcrypt.hash(textoPlano, 10)
  return hash
}

const compare = async (textoPlano, hashPassword) => {
  return await bcrypt.compare(textoPlano, hashPassword)
}

module.exports = { encrypt, compare }
