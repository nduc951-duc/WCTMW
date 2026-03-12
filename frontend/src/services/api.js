const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const checkoutAPI = async (data) => {
    try {
        const response = await fetch(`${API_URL}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Checkout API Error:', error);
        // Trả về dữ liệu mặc định nếu backend không hoạt động
        return null;
    }
};
