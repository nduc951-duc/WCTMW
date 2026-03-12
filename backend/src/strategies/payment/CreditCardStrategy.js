// src/strategies/payment/CreditCardStrategy.js

import { PaymentStrategy } from './PaymentStrategy.js';

export class CreditCardPaymentStrategy extends PaymentStrategy {
    constructor() {
        super();
        this.gatewayName = "Mock_Bank_Gateway_V1";
    }


    // Hàm kiểm tra tính hợp lệ của số thẻ bằng Thuật toán Luhn (Modulus 10)
    // Đây là thuật toán thực tế các ngân hàng dùng để check số thẻ gõ sai
    isValidCardNumber(cardNumber) {
        let sum = 0;
        let isEven = false;
        
        // Chạy ngược từ số cuối cùng lên
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i), 10);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }
            sum += digit;
            isEven = !isEven;
        }
        return (sum % 10) === 0;
    }

    async calculateFee({ amount, orderId, cardInfo } = {}) {
        console.log(`[Credit Card Strategy] Bắt đầu xử lý thanh toán cho đơn hàng ${orderId}`);

        if (typeof amount !== 'number' || Number.isNaN(amount)) {
            return { success: false, fee: 0, message: "Giá trị đơn hàng không hợp lệ." };
        }

        if (!cardInfo || !cardInfo.cardNumber) {
            return { success: false, fee: 0, message: "Thiếu thông tin thẻ." };
        }

        // 1. Lọc bỏ các khoảng trắng trong số thẻ (ví dụ: "1234 5678" -> "12345678")
        const cleanCardNumber = cardInfo.cardNumber.replace(/\s+/g, '');

        // 2. Validate bảo mật cơ bản
        if (!cleanCardNumber || cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
            return { success: false, fee: 0, message: "Độ dài số thẻ không hợp lệ." };
        }

        if (!this.isValidCardNumber(cleanCardNumber)) {
            return { success: false, fee: 0, message: "Số thẻ không hợp lệ (Sai checksum thuật toán Luhn)." };
        }

        if (!cardInfo.cvv || cardInfo.cvv.length < 3) {
            return { success: false, fee: 0, message: "Mã bảo mật CVV không hợp lệ." };
        }

        // 3. Giả lập gọi sang Cổng thanh toán của Ngân hàng (Mất 1.5 giây)
        return new Promise((resolve) => {
            console.log(`[Credit Card Strategy] Đang kết nối an toàn tới ${this.gatewayName}...`);
            
            setTimeout(() => {
                // Mô phỏng việc ngân hàng trừ tiền thành công
                // Lưu ý lúc thuyết trình: Nhấn mạnh rằng hệ thống không lưu lại cardInfo vào Database để đảm bảo an toàn!
                resolve({
                    success: true,
                    fee: 0,
                    total: amount,
                    message: "Thanh toán qua thẻ tín dụng thành công!",
                    meta: {
                        transactionId: `TXN_CC_${new Date().getTime()}`,
                        gateway: this.gatewayName
                    }
                });
            }, 1500);
        });
    }
}
