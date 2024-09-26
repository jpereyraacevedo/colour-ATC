"use client"
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
            <LoginInput />
          </div>
        </div>
      </div>
    </>
  )
}