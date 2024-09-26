import React, { useContext } from "react";
import { ClassContext } from "../../Context";
import "./Footer.css";

export default function Footer() {
  const { isActive } = useContext(ClassContext);  // Obtén el estado del contexto

  return (
    <footer
      className={`flex w-full flex-col flex-wrap items-center justify-center border-t border-blue-gray-50 md:justify-between h-8 bg-white ${isActive ? "footer" : ""
        }`}
    >
      <p className="font-normal footer-text">&copy; 2024 A Todo Color</p>
    </footer>
  );
}
