// src/strategies/tax/RetailTaxStrategy.js

import { TaxStrategy } from './TaxStrategy.js';

export class RetailTaxStrategy extends TaxStrategy {
  calculate(amount) {
    return 0;
  }
}
