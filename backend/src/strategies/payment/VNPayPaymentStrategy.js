// src/strategies/payment/VNPayPaymentStrategy.js

import crypto from 'crypto';
import { PaymentStrategy } from './PaymentStrategy.js';

export class VNPayPaymentStrategy extends PaymentStrategy {
    constructor() {
        super();
        this.gatewayName = "VNPay_Sandbox_Gateway";
    }

    async calculateFee({ orderId, amount, orderInfo, redirectUrl } = {}) {
        try {
            if (!orderId) {
                return { success: false, fee: 0, message: 'orderId is required for VNPay payment' };
            }

            if (typeof amount !== 'number' || Number.isNaN(amount) || amount <= 0) {
                return { success: false, fee: 0, message: 'amount must be a valid positive number for VNPay payment' };
            }

            const config = this._resolveConfig();
            
            if (!config.tmnCode || !config.secureSecret) {
                return { 
                    success: false, 
                    fee: 0, 
                    message: 'Missing VNPay config: VNPAY_TMN_CODE or VNPAY_SECURE_SECRET' 
                };
            }

            console.log(`[VNPay Sandbox] Creating payment for order ${orderId}, amount: ${amount}`);

            // Build VNPay request parameters
            const createDate = this._getCurrentDate();
            const amountInCents = Math.round(amount * 100);
            const finalReturnUrl = redirectUrl || 'http://localhost:5173/products';

            const vnpParams = {
                vnp_Version: '2.1.0',
                vnp_Command: 'pay',
                vnp_TmnCode: config.tmnCode,
                vnp_Locale: 'vn',
                vnp_CurrCode: 'VND',
                vnp_TxnRef: orderId,
                vnp_OrderInfo: orderInfo || `Payment for order ${orderId}`,
                vnp_OrderType: '200000',
                vnp_Amount: amountInCents.toString(),
                vnp_ReturnUrl: finalReturnUrl,
                vnp_CreateDate: createDate,
                vnp_IpAddr: '127.0.0.1'
            };

            // Sort and build signature
            const sortedParams = Object.keys(vnpParams)
                .sort()
                .reduce((result, key) => {
                    result[key] = vnpParams[key];
                    return result;
                }, {});

            const signString = Object.entries(sortedParams)
                .map(([key, value]) => `${key}=${value}`)
                .join('&');

            const signature = crypto
                .createHmac('sha512', config.secureSecret)
                .update(Buffer.from(signString, 'utf-8'))
                .digest('hex');

            // Build payment URL
            const paymentUrl = new URL(`${config.paymentUrl}/paymen/payment.html`);
            Object.entries(sortedParams).forEach(([key, value]) => {
                paymentUrl.searchParams.append(key, value);
            });
            paymentUrl.searchParams.append('vnp_SecureHash', signature);

            console.log(`[VNPay Sandbox] Payment URL generated with signature`);

            return {
                success: true,
                fee: 0,
                total: amount,
                message: 'VNPay Sandbox payment created',
                meta: {
                    payUrl: paymentUrl.toString(),
                    isSandbox: true
                }
            };
        } catch (error) {
            console.error(`[VNPay Sandbox] Error:`, error?.message);
            return {
                success: false,
                fee: 0,
                message: error?.message || 'VNPay payment creation failed',
                meta: { error: error?.message }
            };
        }
    }

    _resolveConfig() {
        return {
            version: process.env.VNPAY_VERSION || '2.1.0',
            tmnCode: process.env.VNPAY_TMN_CODE,
            secureSecret: process.env.VNPAY_SECURE_SECRET,
            paymentUrl: process.env.VNPAY_PAYMENT_URL || 'https://sandbox.vnpayment.vn'
        };
    }

    _getCurrentDate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        return `${year}${month}${date}${hours}${minutes}${seconds}`;
    }
}
