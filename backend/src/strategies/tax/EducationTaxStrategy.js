// src/strategies/tax/EducationTaxStrategy.js

import { TaxStrategy } from './TaxStrategy.js';

export class EducationTaxStrategy extends TaxStrategy {
  calculate(amount) {
    return amount * 0.05;
  }
}
