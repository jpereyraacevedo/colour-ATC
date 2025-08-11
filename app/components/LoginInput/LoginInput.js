"use client";
import React, { useState, useContext, useEffect } from 'react';
import { ClassContext } from '../../Context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./LoginInput.css"

const LoginInput = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const { userData, setUserData, isLoading } = useContext(ClassContext);


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.0.240:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user)); // Guarda los datos del usuario
        console.log(data.user)

        setUserData(data.user); // Guarda en el estado global del contexto
        router.push('/main');
      } else {
        setError(data.message || 'Error de autenticación');
      }
    } catch (err) {
      setError('Error en el servidor');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isLoading) {
      if (token && userData?.id) {
        router.push("/main"); // Solo redirige si hay token y datos de usuario
      }
    }
  }, [isLoading, userData]);

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
            className="block w-full rounded-md border-0 p-1.5 shadow-sm sm:text-sm sm:leading-6 mt-1 input-login focus:text-[var(--primary-color)] focus:border-[var(--primary-color)] border-[var(--primary-color)] outline-[var(--primary-color)]"
          />
        </div>
        <div className="mt-1">
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white font-extrabold focus:text-[var(--secondary-color)]">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 mt-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-900 sm:text-sm sm:leading-6 input-password text-[var(--primary-color)] focus:border-[var(--primary-color)] border-[var(--primary-color)] outline-[var(--primary-color)]"
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