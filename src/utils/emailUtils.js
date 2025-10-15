import emailjs from "@emailjs/browser"

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      to_email: "info@greenpadconcepts.org",
    }

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
    )

    return {
      success: true,
      response: response,
    }
  } catch (error) {
    console.error("Error sending email:", error)
    return {
      success: false,
      error: error.message || "Failed to send email",
    }
  }
}

export const sendDonationConfirmationEmail = async (donorData) => {
  try {
    const templateParams = {
      to_name: donorData.name,
      to_email: donorData.email,
      donation_amount: donorData.amount,
      donation_type: donorData.type,
      transaction_id: donorData.transactionId,
    }

    const response = await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_DONATION_TEMPLATE_ID,
      templateParams,
    )

    return {
      success: true,
      response: response,
    }
  } catch (error) {
    console.error("Error sending confirmation email:", error)
    return {
      success: false,
      error: error.message || "Failed to send confirmation email",
    }
  }
}
