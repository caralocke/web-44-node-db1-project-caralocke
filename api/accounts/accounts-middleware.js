const Accounts = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  const account = req.body;

  if (!account.name || !account.budget) {
    res.status(400).json({ message: "name and budget are required" })
  } else if (typeof(account.name) !== "string" ) {
    res.status(400).json({ message: "name of account must be a string" })
  } else if (account.name.trim().length < 3 || account.name.trim().length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" })
  } else if (typeof(account.budget) !== "number") {
    res.status(400).json({ message: "budget of account must be a number" })
  } else if (account.budget < 0 || account.budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" })
  } else {
    req.body.name = req.body.name.trim();
    next();
  }
}

exports.checkAccountNameUnique = (req, res, next) => {
  const {name} = req.body;

  if (!name || typeof(name) !== "string") {
    next();
  }

  accounts.getByName(name) 
    .then(resp => {
      if (resp === undefined || resp === null) {
        next();
      } else {
        res.status(400).json({
          message: "that name is taken"
        })
      }
    }).catch(next);
}

exports.checkAccountId = async (req, res, next) => {
  try {
  const { id } = req.params
  console.log(`the id is ${id}`)
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
