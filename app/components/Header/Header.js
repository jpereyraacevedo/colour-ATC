
// import { useState, useContext } from 'react';
// import Image from "next/image";
// import Link from "next/link";
// import {
//   Dialog,
//   DialogPanel,
//   Popover,
//   PopoverGroup,
//   PopoverPanel,
// } from '@headlessui/react'
// import {
//   Bars3Icon,
//   XMarkIcon,
// } from '@heroicons/react/24/outline'

// import { ClassContext } from '../../Context';
// import { FaUserCircle } from "react-icons/fa";

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   const { username, setUsername } = useContext(ClassContext);

//   return (
//     <header className="shadow-[0_1px_4px_0px_#fc5273] bg-white px-5">
//       <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between lg:px-8 mx-5">
//         <div className="flex lg:flex-1">
// <Link href="/">
//   <Image src="/images/logo-white.png" alt="Logo" width={100} height={90} unoptimized={true} priority style={{ width: '100px', height: '90px' }} />
// </Link>
//         </div>
//         <div className="flex lg:hidden">
//           <button
//             type="button"
//             onClick={() => setMobileMenuOpen(true)}
//             className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
//           >
//             <span className="sr-only">Open main menu</span>
//             <Bars3Icon aria-hidden="true" className="h-6 w-6" />
//           </button>
//         </div>
//         <PopoverGroup className="hidden lg:flex lg:gap-x-12">
//           <Popover className="relative">
//             <PopoverPanel
//               transition
//               className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
//             >
//             </PopoverPanel>
//           </Popover>
//           <a href="#" className="text-sm font-semibold leading-6 nav-links border-b-2 border-white hover:border-[#fc5273] duration-300">
//             Tintometria para Automotor
//           </a>
//           <a href="#" className="text-sm font-semibold leading-6 nav-links border-b-2 border-white hover:border-[#fc5273] duration-300">
//             Enviar los presupuestos
//           </a>
//         </PopoverGroup>
//         <div className="hidden lg:flex lg:flex-1 lg:justify-end align-center text-sm font-semibold leading-6 nav-links cursor-pointer">
//           <a href="#" className="text-sm font-semibold leading-6 nav-links my-auto">
//             Hola {username} <span aria-hidden="true"></span>
//           </a>
//           <p className="flex my-auto mx-1 text-2xl"> 
//             <FaUserCircle />
//           </p>
//         </div>
//       </nav>
//       <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
//         <div className="fixed inset-0 z-10" />
//         <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
//           <div className="flex items-center justify-between">
//             <a href="#" className="-m-1.5 p-1.5">
//               <Link href="/">
//                 <Image src="/images/logo-white.png" alt="Logo" width={100} height={90} unoptimized={true} />
//               </Link>
//             </a>
//             <button
//               type="button"
//               onClick={() => setMobileMenuOpen(false)}
//               className="-m-2.5 rounded-md p-2.5 text-gray-700"
//             >
//               <XMarkIcon aria-hidden="true" className="h-6 w-6" />
//             </button>
//           </div>
//           <div className="mt-6 flow-root">
//             <div className="-my-6 divide-y divide-gray-500/10">
//               <div className="space-y-2 py-6">
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#0154b8] hover:bg-gray-50"
//                 >
//                   Enviar los presupuestos
//                 </a>
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#0154b8] hover:bg-gray-50"
//                 >
//                   Realizar otro presupuesto
//                 </a>
//               </div>
//               <div className="py-6">
//                 <a
//                   href="#"
//                   className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#0154b8] hover:bg-gray-50"
//                 >
//                   Cerrar sesión
//                 </a>
//               </div>
//             </div>
//           </div>
//         </DialogPanel>
//       </Dialog>
//     </header>
//   )
// }

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
              style={{ width: "100px", height: "90px" }}
            />
          </Link>
        </div>

        {/* Nav Links */}
        <nav
          className={`fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-90 flex flex-col justify-center items-center gap-6 text-xl transform ${isOpen ? "translate-x-0 z-[9999]" : "-translate-x-full"
            } transition-transform duration-300 md:static md:flex-row md:bg-transparent md:h-auto md:w-auto md:translate-x-0 md:z-auto`}
        >
          <a
            href="#home"
            className="font-semibold leading-6 nav-links border-b-2 border-white hover:border-[#fc5273] duration-300"
            onClick={closeMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="font-semibold leading-6 nav-links border-b-2 border-white hover:border-[#fc5273] duration-300"
            onClick={closeMenu}
          >
            About
          </a>
          <a
            href="#contact"
            className="font-semibold leading-6 nav-links border-b-2 border-white hover:border-[#fc5273] duration-300"
            onClick={closeMenu}
          >
            Contact
          </a>
        </nav>

        {/* User Icon */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={toggleUserMenu}
          >
            <FaUser className="text-xl" />
            <span>Hola <span className="font-bold">{userData?.username}</span></span>
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
        <button
          className={`text-2xl md:hidden focus:outline-none ${isOpen ? "z-[10000]" : "z-auto"
            }`}
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <div className="w-[100px] flex justify-end"><FaBars /></div> }
        </button>
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
