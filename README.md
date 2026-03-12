# Strategy Pattern Demo - Full Stack

A comprehensive demonstration of the **Strategy Design Pattern** using a full-stack application with React frontend and Node.js/Express backend.

## 📁 Project Structure

```
strategy-demo/
├── frontend/               # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable React components
│   │   │   ├── Cart.jsx
│   │   │   ├── StrategySelectors.jsx
│   │   │   └── ResultPanel.jsx
│   │   ├── services/      # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── backend/               # Express.js server
│   ├── src/
│   │   ├── strategies/    # Strategy Pattern Implementation
│   │   │   ├── tax/
│   │   │   │   └── TaxStrategy.js
│   │   │   ├── payment/
│   │   │   │   └── PaymentStrategy.js
│   │   │   └── CheckoutContext.js
│   │   ├── controllers/   # Request handlers
│   │   │   └── checkoutController.js
│   │   ├── routes/        # API routes
│   │   │   └── api.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## 🎯 What is the Strategy Pattern?

The **Strategy Pattern** is a behavioral design pattern that:
- Defines a family of algorithms
- Encapsulates each one of them
- Makes them interchangeable
- Lets the algorithm vary independently from clients that use it

### Real-world example in this project:
- **Tax Calculation**: Different countries/regions have different tax rules
- **Payment Methods**: Different payment methods have different fees and processing

## ✨ Key Features

### Tax Strategies
- **NO_TAX**: No tax applied (0%)
- **VAT**: Value Added Tax (10%)
- **US_STATE**: US State Tax (8%)

### Payment Strategies
- **COD**: Cash On Delivery (Fixed fee: 30,000 VND)
- **E_WALLET**: E-Wallet payment (No fee)
- **CREDIT_CARD**: Credit Card (2% fee)

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Start development server
npm run dev

# Or start production server
npm start
```

Backend runs on `http://localhost:3000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Frontend runs on `http://localhost:5173`

## 📚 API Documentation

### POST `/api/checkout`
Calculate checkout total with selected strategies

**Request:**
```json
{
  "amount": 20000000,
  "taxStrategy": "VAT",
  "paymentStrategy": "CREDIT_CARD"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD_1234567890",
    "amount": 20000000,
    "taxAmount": 2000000,
    "taxStrategy": "VAT",
    "paymentFee": 400000,
    "paymentStrategy": "CREDIT_CARD",
    "subtotal": 22000000,
    "finalTotal": 22400000,
    "paymentResult": {
      "method": "CREDIT_CARD",
      "status": "processing",
      "total": 22400000,
      "authorization": "AUTH_1234567890"
    },
    "timestamp": "2026-03-12T10:30:00.000Z"
  }
}
```

### GET `/api/checkout/strategies`
Get all available strategies

**Response:**
```json
{
  "taxStrategies": [
    { "name": "NO_TAX", "description": "No tax (0%)", "rate": 0 },
    { "name": "VAT", "description": "Value Added Tax (10%)", "rate": 10 },
    { "name": "US_STATE", "description": "US State Tax (8%)", "rate": 8 }
  ],
  "paymentStrategies": [
    { "name": "COD", "description": "Cash On Delivery", "fee": 30000 },
    { "name": "E_WALLET", "description": "E-Wallet (No fee)", "fee": 0 },
    { "name": "CREDIT_CARD", "description": "Credit Card (2% fee)", "feePercent": 2 }
  ]
}
```

## 🏗️ Backend Architecture

### Strategy Pattern Implementation

The backend uses Strategy Pattern to handle different tax and payment calculations:

```javascript
// Create context
const checkout = new CheckoutContext(amount);

// Set strategies
checkout.setTaxStrategy('VAT');
checkout.setPaymentStrategy('CREDIT_CARD');

// Execute with selected strategies
const result = checkout.executeCheckout();
```

### Key Classes

1. **TaxStrategy** - Base class for tax strategies
   - NoTaxStrategy
   - VATTaxStrategy
   - USStateTaxStrategy

2. **PaymentStrategy** - Base class for payment strategies
   - CODPaymentStrategy
   - EWalletPaymentStrategy
   - CreditCardPaymentStrategy

3. **CheckoutContext** - Context that uses strategies
4. **TaxStrategyFactory** - Creates appropriate tax strategy
5. **PaymentStrategyFactory** - Creates appropriate payment strategy

## 🧪 How to Test

1. Start both backend and frontend servers
2. Open frontend in browser: `http://localhost:5173`
3. Select different tax and payment strategies
4. Watch as the total changes based on the selected strategies
5. Check backend console to see Strategy Pattern execution flow

## 📝 Code Examples

### Using Tax Strategy
```javascript
const taxStrategy = new VATTaxStrategy();
const tax = taxStrategy.calculateTax(20000000); // 2,000,000
```

### Using Payment Strategy
```javascript
const paymentStrategy = new CreditCardPaymentStrategy();
const fee = paymentStrategy.calculateFee(20000000); // 400,000
```

### Using Checkout Context
```javascript
const checkout = new CheckoutContext(20000000);
checkout.setTaxStrategy('VAT');
checkout.setPaymentStrategy('CREDIT_CARD');
const result = checkout.executeCheckout();
```

## 💡 Benefits of Strategy Pattern

1. **Flexibility**: Easily add new tax or payment strategies
2. **Maintainability**: Each strategy is isolated and independent
3. **Testability**: Easy to test individual strategies
4. **Scalability**: New strategies can be added without modifying existing code
5. **Runtime Selection**: Choose strategies at runtime based on conditions

## 🔧 Technology Stack

### Frontend
- React 19
- Vite
- Material-UI
- ESLint

### Backend
- Node.js
- Express.js
- CORS

## 📄 License

MIT

---

**Happy coding! 🚀**
