const db = require('../../data/db-config')

async function getAll() {
  return await db('accounts')
}

const getById = (id) => {
  const account = db('accounts').where('id', id).first()
  return account
}

const create = async (account) => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert(account)
  const newAccount = await getById(id)
  return newAccount
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = id => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
