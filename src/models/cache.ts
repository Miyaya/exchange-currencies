import NodeCache from 'node-cache';
import DestRate from './destRate';
import ExchangeRate from './exchangeRate';

class Cache {

    cache: NodeCache;

    constructor(ttlSeconds: number) {
        this.cache = new NodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2,
            useClones: false
        });
    }

    mset(exchangeRates: ExchangeRate[]) {
        let dict = new Array;
        exchangeRates.forEach(exchangeRate =>
            dict.push({ key: exchangeRate.currencyName, val: exchangeRate.destRates }));
        this.cache.mset(dict);
    }

    async getByCurrencyName(currencyName: string) {
        let res: Array<DestRate> | undefined
        const key = currencyName
        res = this.cache.get(key)
        return res;
    }

    async getAll() {
        let res: Array<any> = []
        const keys = this.cache.keys();
        keys.forEach(key => {
            let obj = this.cache.get(key);
            if (obj !== undefined) {
                res.push(obj);
            }
        });
        return res;
    }
}

export default Cache;