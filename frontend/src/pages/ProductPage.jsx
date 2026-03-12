import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import ProductList from '../components/products/ProductList';

function ProductPage() {
    const navigate = useNavigate();
    const { getCartItemCount, addToCart } = useCart();

    const handleAddToCart = (product) => {
        addToCart(product);
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const cartCount = getCartItemCount();

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">🛒</span>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">TechStore</h1>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
                    >
                        🛍️ Checkout <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm font-bold">{cartCount}</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 py-12">
                <ProductList onAddToCart={handleAddToCart} />
            </main>            
        </div>
    );
}

export default ProductPage;
