// src/shared/utils/whatsapp.js
// WhatsApp utility for building order messages and redirect URLs

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER;

/**
 * Build a WhatsApp order message from cart items
 * @param {Array} cartItems - Array of { name, quantity, price, unit }
 * @param {object} customerInfo - Optional { name, address, notes }
 * @returns {string} Formatted message text
 */
export const buildOrderMessage = (cartItems, customerInfo = {}) => {
  let message = `🛒 *New Order from GroceryShop*\n\n`;

  if (customerInfo.name) {
    message += `👤 *Customer:* ${customerInfo.name}\n`;
  }
  if (customerInfo.address) {
    message += `📍 *Address:* ${customerInfo.address}\n`;
  }

  message += `\n📦 *Order Items:*\n`;
  message += `─────────────────\n`;

  let total = 0;

  cartItems.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    message += `${index + 1}. ${item.name}\n`;
    message += `   ${item.quantity} ${item.unit || 'pcs'} × ₹${item.price} = ₹${itemTotal}\n`;
  });

  message += `─────────────────\n`;
  message += `💰 *Total: ₹${total}*\n`;

  if (customerInfo.notes) {
    message += `\n📝 *Notes:* ${customerInfo.notes}\n`;
  }

  message += `\nThank you! 🙏`;

  return message;
};

/**
 * Generate WhatsApp redirect URL
 * @param {string} message - The message text
 * @returns {string} WhatsApp URL
 */
export const getWhatsAppUrl = (message) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
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
