// src/strategies/payment/MomoPaymentStrategy.js

import crypto from 'crypto';
import { PaymentStrategy } from './PaymentStrategy.js';

export class MomoPaymentStrategy extends PaymentStrategy {
    constructor(options = {}) {
        super();
        this.options = options;
    }


    async calculateFee({ orderId, amount, orderInfo, redirectUrl, ipnUrl, requestType } = {}) {
        try {
            if (!orderId) {
                return { success: false, fee: 0, message: 'orderId is required for MoMo payment' };
            }
            if (typeof amount !== 'number' || Number.isNaN(amount)) {
                return { success: false, fee: 0, message: 'amount must be a valid number for MoMo payment' };
            }

            const config = this._resolveConfig();
            const finalRedirectUrl = redirectUrl || config.redirectUrl;
            const finalIpnUrl = ipnUrl || config.ipnUrl;

            if (!config.partnerCode || !config.accessKey || !config.secretKey) {
                return { success: false, fee: 0, message: 'Missing MoMo config: partnerCode/accessKey/secretKey' };
            }
            if (!finalRedirectUrl || !finalIpnUrl) {
                return { success: false, fee: 0, message: 'Missing MoMo redirectUrl or ipnUrl' };
            }

            const finalRequestType = requestType || config.requestType;
            const amountStr = Math.round(amount).toString();
            const finalOrderInfo = orderInfo || `MoMo payment for order ${orderId}`;

            const rawSignature = `accessKey=${config.accessKey}&amount=${amountStr}&extraData=&ipnUrl=${finalIpnUrl}&orderId=${orderId}&orderInfo=${finalOrderInfo}&partnerCode=${config.partnerCode}&redirectUrl=${finalRedirectUrl}&requestId=${orderId}&requestType=${finalRequestType}`;
            const signature = crypto.createHmac('sha256', config.secretKey).update(rawSignature).digest('hex');

            const requestBody = {
                partnerCode: config.partnerCode,
                partnerName: config.partnerName,
                storeId: config.storeId,
                requestId: orderId,
                amount: amountStr,
                orderId,
                orderInfo: finalOrderInfo,
                redirectUrl: finalRedirectUrl,
                ipnUrl: finalIpnUrl,
                lang: config.lang,
                requestType: finalRequestType,
                autoCapture: true,
                extraData: '',
                signature
            };

            const momoResponse = await fetch(config.endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });

            const momoResult = await momoResponse.json();

            if (momoResult && momoResult.payUrl) {
                return {
                    success: true,
                    fee: 0,
                    total: amount,
                    message: 'MoMo payment created',
                    meta: { payUrl: momoResult.payUrl, raw: momoResult }
                };
            }

            return {
                success: false,
                fee: 0,
                message: momoResult?.message || 'MoMo payment creation failed',
                meta: { raw: momoResult }
            };
        } catch (error) {
            return {
                success: false,
                fee: 0,
                message: error?.message || 'MoMo payment creation failed',
                meta: { statusCode: error?.statusCode }
            };
        }
    }

    _resolveConfig() {
        return {
            partnerCode: this.options.partnerCode || this._getEnv('MOMO_PARTNER_CODE', 'partnerCode'),
            accessKey: this.options.accessKey || this._getEnv('MOMO_ACCESS_KEY', 'accessKey'),
            secretKey: this.options.secretKey || this._getEnv('MOMO_SECRET_KEY', 'secretKey'),
            redirectUrl: this.options.redirectUrl || this._getEnv('MOMO_REDIRECT_URL', 'redirectUrl'),
            ipnUrl: this.options.ipnUrl || this._getEnv('MOMO_IPN_URL', 'ipnUrl'),
            requestType: this.options.requestType || this._getEnv('MOMO_REQUEST_TYPE', 'requestType'),
            endpoint: this.options.endpoint || this._getEnv('MOMO_ENDPOINT', 'endpoint'),
            partnerName: this.options.partnerName || this._getEnv('MOMO_PARTNER_NAME', 'partnerName'),
            storeId: this.options.storeId || this._getEnv('MOMO_STORE_ID', 'storeId'),
            lang: this.options.lang || this._getEnv('MOMO_LANG', 'lang')
        };
    }

    _getEnv(primaryKey, legacyKey) {
        return process.env[primaryKey] ?? process.env[legacyKey];
    }
}
