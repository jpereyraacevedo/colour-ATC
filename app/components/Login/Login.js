"use client"
import Link from "next/link";
import Image from "next/image"
import LoginInput from "../LoginInput/LoginInput"
import 'animate.css';
import "./Login.css"

export default function Login() {
  return (
    <>
      <div className="mt-10">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10">
            <div className="flex justify-center">
              <div className="animacion-a">
                <Image src="/images/A.png" alt="Logo" width={100} height={90} unoptimized={true} className=" animate__animated animate__fadeInDown" />
              </div>
              <div className="animacion-todo">
                <Image src="/images/todo.png" alt="Logo" width={357} height={90} unoptimized={true} className="animate__animated animate__fadeInUp" />
              </div>
              <div>
                <Image src="/images/color.png" alt="Logo" width={428} height={90} unoptimized={true} className="animate__animated animate__fadeInDown" />
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-white bold">
                  Nombre de usuario
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-white bold">
                    Contraseña
                  </label>
                  <div className="text-sm">
                    <Link href="/main" className="font-semibold color-atc">
                      Contacto con soporte
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md color-btn-atc px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Ingresar
                </button>
              </div>
            </form> */}
            <LoginInput />
          </div>
        </div>
      </div>
    </>
  )
}