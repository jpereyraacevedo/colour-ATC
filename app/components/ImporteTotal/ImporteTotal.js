import './ImporteTotal.css'

const ImporteTotal = ({ precioBases, totalImporte }) => (
  // <div className="flex justify-between p-5 border-t border-blue-gray-100 text-[#0154b8] font-bold">
  //   <div className="flex flex-col">
  //     <p>Importe base</p>
  //     <p>Importe colorante</p>
  //     <p className="border-y-2 py-1 border-[#fc5273]">Importe TOTAL</p>
  //   </div>
  //   <div className="flex">
  //     <div className="flex flex-col text-end mx-5">
  //       <p>{`$ ${precioBases.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
  //       <p>{`$ ${totalImporte.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
  //       <p className="border-y-2 py-1 border-[#fc5273]">{`$ ${(totalImporte + precioBases).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
  //     </div>
  //     <div className="flex flex-col text-end mx-5">
  //       <p>{`$ ${precioBases.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
  //       <p>{`$ ${totalImporte.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
  //       <p className="border-y-2 py-1 border-[#fc5273]">{`$ ${(totalImporte + precioBases).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
  //     </div>
  //   </div>
  // </div>
  <div className="parent px-2">
    <div className="div1"> <p className='text-right font-bold'>P. Lista </p></div>
    <div className="div2"> <p className='text-right font-bold'>P. Venta </p></div>
    <div className="div3"> <p>Importe base</p> </div>
    <div className="div4"> <p>Importe colorante</p> </div>
    <div className="div5"> <p className="border-y-2 py-1 border-[#fc5273] font-bold">Importe TOTAL</p></div>
    <div className="div6"> <p className='text-right'>{`$ ${precioBases.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
    <div className="div7"> <p className='text-right'>{`$ ${precioBases.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
    <div className="div8"> <p className='text-right'>{`$ ${totalImporte.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
    <div className="div9"> <p className='text-right'>{`$ ${totalImporte.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
    <div className="div10"> <p className="border-y-2 py-1 border-[#fc5273] text-right font-bold">{`$ ${(totalImporte + precioBases).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
    <div className="div11"> <p className="border-y-2 py-1 border-[#fc5273] text-right font-bold">{`$ ${(totalImporte + precioBases).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p></div>
    <div className="div12 border-y-2 py-1 border-[#fc5273]"></div>
  </div>
);


export default ImporteTotal