import ExchangeRate from '../models/exchangeRate';
import cache from '../repos/cache';

async function exchangeCurrency(originCurrency: string, targetCurrency: string, amount: number) {
    const destRates = await cache.getByCurrencyName(originCurrency)
    if (destRates) {
        const target = destRates.find(destRate =>
            destRate.currencyName === targetCurrency)
        if (target) {
            return numberWithCommas(target.rate * amount)
        }
        throw new Error('target currency not found')
    }
    throw new Error('origin currency not found')
}

function numberWithCommas(x: number) {
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function loadCurrencyInfo(arr: Array<ExchangeRate>) {
    try {
        cache.mset(arr)
    } catch (e) {
        throw e
    }
}

export { exchangeCurrency, loadCurrencyInfo, numberWithCommas };