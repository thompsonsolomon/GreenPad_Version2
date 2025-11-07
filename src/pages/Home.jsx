"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { ArrowRight, Leaf, Users, Target, TrendingUp, Heart, Globe } from "lucide-react"

export default function Home() {
  const stats = [
    { number: "25,000+", label: "Beneficiaries", icon: Leaf },
    { number: "15+", label: "Jobs created", icon: Users },
    { number: "85%", label: "Increase in Educational Uptake", icon: Target },
    // { number: "85%", label: "Carbon Reduction", icon: TrendingUp },
  ]

  const initiatives = [
    {
      title: "Climate Action",
      description: "Leading the fight against climate change through innovative solutions and community engagement.",
      image: "/013.jpg",
    },
    {
      title: "Sustainable Agriculture",
      description: "Empowering farmers with sustainable practices that protect the environment and increase yields.",
      image: "/about1.jpg",
    },
    {
      title: "Clean Water Access",
      description: "Providing clean water solutions to communities in need through innovative filtration systems.",
      image: "/about2.jpeg",
    },
    {
      title: "Environmental Education",
      description: "Educating the next generation about environmental stewardship and sustainable living.",
      image: "/about3.jpg",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="heroLogo1.jpeg" alt="Hero background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-charcoal/40" />
        </div>

        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 text-balance"
            >
             Small changes can transform a young girl’s life.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed"
            >
            We strongly believe that making an impact for the young women and girls of our communities benefits far beyond them
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/donate" className="btn-primary inline-flex items-center justify-center gap-2">
                Support Our Mission
                <Heart size={20} />
              </Link>
              <Link
                to="/about"
                className="btn-outline bg-white/10 backdrop-blur-sm rounded-[5px] border-white text-white hover:bg-white hover:text-charcoal inline-flex items-center justify-center gap-2"
              >
                Learn More
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2 cursor-pointer"
          >
            <motion.div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">{stat.number}</h3>
                  <p className="text-gray-700 font-medium">{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary text-balance">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              At GreenPad Concepts, our mission is to provide for the health, education, emotional wellbeing and hygiene of women and girls in low-income populations through the provision of biodegradable sanitary pad.
            </p>
            <Link to="/about" className="btn-primary inline-flex items-center gap-2">
              Discover Our Story
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Initiatives Grid */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">Our Initiatives</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Transforming communities through targeted programs that address critical environmental and social
              challenges.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={initiative.image || "/placeholder.svg"}
                    alt={initiative.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-serif font-bold mb-3 text-charcoal">{initiative.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{initiative.description}</p>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  >
                    Learn More
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Globe size={64} className="mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
              Join Us in Making a Difference
            </h2>
            <p className="text-xl mb-8 text-gray-200 leading-relaxed">
              Your support helps us create sustainable solutions that benefit  young women and girls of our communities.
              
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/donate"
                className="bg-white text-primary hover:bg-cream px-8 py-3 rounded-[5px] font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2"
              >
                Donate Now
                <Heart size={20} />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-[5px] font-medium transition-all duration-200 inline-flex items-center justify-center gap-2"
              >
                Get Involved
                <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
