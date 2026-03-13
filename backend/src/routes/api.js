import express from 'express';
import { checkout, getStrategies, getOrders } from '../controllers/checkoutController.js';

const router = express.Router();

router.post('/checkout', checkout);
router.get('/checkout/strategies', getStrategies);

router.get('/orders', getOrders); 

// VNPay Sandbox Payment Page with QR Code
router.get('/vnpay-sandbox', (req, res) => {
    const { orderId, amount, orderInfo, returnUrl } = req.query;
    
    console.log(`[VNPay Sandbox] Payment page - Order: ${orderId}, Amount: ${amount} VND`);

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VNPay Sandbox Payment</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                min-height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            .container {
                background: white;
                border-radius: 20px;
                padding: 40px;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-width: 500px;
                width: 100%;
                text-align: center;
            }
            .header {
                margin-bottom: 30px;
            }
            .logo {
                font-size: 48px;
                margin-bottom: 10px;
            }
            h1 {
                color: #333;
                font-size: 28px;
                margin-bottom: 5px;
            }
            .subtitle {
                color: #666;
                font-size: 14px;
                margin-bottom: 5px;
            }
            .badge {
                display: inline-block;
                background: #fff3cd;
                color: #856404;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
                margin-top: 5px;
            }
            .qr-box {
                background: #f5f5f5;
                border-radius: 15px;
                padding: 20px;
                margin: 30px 0;
                border: 2px dashed #ddd;
            }
            .qr-code {
                width: 200px;
                height: 200px;
                margin: 0 auto;
                background: white;
                border-radius: 10px;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 100px;
                border: 1px solid #ddd;
            }
            .order-info {
                background: #f9f9f9;
                border-radius: 10px;
                padding: 15px;
                margin: 20px 0;
                text-align: left;
            }
            .info-row {
                display: flex;
                justify-content: space-between;
                padding: 8px 0;
                border-bottom: 1px solid #eee;
                font-size: 14px;
            }
            .info-row:last-child {
                border-bottom: none;
            }
            .info-label {
                color: #666;
                font-weight: 500;
            }
            .info-value {
                color: #333;
                font-weight: 600;
                word-break: break-all;
            }
            .button-group {
                display: flex;
                gap: 10px;
                margin-top: 30px;
            }
            button {
                flex: 1;
                padding: 12px;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .btn-success {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
            }
            .btn-success:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
            }
            .btn-cancel {
                background: #f0f0f0;
                color: #333;
                border: 1px solid #ddd;
            }
            .btn-cancel:hover {
                background: #e0e0e0;
            }
            .instructions {
                background: #e8f4f8;
                border-left: 4px solid #00bcd4;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                text-align: left;
                font-size: 13px;
                color: #333;
            }
            .instructions strong {
                color: #00897b;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🏦</div>
                <h1>VNPay Payment</h1>
                <p class="subtitle">Sandbox Test Gateway</p>
                <div class="badge">SANDBOX MODE</div>
            </div>

            <div class="qr-box">
                <p style="color: #666; margin-bottom: 10px; font-size: 12px;">Scan QR Code to Pay</p>
                <div class="qr-code">📱</div>
            </div>

            <div class="order-info">
                <div class="info-row">
                    <div class="info-label">Order ID:</div>
                    <div class="info-value">${orderId || 'N/A'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Amount:</div>
                    <div class="info-value">${amount ? parseInt(amount).toLocaleString('vi-VN') + ' VND' : 'N/A'}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Description:</div>
                    <div class="info-value">${orderInfo || 'Payment'}</div>
                </div>
            </div>

            <div class="instructions">
                <strong>📝 Instructions:</strong>
                <p>Click "Complete Payment" to simulate successful VNPay payment in sandbox mode and return to store.</p>
            </div>

            <div class="button-group">
                <button class="btn-success" onclick="completePayment()">✓ Complete Payment</button>
                <button class="btn-cancel" onclick="cancelPayment()">✗ Cancel</button>
            </div>
        </div>

        <script>
            function completePayment() {
                const returnUrl = '${returnUrl || 'http://localhost:5173/products'}';
                const successUrl = new URL(returnUrl);
                successUrl.searchParams.append('vnp_ResponseCode', '00');
                successUrl.searchParams.append('vnp_TxnRef', '${orderId}');
                successUrl.searchParams.append('vnp_Amount', '${amount}');
                successUrl.searchParams.append('vnp_TransactionNo', 'SANDBOX_' + Date.now());
                
                console.log('VNPay Sandbox Success:', successUrl.toString());
                window.location.href = successUrl.toString();
            }

            function cancelPayment() {
                const returnUrl = '${returnUrl || 'http://localhost:5173/products'}';
                window.location.href = returnUrl;
            }
        </script>
    </body>
    </html>
    `;

    res.send(html);
});

router.get('/health', (req, res) => res.json({ status: 'ok' }));

export default router;