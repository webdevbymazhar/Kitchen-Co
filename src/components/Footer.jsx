'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Twitter, ChevronRight, Clock, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const [hoveredLink, setHoveredLink] = useState('')

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6 gap-3 group">
              {/* <div className="rounded-full overflow-hidden shadow-lg shadow-orange-500/50 group-hover:shadow-orange-500/75 transition-shadow duration-300">
                <Image src="/logoo.png" alt="Restaurant Logo" width={60} height={60} className="object-cover transform group-hover:scale-110 transition-transform duration-300" />
              </div> */}
              <h2 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                Kitchen & Co.
              </h2>
            </div>
            <p className="text-sm mb-4 leading-relaxed text-gray-300 hover:text-gray-100 transition-colors duration-300">
              Experience culinary excellence at Al-Tastehub. Our passionate chefs craft unforgettable dishes that blend tradition with innovation.
            </p>
            <Link href="#" className="inline-flex items-center group px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors duration-300">
              <span className="text-sm font-semibold">Explore Our Story</span>
              <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-6 text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Menu', 'About Us', 'Reservations', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className={`hover:text-orange-400 transition-colors duration-300 flex items-center ${
                      hoveredLink === item ? 'text-orange-400' : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHoveredLink(item)}
                    onMouseLeave={() => setHoveredLink('')}
                  >
                    <ChevronRight className={`mr-2 w-4 h-4 transition-transform duration-300 ${
                      hoveredLink === item ? 'translate-x-1' : ''
                    }`} />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Featured Dishes */}
          <div>
            <h3 className="font-bold mb-6 text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              Featured Dishes
            </h3>
            <ul className="space-y-3">
              {['Grilled Sea Bass', 'Truffle Risotto', 'Wagyu Steak', 'Vegan Buddha Bowl'].map((dish) => (
                <li key={dish}>
                  <Link
                    href="#"
                    className={`hover:text-orange-400 transition-colors duration-300 flex items-center ${
                      hoveredLink === dish ? 'text-orange-400' : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHoveredLink(dish)}
                    onMouseLeave={() => setHoveredLink('')}
                  >
                    <ChevronRight className={`mr-2 w-4 h-4 transition-transform duration-300 ${
                      hoveredLink === dish ? 'translate-x-1' : ''
                    }`} />
                    {dish}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-bold mb-6 text-xl text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
              Get in Touch
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center text-gray-300">
                <MapPin className="mr-2 w-5 h-5 text-orange-400" />
                <span>123 Gourmet Street, Foodville</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="mr-2 w-5 h-5 text-orange-400" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Clock className="mr-2 w-5 h-5 text-orange-400" />
                <span>Mon-Sat: 11AM-11PM, Sun: 12PM-9PM</span>
              </li>
            </ul>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, label: 'Facebook' },
                { Icon: Instagram, label: 'Instagram' },
                { Icon: Twitter, label: 'Twitter' },
              ].map(({ Icon, label }) => (
                <Link key={label} href="#" className="text-gray-400 hover:text-orange-400 transition-colors duration-300">
                  <Icon size={24} className="transform hover:scale-110 transition-transform duration-300" />
                  <span className="sr-only">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 bg-gray-800 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-md hover:from-orange-600 hover:to-red-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Copyright and Links */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 sm:mb-0">
            © 2024 Kitchen & Co. All Rights Reserved. Crafted with passion by Isaac
          </p>
          <div className="flex space-x-6">
            {['Terms of Service', 'Privacy Policy', 'Accessibility'].map((text) => (
              <Link
                key={text}
                href="#"
                className="text-sm text-gray-400 hover:text-orange-400 transition-colors duration-300"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}