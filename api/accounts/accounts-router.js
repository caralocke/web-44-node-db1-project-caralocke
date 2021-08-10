const router = require('express').Router()
const Accounts = require('./accounts-model')
const { checkAccountPayload, checkAccountNameUnique, checkAccountId } = require('./accounts-middleware')
const dbConfig = require('../../data/db-config')

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
 res.json(req.account)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
   try {
     const newAccount = await Accounts.create(req.body)
     res.status(201).json(newAccount)
   } catch (err) {
     next(err)
   }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  const updated = await Accounts.updateById(req.params.id, req.body)
  res.json(updated)
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message})
})

module.exports = router;
