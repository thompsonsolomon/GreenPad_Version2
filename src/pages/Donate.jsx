import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, Check, CreditCard, DollarSign } from "lucide-react"
import { initializePaystackPayment } from "../utils/paystackUtils"
import { createDonation } from "../utils/firebaseUtils"
import { sendDonationConfirmationEmail } from "../utils/emailUtils"

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState("")
  const [donationType, setDonationType] = useState("one-time")
  const [donorInfo, setDonorInfo] = useState({
    name: "",
    email: "",
  })
  const [loading, setLoading] = useState(false)
  const [paystackLoaded, setPaystackLoaded] = useState(false)

  const presetAmounts = [25, 50, 100, 250, 500]

  const impactItems = [
    {
      amount: 25,
      impact: "Provides seeds and tools for one family's sustainable garden",
    },
    {
      amount: 50,
      impact: "Plants 50 trees in deforested areas",
    },
    {
      amount: 100,
      impact: "Supplies sanitry pads for young girls ",
    },
    {
      amount: 250,
      impact: "Funds environmental education for 30 students",
    },
    {
      amount: 500,
      impact: "Establishes a community composting system",
    },
  ]

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    script.onload = () => setPaystackLoaded(true)
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleInputChange = (e) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleDonate = async (e) => {
    e.preventDefault()

    if (!paystackLoaded) {
      alert("Payment system is loading. Please try again in a moment.")
      return
    }

    const amount = Number.parseInt(customAmount) || selectedAmount

    if (!donorInfo.name || !donorInfo.email) {
      alert("Please fill in all required fields")
      return
    }

    setLoading(true)

    // Initialize Paystack payment
    initializePaystackPayment(
      donorInfo.email,
      amount,
      {
        custom_fields: [
          {
            display_name: "Donor Name",
            variable_name: "donor_name",
            value: donorInfo.name,
          },
          {
            display_name: "Donation Type",
            variable_name: "donation_type",
            value: donationType,
          },
        ],
      },
      async (response) => {
        if (response.success) {
          // Save donation to Firebase
          const donationData = {
            name: donorInfo.name,
            email: donorInfo.email,
            amount: amount,
            type: donationType,
            status: "completed",
            transactionId: response.reference,
          }

          const result = await createDonation(donationData)

          if (result.success) {
            // Send confirmation email
            await sendDonationConfirmationEmail({
              ...donationData,
              transactionId: response.reference,
            })

            alert(
              `Thank you for your ${donationType} donation of $${amount}! A confirmation email has been sent to ${donorInfo.email}.`,
            )

            // Reset form
            setDonorInfo({ name: "", email: "" })
            setCustomAmount("")
            setSelectedAmount(50)
          } else {
            alert("Payment successful but failed to save donation record. Please contact support.")
          }
        } else {
          alert(response.message || "Payment was not completed")
        }

        setLoading(false)
      },
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/reforestation-tree-planting-forest-restoration.jpg" alt="Donate hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/60" />
        </div>

        <div className="container-custom relative z-10 text-white text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Heart size={64} className="mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">Make a Difference Today</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
              Your donation helps us create sustainable solutions for communities and the environment
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding">
        <div className="container-custom max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-8  rounded-[10px] shadow-xl">
                <h2 className="text-3xl font-serif font-bold mb-6 text-primary">Choose Your Donation</h2>

                <form onSubmit={handleDonate}>
                  {/* Donation Type */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setDonationType("one-time")}
                        className={`p-4 rounded-[10px] border-2 font-medium transition-all ${
                          donationType === "one-time"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        type="button"
                        onClick={() => setDonationType("monthly")}
                        className={`p-4  rounded-[10px] border-2 font-medium transition-all ${
                          donationType === "monthly"
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 hover:border-primary"
                        }`}
                      >
                        Monthly
                      </button>
                    </div>
                  </div>

                  {/* Preset Amounts */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
                    <div className="grid grid-cols-3 gap-3">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          onClick={() => {
                            setSelectedAmount(amount)
                            setCustomAmount("")
                          }}
                          className={`p-4  rounded-[10px] border-2 font-medium transition-all ${
                            selectedAmount === amount && !customAmount
                              ? "border-primary bg-primary text-white"
                              : "border-gray-300 hover:border-primary"
                          }`}
                        >
                          ${amount}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom Amount */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Or Enter Custom Amount</label>
                    <div className="relative">
                      <DollarSign
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter amount"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-12 pr-4 py-3  rounded-[10px] border-2 border-gray-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  {/* Donor Information */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={donorInfo.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3  rounded-[10px] border-2 border-gray-300 focus:outline-none focus:border-primary"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={donorInfo.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3  rounded-[10px] border-2 border-gray-300 focus:outline-none focus:border-primary"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || !paystackLoaded}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        Donate ${customAmount || selectedAmount}
                      </>
                    )}
                  </button>

                  <p className="text-sm text-gray-600 text-center mt-4">
                    Secure payment powered by Paystack. Your donation is tax-deductible.
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Impact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="sticky top-24">
                <h2 className="text-3xl font-serif font-bold mb-6 text-primary">Your Impact</h2>
                <div className="space-y-4">
                  {impactItems.map((item, index) => (
                    <div
                      key={index}
                      className={`p-4  rounded-[10px] border-2 transition-all ${
                        (customAmount ? Number.parseInt(customAmount) : selectedAmount) >= item.amount
                          ? "border-primary bg-primary/5"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            (customAmount ? Number.parseInt(customAmount) : selectedAmount) >= item.amount
                              ? "bg-primary"
                              : "bg-gray-300"
                          }`}
                        >
                          {(customAmount ? Number.parseInt(customAmount) : selectedAmount) >= item.amount && (
                            <Check size={16} className="text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-charcoal">${item.amount}</p>
                          <p className="text-sm text-gray-700">{item.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-cream  rounded-[10px]">
                  <h3 className="font-serif font-bold text-xl mb-3 text-primary">Why Donate?</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span>100% of your donation goes directly to our programs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span>Tax-deductible receipts provided</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span>Regular updates on project impact</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={20} className="text-primary flex-shrink-0 mt-1" />
                      <span>Transparent reporting and accountability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-primary">
            Other Ways to Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6  rounded-[10px] shadow-lg text-center">
              <h3 className="text-xl font-serif font-bold mb-3 text-charcoal">Volunteer</h3>
              <p className="text-gray-700 mb-4">Join our team and make a hands-on difference in your community.</p>
              <a href="/contact" className="text-primary font-medium hover:underline">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6  rounded-[10px] shadow-lg text-center">
              <h3 className="text-xl font-serif font-bold mb-3 text-charcoal">Corporate Partnership</h3>
              <p className="text-gray-700 mb-4">Partner with us to amplify your company's social impact.</p>
              <a href="/contact" className="text-primary font-medium hover:underline">
                Learn More →
              </a>
            </div>
            <div className="bg-white p-6  rounded-[10px] shadow-lg text-center">
              <h3 className="text-xl font-serif font-bold mb-3 text-charcoal">Spread the Word</h3>
              <p className="text-gray-700 mb-4">Share our mission with your network and help us grow.</p>
              <a href="/contact" className="text-primary font-medium hover:underline">
                Learn More →
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
