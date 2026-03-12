// src/strategies/StrategyFactory.js

import { CorporateTaxStrategy } from './tax/CorporateTaxStrategy.js';
import { EducationTaxStrategy } from './tax/EducationTaxStrategy.js';
import { RetailTaxStrategy } from './tax/RetailTaxStrategy.js';
import { CODPaymentStrategy } from './payment/COD_PaymentStrategy.js';
import { CreditCardPaymentStrategy } from './payment/CreditCardStrategy.js';
import { MomoPaymentStrategy } from './payment/MomoPaymentStrategy.js';

const TAX_STRATEGIES = Object.freeze({
  PERSONAL: RetailTaxStrategy,
  BUSINESS: CorporateTaxStrategy,
  EDUCATION: EducationTaxStrategy
});

const PAYMENT_STRATEGIES = Object.freeze({
  COD: CODPaymentStrategy,
  CREDIT_CARD: CreditCardPaymentStrategy,
  E_WALLET: MomoPaymentStrategy
});

export const createTaxStrategy = (type) => {
  const Strategy = TAX_STRATEGIES[type] || TAX_STRATEGIES.PERSONAL;
  return new Strategy();
};

export const createPaymentStrategy = (type) => {
  const Strategy = PAYMENT_STRATEGIES[type] || PAYMENT_STRATEGIES.E_WALLET;
  return new Strategy();
};

export const getAvailableTaxStrategies = () => Object.keys(TAX_STRATEGIES);
export const getAvailablePaymentStrategies = () => Object.keys(PAYMENT_STRATEGIES);
