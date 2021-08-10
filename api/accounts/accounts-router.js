const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: err.message})
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
 res.json(req.account)
})

router.post('/', checkAccountPayload, (req, res, next) => {
    const account = Accounts.create(req.body)
    if (account) {
    res.status(201).json({
      message: 'success! You have created a new account!', account
    })
  } else {
    res.status(404).json({ message: 'account not found'})
  }
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
