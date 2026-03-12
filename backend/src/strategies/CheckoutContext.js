// src/strategies/CheckoutContext.js

export class CheckoutContext {
  constructor(amount, taxStrategy, paymentStrategy) {
    this.amount = amount;
    this.setTaxStrategy(taxStrategy);
    this.setPaymentStrategy(paymentStrategy);
  }

  setTaxStrategy(strategy) {
    if (!strategy || typeof strategy.calculate !== 'function') {
      throw new TypeError('taxStrategy must implement calculate(amount)');
    }
    this.taxStrategy = strategy;
  }

  setPaymentStrategy(strategy) {
    if (!strategy || typeof strategy.calculateFee !== 'function') {
      throw new TypeError('paymentStrategy must implement calculateFee(context)');
    }
    this.paymentStrategy = strategy;
  }

  async executeCheckout(context = {}) {
    const amount =
      typeof context.amount === 'number' && !Number.isNaN(context.amount)
        ? context.amount
        : this.amount;

    if (typeof amount !== 'number' || Number.isNaN(amount)) {
      throw new TypeError('amount must be a valid number');
    }

    const tax = this.taxStrategy.calculate(amount);
    const paymentResult = await this.paymentStrategy.calculateFee({
      ...context,
      amount
    });

    const paymentFee =
      paymentResult && paymentResult.success ? Number(paymentResult.fee || 0) : 0;

    return {
      subtotal: amount,
      tax,
      paymentFee,
      total: amount + tax + paymentFee,
      paymentResult
    };
  }
}
