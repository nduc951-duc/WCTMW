// src/strategies/tax/CorporateTaxStrategy.js

import { TaxStrategy } from './TaxStrategy.js';

export class CorporateTaxStrategy extends TaxStrategy {
  calculate(amount) {
    return amount * 0.1;
  }
}
