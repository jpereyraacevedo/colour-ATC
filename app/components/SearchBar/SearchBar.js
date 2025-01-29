import { Input, Button } from "@material-tailwind/react";

const SearchBar = ({ busqueda, handleInputChange, buscarSubProductos, borrarBusqueda }) => (
  <div className="flex flex-col m-2 items-center justify-center md:flex-row">
    <label>
      <Input
        className="bg-[#fff] px-4 py-3 outline-none w-[220px] text-[#0154b8] font-bold rounded border-2 transition-colors duration-100 border-solid focus:border-[#0154b8] border-[#0154b8]"
        type="text"
        value={busqueda}
        placeholder="Ingrese el código color"
        onChange={handleInputChange}
      />
    </label>
    <div>
      <Button onClick={buscarSubProductos} className="m-2 px-auto h-[44px] w-[98px] ov-btn-grow-skew">Buscar</Button>
      <Button onClick={borrarBusqueda} className="m-2 px-auto h-[44px] w-[98px] ov-btn-grow-skew-borrar">Borrar</Button>
    </div>
  </div>
);

export default SearchBar;