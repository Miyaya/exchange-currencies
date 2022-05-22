import DestRate from "./destRate";

class ExchangeRate {
    currencyName: string;
    destRates: Array<DestRate>;

    constructor(currencyName: string, destRates: Array<DestRate>) {
        this.currencyName = currencyName, this.destRates = destRates
    }
}

export default ExchangeRate;