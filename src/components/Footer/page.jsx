import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#A50202] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-6">
            <img src="Resto-mandi-logo.png" alt="Company Logo" className="h-36 rounded-full" />
          </div>
          <p className="text-sm text-center md:text-left">
            © 2024 Random Company. All rights reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold">Contact</h3>

          {/* Random Branch 1 */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium">Random Branch 1</h4>
            <p className="text-sm">123 Placeholder Street, Near Random Mall, Random City 123456</p>
            <p className="text-sm">+91 1234567890</p>
            <p className="text-sm">randombranch1@example.com</p>
          </div>

          {/* Random Branch 2 */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium">Random Branch 2</h4>
            <p className="text-sm">456 Example Avenue, Opposite Placeholder Park, Example City 654321</p>
            <p className="text-sm">+91 9876543210</p>
            <p className="text-sm">randombranch2@example.com</p>
          </div>
          <a
            href="https://www.google.com/maps/search/Nahdi+Mandi/@12.493782,76.0881552,8.04z?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D"
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
            <li>USA</li>
            <li>Canada</li>
            <li>Australia</li>
            <li>Germany</li>
            <li>Japan</li>
            <li>India</li>
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
        <p className="text-sm">&copy; 2024 Random Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
