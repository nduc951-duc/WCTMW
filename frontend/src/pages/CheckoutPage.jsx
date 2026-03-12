import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CheckoutHeader from '../components/payment/CheckoutHeader';
import PaymentOptions from '../components/payment/PaymentOptions';
import CartSummary from '../components/payment/CartSummary';
import { calculateCheckoutTotal, formatPrice } from '../utils/priceCalculation';
import { checkoutAPI } from '../services/api';

function CheckoutPage() {
    const navigate = useNavigate();
    const { cartItems, getCartTotal, clearCart } = useCart();
    const [customerType, setCustomerType] = useState('PERSONAL');
    const [paymentStrategy, setPaymentStrategy] = useState('CREDIT_CARD');
    const [loading, setLoading] = useState(false);

    const cartTotal = getCartTotal();
    const checkoutData = calculateCheckoutTotal(cartItems, customerType);

    const customerTypes = [
        {
            id: 'PERSONAL',
            name: 'Khách hàng cá nhân',
            description: 'Giá đã bao gồm 10% VAT',
            icon: '👤'
        },
        {
            id: 'BUSINESS',
            name: 'Khách hàng doanh nghiệp (B2B)',
            description: 'Tách bạch VAT 10% để khấu trừ thuế',
            icon: '🏢'
        },
        {
            id: 'EDUCATION',
            name: 'Khách hàng giáo dục',
            description: 'Áp dụng VAT ưu đãi 5%',
            icon: '🎓'
        }
    ];

    const handlePayment = async () => {
        setLoading(true);
        try {
            // SỬ DỤNG HÀM TỪ api.js THAY VÌ FETCH TRỰC TIẾP
            const responseData = await checkoutAPI({
                amount: cartTotal * 1000000,
                customerTypeStrategy: customerType,
                paymentStrategy,
            });
            
            setTimeout(() => {
                alert(`✅ Payment successful! Order ID: ${responseData.data?.orderId || 'N/A'}`);
                clearCart();
                navigate('/');
            }, 1500);
        } catch (error) {
            alert(`❌ Payment error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const displayTotal = checkoutData.total;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 shadow-sm">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <button
                        onClick={() => navigate('/products')}
                        className="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-2 transition-colors"
                    >
                        ← Products
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">🛍️ Checkout</h1>
                    <div className="w-20"></div>
                </div>
            </header>

            {/* Progress Header */}
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <CheckoutHeader />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-3 gap-8">
                    {/* Left Section: Customer Type & Payment */}
                    <div className="col-span-2 space-y-7">
                        {/* Customer Type Strategy */}
                        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                            <h2 className="text-lg font-bold text-gray-900 mb-5">📋 Chính sách giá</h2>
                            <div className="space-y-3">
                                {customerTypes.map(type => (
                                    <label
                                        key={type.id}
                                        className={`flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${customerType === type.id
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`mt-1.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${customerType === type.id ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300 bg-white'}`}>
                                            {customerType === type.id && <span className="text-white text-xs font-bold">✓</span>}
                                        </div>
                                        <input
                                            type="radio"
                                            name="customerType"
                                            value={type.id}
                                            checked={customerType === type.id}
                                            onChange={(e) => setCustomerType(e.target.value)}
                                            className="hidden"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl">{type.icon}</span>
                                                <div className="font-semibold text-gray-900">{type.name}</div>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Payment Options */}
                        <PaymentOptions
                            paymentStrategy={paymentStrategy}
                            onPaymentChange={setPaymentStrategy}
                        />

                        {/* Payment Button */}
                        <button
                            onClick={handlePayment}
                            disabled={loading || cartItems.length === 0}
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed active:scale-95 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                        >
                            {loading ? '⏳ Processing...' : `✓ Complete Payment - ${formatPrice(displayTotal)}`}
                        </button>

                        {/* Terms & Conditions */}
                        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-4 border border-indigo-100">
                            <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer">
                                <input type="checkbox" className="mt-1 accent-indigo-600 w-5 h-5 flex-shrink-0" defaultChecked />
                                <span>I agree to TechStore <a href="#terms" className="text-indigo-600 hover:underline font-semibold">Terms & Conditions</a> and <a href="#privacy" className="text-indigo-600 hover:underline font-semibold">Privacy Policy</a></span>
                            </label>
                        </div>
                    </div>

                    {/* Right Section: Cart Summary */}
                    <CartSummary
                        items={cartItems}
                        checkoutData={checkoutData}
                        customerType={customerType}
                    />
                </div>
            </div>

            {/* Empty Cart Message */}
            {cartItems.length === 0 && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 text-center max-w-md shadow-2xl border border-gray-200">
                        <div className="text-5xl mb-4">🛒</div>
                        <p className="text-2xl font-bold text-gray-900 mb-2">Cart is Empty</p>
                        <p className="text-gray-600 mb-6">Add some awesome tech products before proceeding!</p>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 active:scale-95 text-white font-bold px-6 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                            ← Continue Shopping
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckoutPage;
