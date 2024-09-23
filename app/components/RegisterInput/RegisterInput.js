"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image"
import Link from 'next/link';
import 'animate.css';
import "./RegisterInput.css";

const RegisterInput = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Validar longitud de la contraseña
    if (password.length < 5) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }
    // Poner mas validaciones 

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Guardar token en localStorage
        localStorage.setItem('token', data.token);
        alert('Registro exitoso');
        // Limpiar el formulario
        setUsername('');
        setEmail('');
        setPassword('');
        // Redirigir al usuario a la página de inicio de sesión
        router.push('/'); // Cambia '/login' después del registro
      } else {
        setError(data.message || 'Error de registro');
      }
    } catch (err) {
      setError('Error en el servidor');
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10">
          <div className="flex justify-center">
            <div className="animacion-a">
              <Image src="/images/A.png" alt="Logo" width={100} height={90} unoptimized={true} className=" animate__animated animate__fadeOutDown" />
            </div>
            <div className="animacion-todo">
              <Image src="/images/todo.png" alt="Logo" width={357} height={90} unoptimized={true} className="animate__animated animate__fadeOutUp" />
            </div>
            <div>
              <Image src="/images/color.png" alt="Logo" width={428} height={90} unoptimized={true} className="animate__animated animate__fadeOutDown" />
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm animacion-santi">
          <h2 className="text-white text-center font-bold">Registro de usuario</h2>
          {error && <p style={{ color: 'white', fontWeight: "700" }}>{error}</p>}
          <form onSubmit={handleRegister}>
            <div className="mt-5">
              <label htmlFor="username" className="block text-sm font-medium leading-6 text-white font-extrabold">Nombre de usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 shadow-sm sm:text-sm sm:leading-6 mt-1 input-login"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white font-extrabold">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 shadow-sm sm:text-sm sm:leading-6 mt-1 input-login"
              />
            </div>
            <div className="mt-5">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-white font-extrabold">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6 input-password"
              />
            </div>
            <button type="submit" className="flex w-full justify-center rounded-md color-btn-atc px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-5">
              Registrarse
            </button>
            <Link href="/" className="text-[#0154b8] font-bold hover:text-white flex justify-center">
              ¿Ya estas registrado? Volver inicio
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterInput;
