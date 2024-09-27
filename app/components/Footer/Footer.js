import React from "react";
import "./Footer.css";

export default function Footer() {

  return (
    <footer
      className="flex w-full flex-col flex-wrap items-center justify-center border-t border-blue-gray-50 md:justify-between h-8 bg-white footer"
    >
      <p className="font-bold footer-text text-xl">A <span className="text-[#fc5273]">Todo</span> Color &copy; 2024</p>
    </footer>
  );
}
