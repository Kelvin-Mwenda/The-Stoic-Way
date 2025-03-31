
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Twitter, Linkedin, BookOpen } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black w-full py-8 md:py-12 px-4 md:px-16 border-t border-gray-700">
      <div className="container mx-auto">
        {/* Logo & Description */}
        <div className="flex items-center space-x-2 mb-6 md:mb-8">
          <BookOpen className="w-6 h-6 text-white" />
          <span className="text-lg font-medium text-white">The Stoic Way</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="text-base font-medium text-white mb-3 md:mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/foundations" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Foundations
                </Link>
              </li>
              <li>
                <Link to="/practices" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Practices
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-base font-medium text-white mb-3 md:mb-4">About The Stoic Way</h3>
            <p className="text-sm text-gray-400 max-w-xs">
              Guiding you on the path to resilience, discipline, and inner peace through ancient Stoic wisdom. Our mission is to help you apply timeless philosophical principles to modern challenges.
            </p>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="text-base font-medium text-white mb-3 md:mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright and Attribution Row */}
        <div className="pt-6 md:pt-8 border-t border-gray-700 flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-2 md:mb-4">
            © {new Date().getFullYear()} The Stoic Way. All rights reserved.
          </p>
          <p className="text-sm text-gray-400">
            Made by Chocs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
