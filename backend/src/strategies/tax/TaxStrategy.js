// src/strategies/tax/TaxStrategy.js

export class NoTaxStrategy {
  calculate(amount) {
    return 0; // 0% tax
  }
}

export class VATTaxStrategy {
  calculate(amount) {
    return amount * 0.1; // 10% VAT
  }
}

export class USStateTaxStrategy {
  calculate(amount) {
    return amount * 0.08; // 8% tax
  }
}   