import { Input, Button } from "@material-tailwind/react";

const SearchBar = ({
  busqueda,
  handleInputChange,
  buscarSubProductos,
  borrarBusqueda,
  // tituloFormula,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Evita que un form se envíe si lo hubiera
      buscarSubProductos();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col m-2 items-center justify-center md:flex-row">
        <label>
          <Input
            className="bg-[#fff] px-4 py-3 w-[220px] text-[var(--primary-color)] focus:text-[var(--secondary-color)] font-bold rounded border-2 transition-colors duration-100 focus:border-[var(--secondary-color)] border-[var(--primary-color)] outline-[var(--secondary-color)]"
            type="text"
            value={busqueda}
            placeholder="Ingrese el código color"
            onChange={handleInputChange}
            onKeyDown={handleKeyDown} // ← acá escuchamos el Enter
          />
        </label>
        <div>
          <Button
            onClick={buscarSubProductos}
            className="m-2 px-auto h-[44px] w-[98px] ov-btn-grow-skew"
          >
            Buscar
          </Button>
          <Button
            onClick={borrarBusqueda}
            className="m-2 px-auto h-[44px] w-[98px] ov-btn-grow-skew-borrar"
          >
            Borrar
          </Button>
        </div>
      </div>
      {/* <h2>{tituloFormula}</h2> */}
    </div>
  );
};

export default SearchBar;
