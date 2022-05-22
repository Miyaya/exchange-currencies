import Cache from '../cache';
import dotenv from 'dotenv';

dotenv.config();
const cache = new Cache(Number(`${process.env.TTL_CACHE}`));

describe('mset', () => {
    it('should save <originCurr, destRate[]> in cache', async () => {

        cache.cache.mset = jest.fn().mockImplementation();

        cache.mset(destRates);

        expect(cache.cache.mset).toHaveBeenCalledTimes(1);
        expect(cache.cache.mset).toBeCalledWith([
            { key: currTWD.currencyName, val: currTWD.destRates },
            { key: currJPY.currencyName, val: currJPY.destRates },
            { key: currUSD.currencyName, val: currUSD.destRates }]);
    })
});

describe('getAll', () => {
    it('should get all exchanging info', async () => {
        let currKeys = [currTWD.currencyName, currJPY.currencyName, currUSD.currencyName];
        cache.cache.keys = jest.fn().mockReturnValue(currKeys);
        cache.cache.get = jest.fn()
            .mockReturnValueOnce(currTWD)
            .mockReturnValueOnce(currJPY)
            .mockReturnValueOnce(currUSD);
        let res = await cache.getAll();

        expect(cache.cache.keys).toHaveBeenCalledTimes(1);
        expect(res).toEqual(destRates);
        expect(cache.cache.get).toBeCalledTimes(3);
        expect(cache.cache.get).toHaveBeenCalledWith(currTWD.currencyName);
        expect(cache.cache.get).toHaveBeenCalledWith(currJPY.currencyName);
        expect(cache.cache.get).toHaveBeenCalledWith(currUSD.currencyName);
    })
});


const currTWD = {
    currencyName: 'TWD',
    destRates: [
        { currencyName: 'TWD', rate: 1 },
        { currencyName: 'JPY', rate: 3.669 },
        { currencyName: 'USD', rate: 0.03281 }
    ]
}
const currJPY = {
    currencyName: 'JPY',
    destRates: [
        { currencyName: 'TWD', rate: 0.26956 },
        { currencyName: 'JPY', rate: 1 },
        { currencyName: 'USD', rate: 0.00885 }
    ]
}
const currUSD = {
    currencyName: 'USD',
    destRates: [
        { currencyName: 'TWD', rate: 30.444 },
        { currencyName: 'JPY', rate: 111.801 },
        { currencyName: 'USD', rate: 1 }
    ]
}
const destRates = [currTWD, currJPY, currUSD]