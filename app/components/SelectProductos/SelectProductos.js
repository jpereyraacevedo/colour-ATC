import { useState } from "react";

const SelectProductos = ({ 
  subProductos, 
  handleSubProductoSelect, 
  handleLitrosSelect, 
  hasSearched, 
  selectedSubProducto, 
  searchTerm, 
  setSearchTerm, 
  options,
  setPrecioBases
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
    setFilteredOptions([]); // Cerrar lista de sugerencias
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
            <div className="relative mx-2">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar base..."
                className="border-b border-[var(--primary-color)] rounded input-design my-2 h-[40px] p-2"
              />
              {filteredOptions.length > 0 && (
                <ul className="absolute bg-white border border-gray-300 w-full mt-1 max-h-40 overflow-y-auto shadow-lg z-10">
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
