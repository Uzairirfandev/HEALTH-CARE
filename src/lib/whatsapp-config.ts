export interface WhatsAppConfig {
  businessPhoneNumber: string;
  defaultMessage: string;
  apiToken?: string;
  webhookVerifyToken?: string;
}

export const whatsappConfig: WhatsAppConfig = {
  businessPhoneNumber: import.meta.env.VITE_WHATSAPP_BUSINESS_PHONE_NUMBER || "1234567890",
  defaultMessage: import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE || "Hello! I'm interested in your healthcare services. Can you provide more information?",
  apiToken: import.meta.env.VITE_WHATSAPP_API_TOKEN,
  webhookVerifyToken: import.meta.env.VITE_WHATSAPP_WEBHOOK_VERIFY_TOKEN,
};

export const generateWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters and ensure it starts with country code
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.startsWith('1') && cleaned.length === 11 ? cleaned : `1${cleaned}`;
};
