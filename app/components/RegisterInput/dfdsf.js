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
      </form>
    </div>
  </div>
</div>