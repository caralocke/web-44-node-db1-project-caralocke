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
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id)
}

const deleteById = id => {
  return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
