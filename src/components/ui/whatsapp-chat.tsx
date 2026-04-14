import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { whatsappConfig, generateWhatsAppUrl } from '@/lib/whatsapp-config';

interface WhatsAppChatProps {
  phoneNumber?: string;
  message?: string;
  position?: 'bottom-right' | 'bottom-left';
}

export function WhatsAppChat({ 
  phoneNumber = whatsappConfig.businessPhoneNumber, 
  message = whatsappConfig.defaultMessage,
  position = 'bottom-right'
}: WhatsAppChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState(message);

  const handleWhatsAppClick = () => {
    const whatsappUrl = generateWhatsAppUrl(phoneNumber, chatMessage);
    window.open(whatsappUrl, '_blank');
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      handleWhatsAppClick();
    }
  };

  const positionClasses = position === 'bottom-right' 
    ? 'bottom-6 right-6' 
    : 'bottom-6 left-6';

  return (
    <div className={`fixed ${positionClasses} z-50 flex flex-col items-end gap-4`}>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-80 max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Health Care Support</h3>
                  <p className="text-xs text-green-100">We typically reply instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Message Area */}
            <div className="p-4 bg-gray-50 min-h-[120px]">
              <p className="text-gray-700 text-sm mb-3">
                Hello! How can we help you today? Our healthcare team is ready to assist you.
              </p>
              <div className="bg-white p-3 rounded-lg border border-gray-200">
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message here..."
                  className="w-full resize-none outline-none text-sm text-gray-700"
                  rows={3}
                />
              </div>
            </div>

            {/* Send Button */}
            <div className="p-4 bg-white border-t border-gray-200">
              <button
                onClick={handleSendMessage}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <Send size={18} />
                Send via WhatsApp
              </button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Messages are sent directly to WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all shadow-green-500/25 hover:shadow-green-500/40"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Notification Badge */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        />
      )}
    </div>
  );
}
