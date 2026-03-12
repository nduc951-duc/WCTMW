import { CheckoutContext } from '../strategies/CheckoutContext.js';

export const checkout = (req, res) => {
  // Phải dùng đúng key 'customerTypeStrategy' từ Frontend gửi lên
  const { amount, customerTypeStrategy, paymentStrategy } = req.body; 
  
  const context = new CheckoutContext(amount);
  
  // Truyền các tham số vào để Context chọn đúng Strategy
  context.setTaxStrategy(customerTypeStrategy);
  context.setPaymentStrategy(paymentStrategy);
  
  const result = context.executeCheckout();
  
  // Quan trọng: Frontend mong đợi kết quả nằm trong object 'data' 
  // và cần có 'orderId' để hiển thị alert
  res.json({
    success: true,
    data: {
      ...result,
      orderId: 'ORD-' + Math.floor(Math.random() * 1000000)
    }
  });
};

export const getStrategies = (req, res) => {
  res.json({
    tax: ['PERSONAL', 'BUSINESS', 'EDUCATION'],
    payment: ['COD', 'E_WALLET', 'CREDIT_CARD']
  });
};