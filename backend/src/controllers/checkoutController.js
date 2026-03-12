import { CheckoutContext } from '../strategies/CheckoutContext.js';
import crypto from 'crypto';

const mockDatabase = [];

export const checkout = async (req, res) => {
    const { amount, customerTypeStrategy, paymentStrategy } = req.body;

    const context = new CheckoutContext(amount);
    context.setTaxStrategy(customerTypeStrategy);
    context.setPaymentStrategy(paymentStrategy);

    const result = context.executeCheckout();
    const orderId = 'ORD-' + new Date().getTime();

    const newOrder = {
        orderId,
        createdAt: new Date().toISOString(),
        customerType: customerTypeStrategy,
        paymentMethod: paymentStrategy,
        billingDetails: result
    };
    mockDatabase.push(newOrder);

    // NẾU LÀ THANH TOÁN VÍ ĐIỆN TỬ -> GỌI API MOMO
    if (paymentStrategy === 'E_WALLET') {
        // Cấu hình MoMo Sandbox (Môi trường test)
        const partnerCode = "MOMOBKUN20180529";
        const accessKey = "klm05TvNCzjOaHU1";
        const secretKey = "at67qH6mk8g5HI1kIQAtq911z4tP9hO1";
        const redirectUrl = "http://localhost:5173/products"; // Link trả về sau khi thanh toán
        const ipnUrl = "http://localhost:3000/api/momo-ipn"; // Webhook MoMo gọi về
        const requestType = "captureWallet";
        const orderInfo = "Thanh toán đơn hàng TechStore " + orderId;
        const amountStr = Math.round(result.total).toString();

        const rawSignature = `accessKey=${accessKey}&amount=${amountStr}&extraData=&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${orderId}&requestType=${requestType}`;
        
        const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

        const requestBody = {
            partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: orderId,
            amount: amountStr,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang: "vi",
            requestType,
            autoCapture: true,
            extraData: "",
            signature
        };

        try {
            // Node.js v18+ hỗ trợ sẵn fetch
            const momoResponse = await fetch('https://test-payment.momo.vn/v2/gateway/api/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestBody)
            });
            const momoResult = await momoResponse.json();

            if (momoResult.payUrl) {
                return res.json({
                    success: true,
                    data: { ...newOrder, payUrl: momoResult.payUrl }
                });
            } else {
                return res.status(400).json({ success: false, message: momoResult.message });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // NẾU LÀ COD HOẶC CREDIT CARD THÌ TRẢ VỀ BÌNH THƯỜNG
    res.json({
        success: true,
        data: newOrder
    });
};

export const getOrders = (req, res) => {
    res.json({ total: mockDatabase.length, orders: mockDatabase });
};

export const getStrategies = (req, res) => {
    res.json({
        tax: ['PERSONAL', 'BUSINESS', 'EDUCATION'],
        payment: ['COD', 'E_WALLET', 'CREDIT_CARD']
    });
};