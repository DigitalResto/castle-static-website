import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#A50202] text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo and Company Info */}
        <div className="flex flex-col items-center md:items-start">
          <div className="mb-6">
            <img src="nahdi-mandi-logo.png" alt="Company Logo" className="h-36 rounded-full" />
          </div>
          <p className="text-sm  text-center md:text-left">
            © 2024 Nahdi Mandi. All rights reserved.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold ">Contact</h3>
          
          {/* Perinthalmanna Branch */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium">Perinthalmanna Branch</h4>
            <p className="text-sm ">2nd floor Tharayil tower, Near post office, Pattambi road, Perinthalmanna 679322</p>
            <p className="text-sm ">+91 8589864864</p>
            <p className="text-sm ">nahdimandhi@gmail.com</p>
          </div>

          {/* Bengaluru Branch */}
          <div className="space-y-2">
            <h4 className="text-lg font-medium">Bengaluru Branch</h4>
            <p className="text-sm ">2J7M+RQV, Nehru Rd, Heerti Layout, Kammanahalli, Bengaluru, Karnataka 560084</p>
            <p className="text-sm ">+91 95629 77775</p>
            <p className="text-sm ">+91 95268 77775</p>
          </div>
          <a
            href="https://www.google.com/maps"
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
          <ul className="list-disc pl-5 space-y-1 text-sm ">
            <li>Qatar</li>
            <li>Bahrain</li>
            <li>UAE</li>
            <li>Karnataka</li>
            <li>Kerala</li>
            <li>Tamil Nadu</li>
          </ul>

          <h3 className="text-2xl font-semibold text-gray-100">Stay Updated</h3>
          <p className="text-sm ">Subscribe to our newsletter for the latest news, updates, and insights.</p>
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
        <p className="text-sm ">&copy; 2024 Nahdi Mandi. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
