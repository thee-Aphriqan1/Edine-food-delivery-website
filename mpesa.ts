// services/mpesaService.ts
import axios from 'axios';
import env from '../config/env';
import Payment from '../models/Payment';
import Order from '../models/Order';

export interface MpesaPaymentRequest {
  phoneNumber: string;
  amount: number;
  orderId: string;
  description: string;
  userId: string;
}

export interface MpesaResponse {
  success: boolean;
  message: string;
  checkoutRequestId?: string;
  merchantRequestId?: string;
  responseCode?: string;
}

class MpesaService {
  private baseURL = 'https://sandbox.safaricom.co.ke';

  private formatPhone(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1);
    } else if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned;
    }
    
    if (cleaned.length !== 12) {
      throw new Error(`Invalid phone length: ${cleaned.length}, expected 12`);
    }
    
    return cleaned;
  }

  private async getAccessToken(): Promise<string> {
    try {
      const auth = Buffer.from(`${env.MPESA_CONSUMER_KEY}:${env.MPESA_CONSUMER_SECRET}`).toString('base64');
      
      // ✅ FIXED: Removed duplicate URL
      const response = await axios.get(
        `${this.baseURL}/oauth/v1/generate?grant_type=client_credentials`,
        {
          headers: { Authorization: `Basic ${auth}` },
          timeout: 10000
        }
      );

      return response.data.access_token;
    } catch (error: any) {
      console.error('Access Token Error:', error.response?.data || error.message);
      throw new Error('Failed to get M-Pesa access token');
    }
  }

  private generatePassword(timestamp: string): string {
    const passwordString = `${env.MPESA_SHORTCODE}${env.MPESA_PASSKEY}${timestamp}`;
    return Buffer.from(passwordString).toString('base64');
  }

  async initiateSTKPush(paymentData: MpesaPaymentRequest): Promise<MpesaResponse> {
    console.log('🔍 STK DEBUG - Input:', {
      phone: paymentData.phoneNumber,
      amount: paymentData.amount,
      orderId: paymentData.orderId
    });

    try {
      if (!env.MPESA_CONSUMER_KEY || !env.MPESA_CONSUMER_SECRET || !env.MPESA_SHORTCODE || !env.MPESA_PASSKEY) {
        return {
          success: false,
          message: 'M-Pesa credentials not configured'
        };
      }

      if (paymentData.amount < 1) {
        return {
          success: false,
          message: 'Amount must be at least 1 KES'
        };
      }

      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
      const password = this.generatePassword(timestamp);
      
      const formattedPhone = this.formatPhone(paymentData.phoneNumber);

      const requestBody = {
        BusinessShortCode: env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.ceil(paymentData.amount),
        PartyA: formattedPhone,
        PartyB: env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: env.MPESA_CALLBACK_URL,
        AccountReference: paymentData.orderId.slice(0, 12),
        TransactionDesc: paymentData.description.slice(0, 13)
      };

      console.log('📤 M-Pesa Request:', {
        ...requestBody,
        Password: '[REDACTED]'
      });

      // ✅ FIXED: Removed duplicate URL
      const response = await axios.post(
        `${this.baseURL}/mpesa/stkpush/v1/processrequest`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      console.log('📥 M-Pesa Response:', response.data);

      if (response.data.ResponseCode === '0') {
        return {
          success: true,
          message: 'M-Pesa payment initiated successfully. Check your phone.',
          checkoutRequestId: response.data.CheckoutRequestID,
          merchantRequestId: response.data.MerchantRequestID,
          responseCode: response.data.ResponseCode
        };
      } else {
        return {
          success: false,
          message: response.data.errorMessage || response.data.ResponseDescription || 'Failed to initiate M-Pesa payment',
          responseCode: response.data.ResponseCode
        };
      }
    } catch (error: any) {
      console.error('❌ M-Pesa STK Push Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      
      return {
        success: false,
        message: error.response?.data?.errorMessage || 
                 error.response?.data?.message || 
                 error.message || 
                 'Failed to initiate M-Pesa payment'
      };
    }
  }

  async queryPaymentStatus(checkoutRequestId: string): Promise<any> {
    try {
      const accessToken = await this.getAccessToken();
      const timestamp = new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
      const password = this.generatePassword(timestamp);

      const requestBody = {
        BusinessShortCode: env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      };

      // ✅ This one was already correct
      const response = await axios.post(
        `${this.baseURL}/mpesa/stkpushquery/v1/query`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('M-Pesa Query Error:', error.response?.data || error.message);
      throw new Error('Failed to query M-Pesa payment status');
    }
  }

  async processCallback(callbackData: any): Promise<any> {
    try {
      console.log('Processing callback:', JSON.stringify(callbackData, null, 2));
      
      const stkCallback = callbackData.Body?.stkCallback;
      
      if (!stkCallback) {
        throw new Error('Invalid callback data structure');
      }

      const result = {
        checkoutRequestId: stkCallback.CheckoutRequestID,
        merchantRequestId: stkCallback.MerchantRequestID,
        resultCode: stkCallback.ResultCode,
        resultDesc: stkCallback.ResultDesc,
        metadata: stkCallback.CallbackMetadata?.Item || []
      };

      let mpesaReceiptNumber = null;
      if (result.metadata && Array.isArray(result.metadata)) {
        const receiptItem = result.metadata.find((item: any) => item.Name === 'MpesaReceiptNumber');
        if (receiptItem) {
          mpesaReceiptNumber = receiptItem.Value;
        }
      }

      const paymentUpdate: any = {
        status: result.resultCode === 0 ? 'completed' : 'failed',
        callbackMetadata: result.metadata
      };

      if (mpesaReceiptNumber) {
        paymentUpdate.mpesaTransactionId = mpesaReceiptNumber;
      }

      const payment = await Payment.findOneAndUpdate(
        { checkoutRequestId: result.checkoutRequestId },
        paymentUpdate,
        { new: true }
      );

      if (payment) {
        await Order.findByIdAndUpdate(payment.orderId, {
          paymentStatus: result.resultCode === 0 ? 'paid' : 'failed',
          status: result.resultCode === 0 ? 'confirmed' : 'pending'
        });
      }

      return result;
    } catch (error) {
      console.error('Error processing callback:', error);
      throw new Error('Failed to process M-Pesa callback');
    }
  }
}

export default new MpesaService();

