/**
 * Format price in Indian Rupees
 * @param {number|string} amount - The amount to format
 * @returns {string} Formatted price with ₹ symbol
 */
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '₹0.00'
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return `₹${numAmount.toFixed(2)}`
}

/**
 * Format price in Indian Rupees without decimal places for whole numbers
 * @param {number|string} amount - The amount to format
 * @returns {string} Formatted price with ₹ symbol
 */
export const formatCurrencySimple = (amount) => {
  if (amount === null || amount === undefined) return '₹0'
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  if (numAmount % 1 === 0) {
    return `₹${numAmount}`
  }
  return `₹${numAmount.toFixed(2)}`
}

