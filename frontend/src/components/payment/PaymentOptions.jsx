import { useState } from 'react';

function PaymentOptions({ paymentStrategy, onPaymentChange }) {
    // Khai báo TRỌN VẸN tên class Tailwind để trình biên dịch nhận diện được
    const paymentMethods = [
        {
            id: 'PAYPAL',
            name: 'Paypal',
            icon: '🅿️',
            description: 'Pay securely with your Paypal account',
            theme: {
                border: 'border-blue-500',
                bg: 'bg-blue-50/50',
                check: 'bg-blue-500',
                ring: 'ring-blue-500'
            }
        },
        {
            id: 'CREDIT_CARD',
            name: 'Credit card',
            icon: '💳',
            description: 'Pay securely using your card',
            theme: {
                border: 'border-purple-500',
                bg: 'bg-purple-50/50',
                check: 'bg-purple-500',
                ring: 'ring-purple-500'
            }
        },
        {
            id: 'GOOGLE_PAY',
            name: 'Google pay',
            icon: '🔵',
            description: 'Fast and secure payment',
            theme: {
                border: 'border-red-500',
                bg: 'bg-red-50/50',
                check: 'bg-red-500',
                ring: 'ring-red-500'
            }
        },
        {
            id: 'COD',
            name: 'Cash on delivery',
            icon: '💵',
            description: 'Pay on delivery',
            theme: {
                border: 'border-green-500',
                bg: 'bg-green-50/50',
                check: 'bg-green-500',
                ring: 'ring-green-500'
            }
        },
        {
            id: 'MOMO',
            name: 'Momo',
            icon: '📱',
            description: 'Popular e-wallet in Vietnam',
            theme: {
                border: 'border-pink-500',
                bg: 'bg-pink-50/50',
                check: 'bg-pink-500',
                ring: 'ring-pink-500'
            }
        }
    ];

    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-xl mx-auto">
            <h3 className="text-xl font-black text-gray-900 mb-1 flex items-center gap-2">
                💳 Phương thức thanh toán
            </h3>
            <p className="text-sm text-gray-500 mb-6">Mọi giao dịch đều được mã hóa và bảo mật an toàn</p>

            <div className="flex flex-col gap-2">
                {paymentMethods.map(method => {
                    const isSelected = paymentStrategy === method.id;
                    const activeTheme = method.theme;

                    return (
                        <div key={method.id} className={`rounded-xl transition-all duration-300 border-2 p-2 mb-4 ${isSelected ? `${activeTheme.border} ${activeTheme.bg} shadow-lg` : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                            {/* Khu vực Nút chọn */}
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

                            {/* Credit Card Form - Animation xổ xuống mượt mà */}
                            <div className={`grid transition-all duration-300 ease-in-out ${isSelected && method.id === 'CREDIT_CARD' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                <div className="overflow-hidden">
                                    {method.id === 'CREDIT_CARD' && (
                                        <div className="p-5 pt-0 mt-2">
                                            <div className="bg-white rounded-xl p-5 border border-purple-100 shadow-inner space-y-4">
                                                {/* Hàng 1: Số thẻ */}
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Card Number</label>
                                                    <div className="relative">
                                                        <input
                                                            type="text"
                                                            placeholder="1234 1234 1234 1234"
                                                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        />
                                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50">💳</span>
                                                    </div>
                                                </div>

                                                {/* Hàng 2: Tên, Ngày, CVV (Chia lưới 12 cột) */}
                                                <div className="grid grid-cols-12 gap-3">
                                                    {/* Ô Tên chiếm 6/12 */}
                                                    <div className="col-span-12 sm:col-span-6">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Name on card</label>
                                                        <input
                                                            type="text"
                                                            placeholder="JOHN DOE"
                                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent uppercase transition-all"
                                                        />
                                                    </div>

                                                    {/* Ô Ngày chiếm 3/12 */}
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Expires</label>
                                                        <input
                                                            type="text"
                                                            placeholder="MM/YY"
                                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                                        />
                                                    </div>

                                                    {/* Ô CVV chiếm 3/12 */}
                                                    <div className="col-span-6 sm:col-span-3">
                                                        <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">CVV</label>
                                                        <input
                                                            type="password"
                                                            placeholder="•••"
                                                            maxLength="4"
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