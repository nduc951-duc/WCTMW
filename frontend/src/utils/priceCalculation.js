export const formatPrice = (price) => {
    if (typeof price !== 'number') return '$0.00';
    return `$${price.toFixed(2)}`;
};

export const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const getTaxAmount = (total, strategy = 'PERSONAL') => {
    const taxRates = {
        PERSONAL: 0.10,    // 10% VAT bao gồm trong giá
        BUSINESS: 0.10,    // 10% VAT tách bạch
        EDUCATION: 0.05,   // 5% thuế ưu đãi
    };
    return total * (taxRates[strategy] || 0.10);
};

export const calculateCheckoutTotal = (items, customerType = 'PERSONAL') => {
    const subtotal = calculateTotal(items);
    const tax = getTaxAmount(subtotal, customerType);
    const shipping = 0; // Free shipping
    
    if (customerType === 'PERSONAL') {
        // Giá đã bao gồm thuế
        return {
            subtotal,
            tax: 0, // Không tính thêm
            shipping,
            total: subtotal,
            taxNote: 'Giá đã bao gồm VAT 10%'
        };
    } else if (customerType === 'BUSINESS') {
        // Tách bạch thuế
        return {
            subtotal,
            tax,
            shipping,
            total: subtotal + tax + shipping,
            taxNote: 'B2B - Tách bạch VAT 10% để khấu trừ'
        };
    } else if (customerType === 'EDUCATION') {
        // Thuế ưu đãi
        return {
            subtotal,
            tax,
            shipping,
            total: subtotal + tax + shipping,
            taxNote: 'Ưu đãi - VAT 5%'
        };
    }
};
