function ResultPanel({ result, loading, taxStrategy, paymentStrategy, cartTotal }) {
    // Fallback to client-side calculation if API not available
    const getResult = () => {
        if (result) return result;

        let taxAmount = 0;
        if (taxStrategy === 'VAT') taxAmount = cartTotal * 0.1;
        if (taxStrategy === 'US_STATE') taxAmount = cartTotal * 0.08;

        let feeAmount = 0;
        if (paymentStrategy === 'CREDIT_CARD') feeAmount = cartTotal * 0.02;
        if (paymentStrategy === 'COD') feeAmount = 30000;

        const finalTotal = cartTotal + taxAmount + feeAmount;

        return {
            taxAmount,
            feeAmount,
            finalTotal
        };
    };

    const { taxAmount, feeAmount, finalTotal } = getResult();

    return (
        <div className="panel result-panel">
            <h2>3. Live Execution Result</h2>
            {loading && <p>Loading...</p>}

            <p>Tiền gốc: {cartTotal.toLocaleString()} đ</p>
            <p>Tiền thuế ({taxStrategy}): + {taxAmount.toLocaleString()} đ</p>
            <p>Phí thanh toán ({paymentStrategy}): + {feeAmount.toLocaleString()} đ</p>
            <hr />
            <h3>Total: {finalTotal.toLocaleString()} đ</h3>

            {/* Console ảo */}
            <div className="console">
                <p>{`> Context Initialized: ${cartTotal}`}</p>
                <p>{`> setTaxStrategy ( ${taxStrategy} ) -> Executed`}</p>
                <p>{`> setPaymentStrategy ( ${paymentStrategy} ) -> Executed`}</p>
                {result && <p>{`> Backend Response: OK`}</p>}
            </div>
        </div>
    );
}

export default ResultPanel;
