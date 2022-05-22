import express from 'express';
import httpStatus from 'http-status';
import DestRate from '../models/destRate';
import ExchangeRate from '../models/exchangeRate';
import { exchangeCurrency, loadCurrencyInfo } from '../services/currency';
const router = express.Router()

router.get('/', (req: express.Request, res: express.Response) => {
    res.send('The server is working!');
})

router.get('/exchange', async (req: express.Request, res: express.Response) => {
    let amountRes: String = ''
    try {
        if (req.query.originCurrency == undefined || req.query.targetCurrency == undefined || req.query.amount == undefined) {
            res.sendStatus(httpStatus.BAD_REQUEST)
        } else {
            let amountNum: number = +req.query.amount
            amountRes = await exchangeCurrency(
                `${req.query.originCurrency}`, `${req.query.targetCurrency}`, amountNum);
        }
    } catch (e) {
        res.send(httpStatus.INTERNAL_SERVER_ERROR + String(e))
    }

    res.send(amountRes)
});

router.post('/loadrates', async (req: express.Request, res: express.Response) => {
    if (!req.body || !req.body.currencies) {
        res.sendStatus(httpStatus.BAD_REQUEST)
    } else {
        let currencies = req.body.currencies
        let arr: Array<ExchangeRate> = []

        Object.keys(currencies).map(function (originCurrKey) {
            let destRates: Array<DestRate> = []
            Object.keys(currencies[originCurrKey]).map(function (targetCurrKey) {
                destRates.push(new DestRate(targetCurrKey, currencies[originCurrKey][targetCurrKey]))
                return destRates
            })
            arr.push(new ExchangeRate(originCurrKey, destRates))
            return arr;
        });

        loadCurrencyInfo(arr)
    }
    res.send('success loaded exchange rate data')
})

module.exports = router