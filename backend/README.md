# Backend - Strategy Pattern Demo

Express.js backend server implementing the Strategy Design Pattern.

## Setup

```bash
npm install
npm run dev    # Development mode with auto-reload
npm start      # Production mode
```

Runs on `http://localhost:3000`

## Project Structure

```
src/
├── strategies/
│   ├── tax/
│   │   └── TaxStrategy.js        # Tax strategy implementations
│   ├── payment/
│   │   └── PaymentStrategy.js    # Payment strategy implementations
│   └── CheckoutContext.js        # Context class using strategies
├── controllers/
│   └── checkoutController.js     # Request handlers
├── routes/
│   └── api.js                    # API routes
└── server.js                     # Express app & server
```

## API Endpoints

### POST `/api/checkout`
Calculate checkout total with selected strategies

### GET `/api/checkout/strategies`
Get all available strategies

### GET `/api/health`
Health check endpoint

### GET `/`
Server info endpoint

## Strategy Pattern Implementation

### Tax Strategies
- `NoTaxStrategy` - 0% tax
- `VATTaxStrategy` - 10% VAT
- `USStateTaxStrategy` - 8% tax

### Payment Strategies
- `CODPaymentStrategy` - Fixed 30,000 VND fee
- `EWalletPaymentStrategy` - No fee
- `CreditCardPaymentStrategy` - 2% fee

### Context
`CheckoutContext` - Manages strategies and executes checkout logic

## How to Use

```javascript
import { CheckoutContext } from './strategies/CheckoutContext.js';

const checkout = new CheckoutContext(20000000);
checkout.setTaxStrategy('VAT');
checkout.setPaymentStrategy('CREDIT_CARD');
const result = checkout.executeCheckout();
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)

## Development

With `nodemon` installed, run:
```bash
npm run dev
```

Server will auto-restart on file changes.

## Testing

```bash
npm test
```

(Add test files in `src/**/*.test.js`)
