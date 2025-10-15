import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-white">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <img src="/Logo.jpeg" className="rounded-[50%]" alt="" />
              </div>
              <span className="font-serif font-bold text-xl">GreenPad</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering communities through environmental sustainability and  targeted programs that address critical hygienic  and social challenges among young girls .
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-primary transition-colors">
                  Donate
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>2, Orisunbare Street Ondo Road, Akure, Ondo State

</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Phone size={18} className="flex-shrink-0" />
                <span>+(234) 806-3229-816</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail size={18} className="flex-shrink-0" />
                <span>greenpadconcepts@yahoo.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on our latest projects and initiatives.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-[50px] bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-primary"
              />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© {currentYear} GreenPad Concepts. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://web.facebook.com/GreenPad-Concepts" className="text-gray-400 hover:text-primary transition-colors" aria-label="Facebook">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-primary transition-colors" aria-label="Twitter">
              <Twitter size={20} />
            </a>
            <a href="http://instagram.com/greenpad.concepts" className="text-gray-400 hover:text-primary transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@greenpadconcepts" className="text-gray-400 hover:text-primary transition-colors" aria-label="tiktok">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
