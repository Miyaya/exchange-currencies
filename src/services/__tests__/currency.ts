import { exchangeCurrency, numberWithCommas } from '../currency';
import cache from '../../repos/cache';

describe('exchangeCurrency', () => {
    it('should get destination currency info by origin currency name', async () => {
        cache.getByCurrencyName = jest.fn().mockResolvedValue(mockTwdDestRates);

        const actualValue = await exchangeCurrency('TWD', 'JPY', 200);

        expect(cache.getByCurrencyName).toHaveBeenCalledTimes(1);
        expect(cache.getByCurrencyName).toBeCalledWith('TWD');
        expect(actualValue).toEqual('733.80');
    })
})

describe('exchangeCurrency', () => {
    it('should throw exception when origin currency not found', async () => {
        cache.getByCurrencyName = jest.fn().mockResolvedValue(undefined);

        expect(async () => { await exchangeCurrency('TWD', 'JPY', 200) })
            .rejects
            .toBeInstanceOf(Error('origin currency not found'))
    })
})

describe('exchangeCurrency', () => {
    it('should throw exception when target currency not found', async () => {
        cache.getByCurrencyName = jest.fn().mockResolvedValue(mockTwdDestRates);

        expect(async () => { await exchangeCurrency('TWD', 'EUR', 200) })
            .rejects
            .toBeInstanceOf(Error('target currency not found'))
    })
})

describe('numberWithCommas', () => {
    it('should split number with comma per 3 digit', async () => {

        let res = numberWithCommas(1000000000)
        expect(res).toEqual('1,000,000,000')
    })
})

describe('numberWithCommas', () => {
    it('should keep 2 digit under 0', async () => {

        let res = numberWithCommas(1001.019374293)
        expect(res).toEqual('1,001.02')
    })
})

const mockTwdDestRates = [
    { currencyName: 'TWD', rate: 1 },
    { currencyName: 'JPY', rate: 3.669 },
    { currencyName: 'USD', rate: 0.03281 }
]
