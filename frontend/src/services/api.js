const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const checkoutAPI = async (data) => {
    const response = await fetch(`${API_URL}/checkout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    let payload = null;
    try {
        payload = await response.json();
    } catch {
        payload = null;
    }

    if (!response.ok) {
        const message = payload?.message || payload?.error || response.statusText;
        const error = new Error(message);
        error.payload = payload;
        throw error;
    }

    return payload;
};
