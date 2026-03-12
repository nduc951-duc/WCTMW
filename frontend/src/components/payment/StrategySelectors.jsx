function StrategySelectors({ taxStrategy, paymentStrategy, onTaxChange, onPaymentChange }) {
    return (
        <div className="panel strategy-panel">
            <h2>2. Chọn Strategies</h2>

            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                <h3>Tax Strategy</h3>
                <select value={taxStrategy} onChange={(e) => onTaxChange(e.target.value)}>
                    <option value="NO_TAX">No Tax (0%)</option>
                    <option value="VAT">VAT Tax (10%)</option>
                    <option value="US_STATE">US State Tax (8%)</option>
                </select>
            </div>

            <div style={{ textAlign: 'left' }}>
                <h3>Payment Strategy</h3>
                <select value={paymentStrategy} onChange={(e) => onPaymentChange(e.target.value)}>
                    <option value="COD">COD (Phí 30k)</option>
                    <option value="E_WALLET">E-Wallet (Miễn phí)</option>
                    <option value="CREDIT_CARD">Credit Card (Phí 2%)</option>
                </select>
            </div>
        </div>
    );
}

export default StrategySelectors;
