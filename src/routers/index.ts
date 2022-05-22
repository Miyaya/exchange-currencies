import express from 'express';

const router = express.Router()
const exchange = require('./exchange')

router.use('/', exchange)

module.exports = router