// src/strategies/payment/PaymentStrategy.js

export class PaymentStrategy {
  /**
   * @returns {Promise<{ success: boolean, fee: number, total?: number, message?: string, meta?: unknown }>}
   */
  async calculateFee(..._args) {
    throw new Error('PaymentStrategy.calculateFee(...) must be implemented');
  }

  // Optional: gateway-based strategies can override this.
  /**
   * @returns {Promise<unknown>}
   */
  async createPayment(_params) {
    return null;
  }
}
