const ImporteTotal = ({ precioBases, totalImporte }) => (
  <div className="flex justify-between p-5 border-t border-blue-gray-100 text-[#0154b8] font-bold">
    <div className="flex flex-col">
      <p>Importe base</p>
      <p>Importe colorante</p>
      <p>Importe TOTAL</p>
    </div>
    <div className="flex flex-col text-end">
      <p>{`$ ${precioBases.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      <p>{`$ ${totalImporte.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      <p>{`$ ${(totalImporte + precioBases).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
    </div>
  </div>
);


export default ImporteTotal