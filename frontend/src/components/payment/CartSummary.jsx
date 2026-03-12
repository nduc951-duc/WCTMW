import { formatPrice } from '../../utils/priceCalculation';

function CartSummary({ items = [], checkoutData = {}, customerType = 'PERSONAL' }) {
    const { subtotal = 0, tax = 0, shipping = 0, total = 0, taxNote = '' } = checkoutData;

    if (!items || items.length === 0) {
        return (
            <div className="bg-white rounded-xl p-6 h-fit border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📦 Order Summary</h3>
                <div className="bg-gray-50 rounded-lg p-8 text-center border border-gray-200">
                    <p className="text-gray-500 text-sm">Your cart is empty. Add products to continue.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-6 h-fit border border-gray-100 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-gray-900 mb-5">📦 Order Summary ({items.length})</h3>

            {/* Cart Items */}
            <div className="space-y-3 mb-5 pb-5 border-b border-gray-200">
                {items.map(item => (
                    <div key={item.id} className="flex gap-3">
                        <div className="text-3xl flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">{item.image}</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{item.quantity} × {formatPrice(item.price)}</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900 flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                ))}
            </div>

            {/* Pricing Breakdown */}
            <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold text-green-600">Free</span>
                </div>
                
                {tax > 0 && (
                    <div className="flex justify-between items-center text-sm text-gray-700">
                        <span>Tax</span>
                        <span className="font-semibold text-gray-900">{formatPrice(tax)}</span>
                    </div>
                )}

                {taxNote && (
                    <p className="text-xs text-gray-500 italic pt-2 p-2.5 bg-gray-50 rounded-lg border border-gray-200">
                        ℹ️ {taxNote}
                    </p>
                )}

                <div className="border-t border-gray-200 my-3"></div>

                <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">{formatPrice(total)}</span>
                </div>
            </div>
        </div>
    );
}

export default CartSummary;
