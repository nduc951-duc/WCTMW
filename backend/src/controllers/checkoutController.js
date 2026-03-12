import { CheckoutContext } from '../strategies/CheckoutContext.js';

export const checkout = (req, res) => {
  // Lấy đúng tên biến mà Frontend gửi (customerTypeStrategy)
  const { amount, customerTypeStrategy, paymentStrategy } = req.body;
  
  const context = new CheckoutContext(amount);
  
  // Truyền customerTypeStrategy vào hàm setTaxStrategy
  context.setTaxStrategy(customerTypeStrategy);
  context.setPaymentStrategy(paymentStrategy);
  
  const result = context.executeCheckout();
  
  // Trả về thêm field "data" để khớp với logic alert của Frontend
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
    tax: ['PERSONAL', 'BUSINESS', 'EDUCATION'], // Sửa lại cho khớp với Frontend
    payment: ['COD', 'E_WALLET', 'CREDIT_CARD']
  });
};