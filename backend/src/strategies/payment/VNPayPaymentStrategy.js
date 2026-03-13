// src/strategies/payment/VNPayPaymentStrategy.js

import { VNPay } from 'vnpay';
import { PaymentStrategy } from './PaymentStrategy.js';

export class VNPayPaymentStrategy extends PaymentStrategy {
    constructor() {
        super();
        this.gatewayName = "VNPay_Sandbox_Gateway";
        this.vnpay = null;
    }

    _initVNPay() {
        if (!this.vnpay) {
            const config = this._resolveConfig();
            this.vnpay = new VNPay({
                tmnCode: config.tmnCode,
                secureSecret: config.secureSecret,
                vnpayHost: config.paymentUrl,
                testMode: true,
                hashAlgorithm: 'SHA512'
            });
        }
        return this.vnpay;
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

            console.log(`[VNPay Library] Creating payment for order ${orderId}, amount: ${amount}`);

            const vnpay = this._initVNPay();
            const finalReturnUrl = redirectUrl || 'http://localhost:5173/products';

            // Build payment URL using vnpay library
            const paymentUrl = vnpay.buildPaymentUrl({
                vnp_Amount: Math.round(amount),
                vnp_IpAddr: '127.0.0.1',
                vnp_ReturnUrl: finalReturnUrl,
                vnp_TxnRef: orderId,
                vnp_OrderInfo: orderInfo || `Payment for order ${orderId}`,
                vnp_OrderType: '200000',
                vnp_Locale: 'vn'
            });

            console.log(`[VNPay Library] Payment URL generated:`, paymentUrl.substring(0, 100) + '...');

            return {
                success: true,
                fee: 0,
                total: amount,
                message: 'VNPay Sandbox payment created',
                meta: {
                    payUrl: paymentUrl,
                    isSandbox: true
                }
            };
        } catch (error) {
            console.error(`[VNPay Library] Error:`, error?.message);
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
            tmnCode: process.env.VNPAY_TMN_CODE?.trim(),
            secureSecret: process.env.VNPAY_SECURE_SECRET?.trim(),
            paymentUrl: process.env.VNPAY_PAYMENT_URL?.trim() || 'https://sandbox.vnpayment.vn'
        };
    }
}
