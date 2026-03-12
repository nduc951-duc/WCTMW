import { useState } from 'react';

function ProductList({ onAddToCart }) {
    const products = [
        {
            id: 1,
            name: 'MacBook Pro 16"',
            price: 2499.00,
            image: '💻',
            category: 'Laptop',
            description: 'M3 Pro chip, 18GB RAM, 512GB SSD',
            color: 'from-blue-400 to-blue-600'
        },
        {
            id: 2,
            name: 'iPhone 15 Pro',
            price: 999.00,
            image: '📱',
            category: 'Smartphone',
            description: 'Titanium design, A17 Pro chip, 128GB',
            color: 'from-purple-400 to-purple-600'
        },
        {
            id: 3,
            name: 'Sony WH-1000XM5',
            price: 399.00,
            image: '🎧',
            category: 'Headphones',
            description: 'Wireless noise cancelling, 30hr battery',
            color: 'from-pink-400 to-pink-600'
        },
        {
            id: 4,
            name: 'iPad Pro 12.9"',
            price: 1099.00,
            image: '📱',
            category: 'Tablet',
            description: 'M2 chip, Liquid Retina XDR display',
            color: 'from-purple-400 to-purple-600'
        },
        {
            id: 5,
            name: 'Dell XPS 13',
            price: 1299.00,
            image: '💻',
            category: 'Laptop',
            description: 'Intel i7, 16GB RAM, 512GB SSD',
            color: 'from-blue-400 to-blue-600'
        },
        {
            id: 6,
            name: 'AirPods Pro (2nd gen)',
            price: 249.00,
            image: '🎧',
            category: 'Earbuds',
            description: 'Active noise cancellation, MagSafe',
            color: 'from-pink-400 to-pink-600'
        },
        {
            id: 7,
            name: 'Samsung Galaxy S24 Ultra',
            price: 1199.00,
            image: '📱',
            category: 'Smartphone',
            description: '200MP camera, S Pen included',
            color: 'from-emerald-400 to-emerald-600'
        },
        {
            id: 8,
            name: 'Apple Watch Ultra 2',
            price: 799.00,
            image: '⌚',
            category: 'Smartwatch',
            description: 'Titanium case, 36hr battery, GPS',
            color: 'from-orange-400 to-orange-600'
        }
    ];

    const getCategoryColor = (category) => {
        const colors = {
            'Laptop': 'bg-blue-100 text-blue-700 border border-blue-300',
            'Smartphone': 'bg-purple-100 text-purple-700 border border-purple-300',
            'Headphones': 'bg-pink-100 text-pink-700 border border-pink-300',
            'Tablet': 'bg-violet-100 text-violet-700 border border-violet-300',
            'Earbuds': 'bg-rose-100 text-rose-700 border border-rose-300',
            'Smartwatch': 'bg-orange-100 text-orange-700 border border-orange-300'
        };
        return colors[category] || 'bg-gray-100 text-gray-700 border border-gray-300';
    };

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                <p className="text-gray-600">Discover our latest collection of premium tech products</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {products.map(product => (
                    <div
                        key={product.id}
                        className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden"
                    >
                        {/* Product Image Section */}
                        <div className={`h-28 bg-gradient-to-br ${product.color} flex items-center justify-center text-5xl font-semibold group-hover:scale-110 transition-transform duration-300`}>
                            {product.image}
                        </div>

                        {/* Product Info */}
                        <div className="p-4 flex flex-col flex-1">
                            <div className="flex-1 min-h-0">
                                <h4 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1.5">{product.name}</h4>
                                <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2.5 ${getCategoryColor(product.category)}`}>
                                    {product.category}
                                </span>
                                <p className="text-xs text-gray-600 line-clamp-1">{product.description}</p>
                            </div>

                            {/* Price & Button */}
                            <div className="mt-auto pt-3 border-t border-gray-200">
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
                                </div>
                                <button
                                    onClick={() => onAddToCart(product)}
                                    className={`w-full bg-gradient-to-r ${product.color} hover:opacity-90 active:scale-95 text-white font-semibold px-3 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-1.5`}
                                >
                                    🛒 Add
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductList;