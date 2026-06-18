// src/shared/utils/whatsapp.js
// WhatsApp utility for building order messages and redirect URLs

const WHATSAPP_NUMBER = '9518967710';

/**
 * Build a WhatsApp order message from cart items
 * @param {Array} cartItems - Array of { name, quantity, price, unit }
 * @param {object} customerInfo - { name, phone, address, notes }
 * @returns {string} Formatted message text
 */
export const buildOrderMessage = (cartItems, customerInfo = {}) => {
  const now = new Date();
  const dateTimeStr = now.toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  let message = `🛒 *NEW SUPERMARKET ORDER*\n\n`;

  message += `*Customer Name:* ${customerInfo.name || 'N/A'}\n`;
  message += `*Mobile Number:* ${customerInfo.phone || 'N/A'}\n\n`;

  message += `*Delivery Address:*\n${customerInfo.address || 'N/A'}\n\n`;

  message += `*Ordered Products:*\n`;
  let total = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `- ${item.name} × ${item.quantity} = ₹${itemTotal}\n`;
  });

  message += `\n*Total Amount: ₹${total}*\n\n`;

  message += `*Additional Notes:*\n${customerInfo.notes || 'None'}\n\n`;

  message += `*Date & Time:* ${dateTimeStr}\n\n`;
  message += `Thank You.`;

  return message;
};

/**
 * Generate WhatsApp redirect URL
 * @param {string} message - The message text
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppUrl = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/91${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Open WhatsApp with order message
 * @param {Array} cartItems - Cart items array
 * @param {object} customerInfo - Customer details
 */
export const sendOrderToWhatsApp = (cartItems, customerInfo = {}) => {
  const message = buildOrderMessage(cartItems, customerInfo);
  const url = getWhatsAppUrl(message);
  window.open(url, '_blank');
};
