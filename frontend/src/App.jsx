import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage';       // Trang danh sách SP của bạn
import CheckoutPage from './pages/CheckoutPage';     // Trang Payment & Tax Strategy của bạn

function App() {
    return (
        <Routes>
            <Route path="/products" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
    );
}

export default App;