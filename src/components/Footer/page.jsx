import React from 'react';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#024548] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-6">
            <img src="new-logo.jpg" alt="Company Logo" className="h-36 rounded-full" />
          </div>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://www.instagram.com/castlerestaurant.blr/" className="hover:text-gray-300 transition-colors" target='__blank'>
              <Instagram className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Youtube className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
          <p className="text-sm text-center md:text-left">
            © 2025 Castle Restaurant. All rights reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">Contact</h3>

          <div className="space-y-2">
            <h4 className="text-lg font-medium">Madiwalla</h4>
            <p className="text-sm">123 Placeholder Street, Near Random Mall, Random City 123456</p>
            <p className="text-sm">+91 1234567890</p>
            <p className="text-sm">compliance@castlerestaurants.in	</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-medium">Madiwalla - South</h4>
            <p className="text-sm">456 Example Avenue, Opposite Placeholder Park, Example City 654321</p>
            <p className="text-sm">+91 9876543210</p>
            <p className="text-sm">compliance@castlerestaurants.in	</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-medium">Malappuram</h4>
            <p className="text-sm">456 Example Avenue, Opposite Placeholder Park, Example City 654321</p>
            <p className="text-sm">+91 9876543210</p>
            <p className="text-sm">compliance@castlerestaurants.in	</p>
          </div>
          <a
            href="https://www.google.com/maps/place/Castle+Multi+Cuisine+Restaurant/@12.931832,77.6062244,15.21z/data=!4m10!1m2!2m1!1sCastle+Multi+Cusine+Restaurant!3m6!1s0x3bae15b65bce4843:0x5c372af0696e6537!8m2!3d12.9226241!4d77.6144043!15sCh5DYXN0bGUgTXVsdGkgQ3VzaW5lIFJlc3RhdXJhbnRaICIeY2FzdGxlIG11bHRpIGN1c2luZSByZXN0YXVyYW50kgEXbm9ydGhfaW5kaWFuX3Jlc3RhdXJhbnTgAQA!16s%2Fg%2F11t6lhd7kf?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline text-sm"
          >
            Find us on Google
          </a>
        </div>

        {/* Branches & Newsletter */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-gray-100">Our Branches</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Kerala</li>
            <li>Karnataka</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-100">Stay Updated</h3>
          <p className="text-sm">Subscribe to our newsletter for the latest updates and insights.</p>
          <form className="flex mt-4">
            <input
              type="email"
              placeholder="Your email"
              className="p-3 rounded-l-md w-2/3 text-white focus:outline-none"
            />
            <button
              type="submit"
              className="p-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-4 mt-10 border-t border-gray-700">
        <p className="text-sm">&copy; 2025  Castle Restaurant. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;