const Accounts = require('./accounts-model')
const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  const error = { status: 400 }

  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof name !== "string" ) {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (name.trim().length < 3 || name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof budget !== "number" || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else if (error.message) {
    next(error)
  } else {
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name.trim()).first()
    if(existing) {
      next({status: 400, message: 'that name is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
  const { id } = req.params
  const account = await Accounts.getById(id)
  if (account) {
    req.account = account
    next()
  } else {
    next({
      status: 404,
      message: 'account not found'
    })
  }
  } catch(err) {
    next(err)
  }
}
