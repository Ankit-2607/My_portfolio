import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left - Logo / Name */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold text-amber-500">AK</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed text-center md:text-left">
            Passionate Full Stack Developer creating interactive and modern web experiences.
          </p>
        </div>

        {/* Center - Navigation
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            {["Home", "About", "Projects", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-amber-500 transition-colors duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Right - Socials */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-lg font-semibold text-white mb-3">Connect with Me</h3>
          <div className="flex gap-5">
            <a
              href="https://github.com/Ankit-2607"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 text-2xl transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/ankit-kumar-80473a383"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 text-2xl transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 text-2xl transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-500 text-2xl transition-colors duration-300"
            >
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ankit Kumar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
