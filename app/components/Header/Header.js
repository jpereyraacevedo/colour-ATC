
import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="shadow-[0_1px_4px_0px_#fc5273] bg-white px-5">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between lg:px-8 mx-5">
        <div className="flex lg:flex-1">
          <Link href="/">
            <Image src="/images/logo-white.png" alt="Logo" width={100} height={90} unoptimized={true} priority style={{ width: '100px', height: '90px' }} />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
            </PopoverPanel>
          </Popover>
          <a href="#" className="text-sm font-semibold leading-6 nav-links border-b-2 border-white hover:border-[#fc5273] duration-300">
            Tintometria para Automotor
          </a>
          <a href="#" className="text-sm font-semibold leading-6 nav-links border-b-2 border-white hover:border-[#fc5273] duration-300">
            Enviar los presupuestos
          </a>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="#" className="text-sm font-semibold leading-6 nav-links">
            Cerrar sesion <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <Link href="/">
                <Image src="/images/logo-white.png" alt="Logo" width={100} height={90} unoptimized={true} />
              </Link>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#0154b8] hover:bg-gray-50"
                >
                  Enviar los presupuestos
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-[#0154b8] hover:bg-gray-50"
                >
                  Realizar otro presupuesto
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-[#0154b8] hover:bg-gray-50"
                >
                  Cerrar sesión
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}