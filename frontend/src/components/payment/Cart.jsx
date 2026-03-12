function Cart({ cartTotal }) {
    return (
        <div className="panel context-panel">
            <h2>1. Context (Giỏ hàng)</h2>
            <ul>
                <li>Laptop Gaming: 15.000.000 đ</li>
                <li>Màn hình rời: 5.000.000 đ</li>
            </ul>
            <h3>Subtotal: {cartTotal.toLocaleString()} đ</h3>
        </div>
    );
}

export default Cart;
