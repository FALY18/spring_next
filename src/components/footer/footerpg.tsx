"use client";

import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin, ChevronUp } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Bouton Contact centré et animé */}
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 
                   bg-white/20 text-white px-6 py-3 rounded-full shadow-lg 
                   backdrop-blur-md hover:scale-110 transition-all duration-300"
      >
        Contact
      </button>

      {/* Bouton pour remonter en haut */}
      {showScrollButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-6 bg-gray-800 text-white p-3 rounded-full shadow-lg 
                     hover:bg-gray-700 hover:scale-110 transition-transform duration-300"
        >
          <ChevronUp size={24} />
        </button>
      )}

      {/* Footer animé avec fond transparent */}
      <footer
         className={`fixed bottom-0 left-0 w-full backdrop-blur-xl bg-black/30 text-white p-6 shadow-lg 
                    transition-all duration-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"}`}
      >
        <div id="contact" className="container mx-auto flex flex-col items-center space-y-4">
          <h3 className="text-xl font-semibold">Restons Connectés</h3>

          {/* Réseaux sociaux avec icônes en blanc */}
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500 transition">
              <Facebook size={28} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition">
              <Twitter size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition">
              <Instagram size={28} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-600 transition">
              <Linkedin size={28} />
            </a>
          </div>

          {/* Logo */}
          <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-full" />

          {/* Bouton de fermeture */}
          <button
            onClick={() => setIsVisible(false)}
            className="bg-red-600 text-white px-4 py-2 rounded-md 
                       hover:bg-red-700 hover:scale-105 transition-transform duration-300"
          >
            Fermer
          </button>
        </div>
      </footer>
    </>
  );
}
