"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import "./LoginInput.css"
import Link from 'next/link';

const LoginInput = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Enviar username
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/main');
      } else {
        setError(data.message || 'Error de autenticación');
      }
    } catch (err) {
      setError('Error en el servidor');
    }
  };

  return (
    <div className="mt-10">
      {error && <p style={{ color: 'white', fontWeight: "700" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mt-5">
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-white font-extrabold">Usuario</label>
          <input
            type="text"
            value={username} // Usar username aquí
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block w-full rounded-md border-0 p-1.5 shadow-sm sm:text-sm sm:leading-6 mt-1 input-login"
          />
        </div>
        <div className="mt-1">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white font-extrabold">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 mt-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6 input-password"
          />
        </div>
        <button type="submit" className="flex w-full justify-center rounded-md color-btn-atc px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 my-5">
          Iniciar sesión
        </button>
        <Link href="/register" className="text-[#0154b8] flex justify-center font-bold hover:text-white">
          ¿No tienes usuario? Regístrate
        </Link>
      </form>
    </div>
  );
};

export default LoginInput;