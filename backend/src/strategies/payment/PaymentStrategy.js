// src/strategies/payment/PaymentStrategy.js

export class CODPaymentStrategy {
  calculateFee(amount) {
    return 30000; // Phí cố định 30,000 VND
  }
}

export class EWalletPaymentStrategy {
  calculateFee(amount) {
    return 0; // Không tốn phí
  }
}

export class CreditCardPaymentStrategy {
  calculateFee(amount) {
    return amount * 0.02; // Phí 2%
  }
}