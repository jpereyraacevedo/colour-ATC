const SelectProductos = ({ subProductos, handleSubProductoSelect, handleLitrosSelect, hasSearched }) => (
  <div className="flex flex-col md:flex-row m-2 items-center justify-center">
    {hasSearched && subProductos.length > 0 && (
      <>
        <select
          onChange={(e) => handleSubProductoSelect(e.target.value)}
          className="border-b border-[#0154b8] rounded input-design my-2 mx-2 h-[40px]">
          <option value="">Seleccione un Producto</option>
          {subProductos.map((subProducto, index) => (
            <option key={index} value={subProducto}>{subProducto}</option>
          ))}
        </select>

        <select onChange={handleLitrosSelect} className="border-b border-[#0154b8] rounded input-design my-2 mx-2 h-[40px]">
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


export default SelectProductos