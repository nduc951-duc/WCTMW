function PaymentOptions({ paymentStrategy, onPaymentChange, cardInfo, onCardInfoChange }) {
    const paymentMethods = [
        {
            id: 'CREDIT_CARD',
            name: 'Credit card',
            icon: 'ðŸ’³',
            description: 'Pay securely using your card',
            theme: {
                border: 'border-purple-500',
                bg: 'bg-purple-50/50',
                check: 'bg-purple-500',
                ring: 'ring-purple-500'
            }
        },
        {
            id: 'COD',
            name: 'Cash on delivery',
            icon: 'ðŸ’µ',
            description: 'Pay on delivery',
            theme: {
                border: 'border-green-500',
                bg: 'bg-green-50/50',
                check: 'bg-green-500',
                ring: 'ring-green-500'
            }
        },
        {
            id: 'E_WALLET',
            name: 'Momo',
            icon: 'ðŸ“±',
            description: 'Popular e-wallet in Vietnam',
            theme: {
                border: 'border-pink-500',
                bg: 'bg-pink-50/50',
                check: 'bg-pink-500',
                ring: 'ring-pink-500'
            }
        }
    ];

    const handleCardChange = (field) => (event) => {
        if (!onCardInfoChange) return;
        onCardInfoChange({ ...cardInfo, [field]: event.target.value });
    };

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-xl mx-auto">
            <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                ðŸ’³ PhÆ°Æ¡ng thá»©c thanh toÃ¡n
            </h3>
            <p className="text-sm text-gray-500 mb-6">Má»i giao dá»‹ch Ä‘á»u Ä‘Æ°á»£c mÃ£ hÃ³a vÃ  báº£o máº­t an toÃ n</p>

            <div className="flex flex-col gap-2">
                {paymentMethods.map(method => {
                    const isSelected = paymentStrategy === method.id;
                    const activeTheme = method.theme;

                    return (
                        <div key={method.id} className={`rounded-xl transition-all duration-300 border-2 p-2 mb-4 ${isSelected ? `${activeTheme.border} ${activeTheme.bg} shadow-lg` : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                            {/* Khu vá»±c NÃºt chá»n */}
                            <label className="flex items-start gap-4 p-5 cursor-pointer w-full">
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method.id}
                                    checked={isSelected}
                                    onChange={(e) => onPaymentChange(e.target.value)}
                                    className="hidden"
                                />
                                {/* Custom Radio Button */}
                                <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? `border-transparent ${activeTheme.check} ring-2 ring-offset-2 ${activeTheme.ring}` : 'border-gray-300 bg-white'}`}>
                                    {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                </div>
                                
                                <div className="flex-1 pl-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{method.icon}</span>
                                        <div className={`font-bold text-base ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                                            {method.name}
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-0.5">{method.description}</p>
                                </div>
                            </label>

                            {/* Credit Card Form - Animation xá»• xuá»‘ng mÆ°á»£t mÃ  */}
                            <div className={`grid transition-all duration-300 ease-in-out ${isSelected && method.id === 'CREDIT_CARD' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    {method.id === 'CREDIT_CARD' && (
                                        <div className="p-5 pt-0 mt-2">
                                            <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-inner space-y-4">
                                                {/* HÃ ng 1: Sá»‘ tháº» */}
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Card Number</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="1234 1234 1234 1234"
                                                            value={cardInfo?.cardNumber || ''}
                                                            onChange={handleCardChange('cardNumber')}
                                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        />
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">ðŸ’³</span>
                                                    </div>
                                                </div>

                                                {/* HÃ ng 2: TÃªn, NgÃ y, CVV (Chia lÆ°á»›i 12 cá»™t) */}
                                                <div className="grid grid-cols-12 gap-3">
                                                    {/* Ã” TÃªn chiáº¿m 6/12 */}
                                                    <div className="col-span-12 sm:col-span-6">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Name on card</label>
                                                        <input
                                                            type="text"
                                                            placeholder="JOHN DOE"
                                                            value={cardInfo?.cardName || ''}
                                                            onChange={handleCardChange('cardName')}
                                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase transition-all"
                                                        />
                                                    </div>

                                                    {/* Ã” NgÃ y chiáº¿m 3/12 */}
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Expires</label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            value={cardInfo?.expiry || ''}
                                                            onChange={handleCardChange('expiry')}
                                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        />
                                                    </div>

                                                    {/* Ã” CVV chiáº¿m 3/12 */}
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">CVV</label>
                                                        <input
                                                            type="password"
                                                            placeholder="â€¢â€¢â€¢"
                                                            maxLength="4"
                                                            value={cardInfo?.cvv || ''}
                                                            onChange={handleCardChange('cvv')}
                                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PaymentOptions;
