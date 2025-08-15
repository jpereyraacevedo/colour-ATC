import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";

const SelectProductos = ({ 
  subProductos, 
  handleSubProductoSelect, 
  handleLitrosSelect, 
  hasSearched, 
  selectedSubProducto, 
  searchTerm, 
  setSearchTerm, 
  options,
  precioBases,
  setPrecioBases,
  onBaseSelect,
  articulos
}) => {
  const [filteredOptions, setFilteredOptions] = useState([]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredOptions([]);
    } else {
      // Filtrar opciones que coincidan con la búsqueda
      const filtered = options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOptions(filtered);
    }
  };

  const handleSelectOption = (option) => {
    setSearchTerm(option);
    setFilteredOptions([]);
    console.log("Opción seleccionada:", option);
  
    if (onBaseSelect) onBaseSelect(option);
  
    // Buscar el artículo correspondiente
    const articuloSeleccionado = articulos.find(
      (art) => art.NombreArticulo.toLowerCase() === option.toLowerCase()
    );
  
    if (articuloSeleccionado) {
      console.log("Precio encontrado:", articuloSeleccionado.CDO_CIVA);
      setPrecioBases(articuloSeleccionado.CDO_CIVA);
    } else {
      console.log("Artículo no encontrado para:", option);
      setPrecioBases(null);
    }
  };
  
  

  return (
    <div className="flex flex-col md:flex-row m-2 items-center justify-center">
      {hasSearched && subProductos.length > 0 && (
        <>
          <select
            onChange={(e) => handleSubProductoSelect(e.target.value)}
            className="border-b border-[var(--primary-color)] rounded input-design my-2 mx-2 h-[40px]"
          >
            <option value="">Seleccione un Producto</option>
            {subProductos.map((subProducto, index) => (
              <option key={index} value={subProducto}>
                {subProducto}
              </option>
            ))}
          </select>

          <select
            onChange={handleLitrosSelect}
            className="border-b border-[var(--primary-color)] rounded input-design my-2 mx-2 h-[40px]"
            disabled={!selectedSubProducto}
          >
            <option value="">Seleccione Cant. de Base</option>
            <option value="3">1 LITRO</option>
            <option value="4">4 LITROS</option>
            <option value="5">10 LITROS</option>
            <option value="6">20 LITROS</option>
          </select>

          {selectedSubProducto && (
            // Input para buscar bases temporalmente desactivado
            <div className="relative mx-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar base..."
                className="border-b border-[var(--primary-color)] rounded input-design my-2 h-[40px] p-2 hidden"
              />

              {/* Input para ingresar el valor de las bases  */}
              <div style={{ minWidth: "120px", display: "flex", alignItems: "center" }}>
                  <Input
                    type="number"
                    value={precioBases || ''} // mostrar el valor si existe
                    onChange={(e) => setPrecioBases(Number(e.target.value))}
                    placeholder="Precio Bases"
                    className="text-[var(--primary-color)] border border-[var(--primary-color)] rounded p-2 font-bold text-right outline-[var(--primary-color)] focus:outline-[var(--secondary-color)] focus:text-[var(--secondary-color)] focus:font-bold focus:border-[var(--secondary-color)]"
                  />
                  {/* <Button className="m-2 px-auto h-[40px] w-[75px] ov-btn-grow-skew w-fit"><ImCheckmark /></Button> */}
                </div>
              {filteredOptions.length > 0 && (
                <ul id="listaBases" className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto shadow-lg z-10">
                  {filteredOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectOption(option)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SelectProductos;
