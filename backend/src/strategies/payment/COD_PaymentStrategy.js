// src/strategies/payment/COD_PaymentStrategy.js

import { PaymentStrategy } from './PaymentStrategy.js';

export class CODPaymentStrategy extends PaymentStrategy {
    constructor() {
        super();
        this.maxCodAmount = 20000000; // Giới hạn 20 triệu cho COD
        this.codFee = 30000;        // Phí thu hộ/bảo hiểm hàng hóa
    }

    async calculateFee({ amount, orderId } = {}) {
        console.log(`[COD Strategy] Đang kiểm tra điều kiện thanh toán cho đơn hàng ${orderId}`);

        if (typeof amount !== 'number' || Number.isNaN(amount)) {
            return { success: false, fee: 0, message: "Giá trị đơn hàng không hợp lệ." };
        }

        // 1. Kiểm tra giới hạn giá trị đơn hàng
        if (amount > this.maxCodAmount) {
            return {
                success: false,
                fee: 0,
                message: `Đơn hàng vượt quá ${this.maxCodAmount.toLocaleString()}đ. Vui lòng chọn phương thức thanh toán online để đảm bảo an toàn.`
            };
        }

        // 2. Giả lập xử lý (Xác nhận địa chỉ, tính toán thời gian giao hàng dự kiến)
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    fee: this.codFee,
                    total: amount + this.codFee,
                    message: "Xác nhận đơn hàng COD thành công!",
                    meta: {
                        note: "Nhân viên sẽ gọi điện xác nhận trong 15 phút."
                    }
                });
            }, 1000);
        });
    }
}
