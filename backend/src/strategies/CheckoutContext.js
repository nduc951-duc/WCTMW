// src/strategies/CheckoutContext.js

// 1. Import các strategy khác (nếu ông đã tạo file)
import { NoTaxStrategy, VATTaxStrategy, USStateTaxStrategy } from './tax/TaxStrategy.js';
import { CODPaymentStrategy, EWalletPaymentStrategy, CreditCardPaymentStrategy } from './payment/PaymentStrategy.js';

// 2. Định nghĩa class và QUAN TRỌNG là phải có chữ "export"
export class CheckoutContext {
  constructor(amount) {
    this.amount = amount;
    this.taxStrategy = new NoTaxStrategy();
    this.paymentStrategy = new EWalletPaymentStrategy();
  }

  setTaxStrategy(type) {
    if (type === 'BUSINESS') {
      this.taxStrategy = new VATTaxStrategy(); // 10% VAT
    } else if (type === 'EDUCATION') {
      this.taxStrategy = new USStateTaxStrategy(); // 8% (tạm dùng cho Edu)
    } else {
      this.taxStrategy = new NoTaxStrategy(); // PERSONAL hoặc mặc định
    }
  }

  setPaymentStrategy(type) {
    if (type === 'COD') this.paymentStrategy = new CODPaymentStrategy();
    else if (type === 'CREDIT_CARD') this.paymentStrategy = new CreditCardPaymentStrategy();
    else this.paymentStrategy = new EWalletPaymentStrategy();
  }

  executeCheckout() {
    const tax = this.taxStrategy.calculate(this.amount);
    const fee = this.paymentStrategy.calculateFee(this.amount);
    return {
      subtotal: this.amount,
      tax,
      paymentFee: fee,
      total: this.amount + tax + fee
    };
  }
}