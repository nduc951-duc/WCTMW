import { useState } from 'react';

function PaymentOptions({ paymentStrategy, onPaymentChange }) {
    const paymentMethods = [
        {
            id: 'PAYPAL',
            name: 'Paypal',
            icon: '🅿️',
            description: 'Pay securely with your Paypal account'
        },
        {
            id: 'CREDIT_CARD',
            name: 'Credit card',
            icon: '💳',
            description: 'Pay securely using your card'
        },
        {
            id: 'GOOGLE_PAY',
            name: 'Google pay',
            icon: '🔵',
            description: 'Fast and secure payment'
        },
        {
            id: 'COD',
            name: 'Cash on delivery',
            icon: '💵',
            description: 'Pay on delivery'
        },
        {
            id: 'E_WALLET', // Đổi từ MOMO thành E_WALLET ở đây nhé để test thử qr
            name: 'Momo',
            icon: '📱',
            description: 'Popular e-wallet in Vietnam'
        }
    ];

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-1">💳 Payment Method</h3>
            <p className="text-sm text-gray-600 mb-5">All transactions are secure & encrypted</p>

            <div className="space-y-3">
                {paymentMethods.map(method => {
                    const isSelected = paymentStrategy === method.id;

                    return (
                        <div key={method.id}>
                            <label
                                className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'border-indigo-600 bg-gradient-to-r from-indigo-50 to-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'}`}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method.id}
                                    checked={isSelected}
                                    onChange={(e) => onPaymentChange(e.target.value)}
                                    className="hidden"
                                />
                                <div className={`mt-1.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
                                    {isSelected && <span className="text-white text-xs font-bold">✓</span>}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">{method.icon}</span>
                                        <div className="font-semibold text-gray-900 text-sm">{method.name}</div>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-0.5">{method.description}</p>
                                </div>
                            </label>

                            {/* Credit Card Form - Animated with CSS */}
                            {method.id === 'CREDIT_CARD' && isSelected && (
                                <div className="mt-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-5 border border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                                            <input
                                                type="text"
                                                placeholder="1234 1234 1234 1234"
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                            />
                                        </div>

                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name on card</label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">Expire date</label>
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                                                <input
                                                    type="text"
                                                    placeholder="123"
                                                    maxLength="4"
                                                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default PaymentOptions;