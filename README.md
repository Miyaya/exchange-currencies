# Exchange currencies
API for exchanging currency rates.

## Api Introduction
### GET /exchange
**Request**: `originCurrency`, `targetCurrency`, `amount`
**Response**: An equal amount in target currency (string)
> NOTE: `originCurrency`, `targetCurrency`, `amount` are all required.

### POST /loadrates
**Request body**: Required. Example:
```
{
    "currencies": {
        "TWD": {
            "TWD": 1,
            "JPY": 3.669,
            "USD": 0.03281
        },
        "JPY": {
            "TWD": 0.26956,
            "JPY": 1,
            "USD": 0.00885
        },
        "USD": {
            "TWD": 30.444,
            "JPY": 111.801,
            "USD": 1
        }
    }
}
```
**Response**: `success loaded exchange rate data`


## How to
- Clone this project
- Go to folder exchange-currencies
- Install dependencies
```
npm i
```
- Copy file `.env.example` to `.env` to set environmental variables (for now I uploaded as well)

#### Then you can choose
- Start Dev mode
```
npm run dev
```
- Or, build project
```
npm run build
node dist/app.js
```
- Open browser to `http://localhost:{port}/docs/` to use Swagger UI 
> NOTE: port default = 3000

- Once you run the application, do not forget to save exchange information in to run time: use API loadrates. Example body:
```
{
    "currencies": {
        "TWD": {
            "TWD": 1,
            "JPY": 3.669,
            "USD": 0.03281
        },
        "JPY": {
            "TWD": 0.26956,
            "JPY": 1,
            "USD": 0.00885
        },
        "USD": {
            "TWD": 30.444,
            "JPY": 111.801,
            "USD": 1
        }
    }
}
```