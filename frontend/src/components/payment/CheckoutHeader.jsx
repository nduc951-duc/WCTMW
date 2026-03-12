function CheckoutHeader() {
    return (
        <div className="flex items-center justify-center gap-3 sm:gap-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">✓</div>
                <span className="text-xs font-semibold text-gray-700">Details</span>
            </div>

            <div className="flex-1 h-1 bg-gradient-to-r from-indigo-300 to-indigo-200 max-w-12 rounded-full"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm">2</div>
                <span className="text-xs font-semibold text-blue-600">Payment</span>
            </div>

            <div className="flex-1 h-1 bg-gray-200 max-w-12 rounded-full"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center font-bold text-sm shadow-sm">3</div>
                <span className="text-xs font-semibold text-gray-500">Complete</span>
            </div>
        </div>
    );
}

export default CheckoutHeader;
