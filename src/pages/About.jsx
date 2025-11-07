"use client"

import { motion } from "framer-motion"
import { Target, Eye, Award, Users, Leaf, Heart } from "lucide-react"

export default function About() {
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We prioritize long-term environmental health in every decision we make.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Empowering local communities is at the heart of everything we do.",
    },
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach our work with empathy and understanding for all stakeholders.",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in our programs and operations.",
    },
  ]

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Executive Director",
      image: "/professional-woman-executive-director.png",
    },
    {
      name: "Michael Chen",
      role: "Director of Programs",
      image: "/professional-man-programs-director.jpg",
    },
    {
      name: "Amara Okafor",
      role: "Community Outreach Lead",
      image: "/professional-woman-community-outreach.jpg",
    }
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/013.jpg" alt="About hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/90 to-charcoal/60" />
        </div>

        <div className="container-custom relative z-10 text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            About GreenPad Concepts
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200"
          >
            Building bridges between Feminine Hygiene, Environmental Sustainability and Community Empowerment since 2017
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-primary">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  GreenPad Concepts project started by providing free sanitary pads for school girls after the funder observed the pattern of school absenteeism among Nigeria rural girls. He later had the opportunity to interview a community teacher on why girls are most time out of school; the teacher narrowed it down to lack of access to feminine hygiene product and its ripple effects on girl’s health and education. The founder started by raising funds from personal savings, family and friends to provide free sanitary pads; but it wasn’t sustainable. That is how the idea of producing local sanitary pads set-in.
                </p>
                <p>
                  What started as a small initiative to provide free pads to girls in   local neighborhoods has grown into a
                  comprehensive organization addressing menstrual hygiene, reproductive health, and
                  environmental education across many communities.
                </p>
                <p>
                  Today, we work with local partners, international organizations, and dedicated volunteers to create
                  lasting change that benefits young women and girls of our communities.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative h-[500px] rounded-lg overflow-hidden shadow-xl"
            >
              <img src="/about.jpeg" alt="Our story" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4 text-primary">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
               We empower women and girls in low-income communities through access to biodegradable sanitary pads, hygiene education, and entrepreneurship training.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6">
                <Eye size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4 text-primary">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                We envision a world where every woman and girl lives with dignity, equality, and the power to shape her own future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">Our Core Values</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              The principles that guide our work and define who we are as an organization
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-4">
                    <Icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-3 text-charcoal">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-primary">Meet Our Team</h2>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Dedicated professionals working together to create positive environmental and social change
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-serif font-bold mb-2 text-charcoal">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
