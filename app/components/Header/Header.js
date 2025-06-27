import React, { useState, useContext } from "react";
import { ClassContext } from '../../Context';
import ConfigurationModal from "../ConfigurationModal/ConfigurationModal";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para el menú hamburguesa
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // Estado para el popup de usuario
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  const { userData, setUserData } = useContext(ClassContext);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
    closeUserMenu(); // Cerrar el menú de usuario al abrir el modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUserData(null);
    router.push("/");
  };

  return (
    <header className="bg-white text-[var(--primary-color)] shadow-[0_1px_4px_0px_#fc5273] relative px-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
            <Image
              src="/images/logo-white.png"
              alt="Logo"
              width={100}
              height={90}
              unoptimized={true}
              priority
              style={{ width: "100px", height: "100px" }}
            />
          </Link>
        </div>

        {/* Nav Links */}
        

        {/* User Icon */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleUserMenu}
          >
            <FaUser className="text-xl" />
            <span>Hola <span className="font-bold text-[var(--primary-color)]">{userData?.username}</span></span>
          </div>

          {/* User Menu Popup */}
          {isUserMenuOpen && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4 z-[10000]"
              onClick={closeUserMenu}
            >
              <ul>
                <li
                  className="py-2 px-4 hover:bg-gray-100 hover:font-bold rounded-lg cursor-pointer"
                  onClick={openModal} // Abrir modal al hacer clic
                >
                  Configuración
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 hover:font-bold rounded-lg cursor-pointer" onClick={handleLogout}>
                  Cerrar Sesión
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
        {/* <button
          className={`text-2xl md:hidden focus:outline-none ${isOpen ? "z-[10000]" : "z-auto"
            }`}
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <div className="w-[100px] flex justify-end"><FaBars /></div> }
        </button> */}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10001]">
          <ConfigurationModal onClose={closeModal} />
        </div>
      )}
    </header>
  );
};

export default Header;
