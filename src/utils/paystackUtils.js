// Paystack payment integration utilities

export const initializePaystackPayment = (email, amount, metadata, callback) => {
  const handler = window.PaystackPop.setup({
    // key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
    key: import.meta.env.VITE_PAYSTACK_TEST_PUBLIC_kEY,

    email: email,
    amount: amount * 100, // Convert to kobo (smallest currency unit)
    currency: "NGN",
    metadata: metadata,
    callback: (response) => {
      // Payment successful
      callback({
        success: true,
        reference: response.reference,
        message: "Payment completed successfully",
      })
    },
    onClose: () => {
      // Payment window closed
      callback({
        success: false,
        message: "Payment cancelled",
      })
    },
  })

  handler.openIframe()
}

export const verifyPaystackPayment = async (reference) => {
  try {
    // In production, this should be done on the backend
    // For now, we'll just return success based on reference existence
    if (reference) {
      return {
        success: true,
        reference: reference,
      }
    }
    return {
      success: false,
      error: "Invalid reference",
    }
  } catch (error) {
    console.error("Error verifying payment:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}
