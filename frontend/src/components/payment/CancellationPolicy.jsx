function CancellationPolicy() {
    return (
        <div className="grid grid-cols-2 gap-12">
            <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Cancelation Policy</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                    At treva, we understand that plans can change unexpectedly; that's why we've crafted our cancellation policy to provide you with flexibility and peace of mind. When you book a car with us, you have the freedom to modify or cancel your reservation without incurring any cancellation fees up to 12 hours before your scheduled pick-up time.
                </p>
                <a href="#" className="text-indigo-600 text-sm font-medium hover:underline mt-4 inline-block">See more details</a>
            </div>
            <div className="relative">
                <div className="text-6xl opacity-10">🔍</div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-red-500 text-6xl">✖</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CancellationPolicy;
