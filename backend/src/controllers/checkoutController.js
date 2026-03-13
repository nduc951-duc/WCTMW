import { CheckoutContext } from '../strategies/CheckoutContext.js';
import {
  createPaymentStrategy,
  createTaxStrategy,
  getAvailablePaymentStrategies,
  getAvailableTaxStrategies
} from '../strategies/StrategyFactory.js';

const mockDatabase = [];

export const checkout = async (req, res) => {
  const {
    amount,
    customerTypeStrategy,
    paymentStrategy,
    cardInfo,
    redirectUrl,
    ipnUrl,
    requestType,
    orderInfo
  } = req.body;

  const taxStrategy = createTaxStrategy(customerTypeStrategy);
  const paymentStrategyInstance = createPaymentStrategy(paymentStrategy);
  const context = new CheckoutContext(amount, taxStrategy, paymentStrategyInstance);

  const orderId = 'ORD-' + new Date().getTime();
  const result = await context.executeCheckout({
    amount,
    orderId,
    cardInfo,
    redirectUrl,
    ipnUrl,
    requestType,
    orderInfo
  });

  if (!result.paymentResult?.success) {
    return res.status(400).json({
      success: false,
      message: result.paymentResult?.message || 'Payment failed',
      data: result.paymentResult
    });
  }

  const newOrder = {
    orderId,
    createdAt: new Date().toISOString(),
    customerType: customerTypeStrategy,
    paymentMethod: paymentStrategy,
    billingDetails: result
  };
  mockDatabase.push(newOrder);

  // For e-wallet (MoMo) or VNPay, return payUrl from payment result.
  if (paymentStrategy === 'E_WALLET' || paymentStrategy === 'VNPAY') {
    const payUrl = result.paymentResult?.meta?.payUrl;
    return res.json({
      success: true,
      data: { ...newOrder, payUrl }
    });
  }

  // COD or Credit Card: return order normally.
  res.json({
    success: true,
    data: newOrder
  });
};

export const getOrders = (req, res) => {
  res.json({ total: mockDatabase.length, orders: mockDatabase });
};

export const getStrategies = (req, res) => {
  res.json({
    tax: getAvailableTaxStrategies(),
    payment: getAvailablePaymentStrategies()
  });
};
