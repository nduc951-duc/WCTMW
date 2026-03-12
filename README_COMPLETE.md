# 🛍️ TechStore E-Commerce Platform

## 📋 Project Overview

A full-stack e-commerce checkout system demonstrating the **Strategy Design Pattern** for:
- **Customer Type Strategy**: Different pricing & tax calculations (Personal, B2B, Education)
- **Payment Strategy**: Multiple payment methods with different fee structures
- **Tax Strategy**: Flexible tax calculations based on customer type

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── pages/                    # Page components
│   │   ├── ProductPage.jsx       # Product browsing page
│   │   └── CheckoutPage.jsx      # Payment & checkout page
│   ├── components/
│   │   ├── payment/              # Payment-related components
│   │   │   ├── CheckoutHeader.jsx
│   │   │   ├── PaymentOptions.jsx
│   │   │   ├── CartSummary.jsx
│   │   │   └── StrategySelectors.jsx
│   │   └── products/             # Product-related components
│   │       └── ProductList.jsx
│   ├── context/
│   │   └── CartContext.jsx       # Global cart state
│   ├── hooks/
│   │   └── useCart.js            # Cart hook
│   ├── utils/
│   │   └── priceCalculation.js   # Price & tax calculations
│   ├── services/
│   │   └── api.js                # API integration
│   ├── App.jsx                   # Router setup
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles

backend/
├── src/
│   ├── strategies/
│   │   ├── tax/                  # Tax strategies
│   │   │   └── TaxStrategy.js
│   │   └── payment/              # Payment strategies
│   │       └── PaymentStrategy.js
│   ├── controllers/
│   │   └── checkoutController.js
│   ├── routes/
│   └── server.js
```

## 🎯 Key Features

### 1. **Shopping Management**
- ✅ Browse tech products (8+ items)
- ✅ Add products to cart with quantity tracking
- ✅ Real-time cart count in header
- ✅ Dynamic price calculation

### 2. **Customer Type Strategy**
- **👤 Personal**: Price includes 10% VAT (no extra tax shown)
- **🏢 B2B**: Separate VAT (10%) for tax deduction
- **🎓 Education**: Preferential tax rate (5%)

### 3. **Payment Methods**
- 💳 Credit Card (with form)
- 🅿️ PayPal
- 🔵 Google Pay
- 💵 Cash on Delivery

### 4. **UI/UX**
- Modern, clean design with Tailwind CSS
- Responsive layout (mobile & desktop)
- Real-time cart updates
- Progress indicators
- Error handling & loading states

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Access at: `http://localhost:5173` (or next available port)

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Runs on: `http://localhost:3000`

## 📊 How It Works

### User Flow
1. **Browse Products** → Select items and add to cart
2. **Select Cart** → Navigate to checkout page
3. **Choose Customer Type** → Personal, B2B, or Education
4. **Select Payment** → Choose payment method
5. **Review & Pay** → Verify order and complete payment

### State Management
- **CartContext**: Global cart state with add/remove/update methods
- **Local State**: Customer type, payment method in CheckoutPage
- **useCart Hook**: Easy access to cart operations

### API Integration
```javascript
POST /api/checkout
{
    amount: number,
    customerTypeStrategy: 'PERSONAL' | 'BUSINESS' | 'EDUCATION',
    paymentStrategy: 'CREDIT_CARD' | 'PAYPAL' | 'GOOGLE_PAY' | 'COD'
}
```

## 🎨 Design Patterns

### 1. **Strategy Pattern** (Core)
Different strategies for:
- Customer types (pricing rules)
- Payment processing
- Tax calculation

### 2. **Context API** (State Management)
Global cart state without Redux

### 3. **Custom Hooks** (useCart)
Abstraction of cart operations

### 4. **Composition** (React Components)
Modular, reusable components

## 📝 Components Reference

### ProductPage
- Header with cart count
- Product grid with add-to-cart buttons
- Footer with links
- Navigation to checkout

### CheckoutPage
- Customer type selector
- Payment options
- Cart summary with dynamic pricing
- Order total based on strategy

### CartSummary
- Real-time item list
- Subtotal, tax, shipping breakdown
- Tax policy explanation
- Total amount

### PaymentOptions
- 4 payment methods
- Credit card form (conditional)
- Radio selection with highlighting

## 🔧 Utility Functions

### `formatPrice(price)`
Formats numbers as currency (e.g., `$1,234.56`)

### `calculateCheckoutTotal(items, customerType)`
Returns breakdown: subtotal, tax, shipping, total with notes

### `getTaxAmount(total, strategy)`
Calculates tax based on customer type

## 🌐 API Endpoints

### POST /api/checkout
```javascript
// Request
{
    amount: 2500000,
    customerTypeStrategy: 'BUSINESS',
    paymentStrategy: 'CREDIT_CARD'
}

// Response
{
    success: true,
    data: {
        orderId: 'ORD123',
        amount: 2500000,
        taxAmount: 250000,
        finalTotal: 2750000,
        timestamp: '2024-03-12T...'
    }
}
```

## 🎮 Testing the App

### Test Scenarios
1. **Add Products to Cart**
   - Click "Add to Cart" on 2-3 products
   - Verify count in checkout button
   
2. **Personal Customer**
   - Verify tax is included in subtotal
   - No separate tax line shown
   
3. **B2B Customer**
   - Verify separate VAT line (10%)
   - Total = subtotal + tax
   
4. **Education Customer**
   - Verify lower tax (5%)
   - Check tax policy note

5. **Payment Methods**
   - Select each payment option
   - Verify credit card form appears

## 🐛 Troubleshooting

### Port Already In Use
```bash
# Find and kill process
lsof -i :5173
kill -9 <PID>
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### API Not Connecting
- Ensure backend is running on port 3000
- Check CORS settings in backend
- Verify network connection

## 🚀 Future Enhancements

- [ ] User authentication & authorization
- [ ] Order history & tracking
- [ ] Coupon/discount code system
- [ ] Product reviews & ratings
- [ ] Inventory management
- [ ] Multiple payment gateway integration
- [ ] Admin dashboard
- [ ] Database persistence
- [ ] Email notifications
- [ ] Mobile app version

## 📚 Technologies Used

### Frontend
- React 19
- React Router v6
- Tailwind CSS
- Vite
- Context API

### Backend
- Node.js
- Express.js
- CORS
- nodemon

### Tools
- ESLint
- PostCSS
- Autoprefixer

## 📄 License

MIT License - Feel free to use this project for learning purposes.

## 👥 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Happy Coding! 🚀**
