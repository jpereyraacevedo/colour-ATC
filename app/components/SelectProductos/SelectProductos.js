import { useState } from "react";

const SelectProductos = ({ subProductos, handleSubProductoSelect, handleLitrosSelect, hasSearched, selectedSubProducto }) => (
  <div className="flex flex-col md:flex-row m-2 items-center justify-center">
    {hasSearched && subProductos.length > 0 && (
      <>
        <select
          onChange={(e) => handleSubProductoSelect(e.target.value)}
          className="border-b border-[#0154b8] rounded input-design my-2 mx-2 h-[40px]"
        >
          <option value="">Seleccione un Producto</option>
          {subProductos.map((subProducto, index) => (
            <option key={index} value={subProducto}>
              {subProducto}
            </option>
          ))}
        </select>

        {/* Deshabilitar el select de litros si no hay un subproducto seleccionado */}
        <select
          onChange={handleLitrosSelect}
          className="border-b border-[#0154b8] rounded input-design my-2 mx-2 h-[40px]"
          disabled={!selectedSubProducto} // Deshabilitar si no se ha seleccionado un subproducto
        >
          <option value="">Seleccione Cant. de Base</option>
          <option value="3">1 LITRO</option>
          <option value="4">4 LITROS</option>
          <option value="5">10 LITROS</option>
          <option value="6">20 LITROS</option>
        </select>
      </>
    )}
  </div>
);

export default SelectProductos;