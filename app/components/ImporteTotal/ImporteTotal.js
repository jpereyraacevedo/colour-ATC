import { useState, useEffect } from "react";
import "./ImporteTotal.css";

const ImporteTotal = ({ precioBases, totalImporte }) => {
  const [porcentajeBases, setPorcentajeBases] = useState(null);
  const [porcentajeColorantes, setPorcentajeColorantes] = useState(null);
  const [totalColorantesYBases, setTotalColorantesYBases] = useState()

  useEffect(() => {
    // Obtener valores del localStorage
    const userDataObtenida = JSON.parse(localStorage.getItem("userData"));

    if (userDataObtenida && userDataObtenida.configurations) {
      const storedPorcentajeBases = userDataObtenida.configurations.bases;
      const storedPorcentajeColorantes = userDataObtenida.configurations.colorantes;

      console.log(`StoredPorcentajeBases es ${storedPorcentajeBases}`);

      // Convertir a número y actualizar estado
      setPorcentajeBases(storedPorcentajeBases ? parseFloat(storedPorcentajeBases) : 0);
      setPorcentajeColorantes(storedPorcentajeColorantes ? parseFloat(storedPorcentajeColorantes) : 0);
    } else {
      console.warn("⚠️ No se encontraron datos en localStorage o están mal formateados.");
      setPorcentajeBases(0);
      setPorcentajeColorantes(0);
    }
  }, []);

  // Mostrar los valores cuando se actualizan
  useEffect(() => {
    if (porcentajeBases !== null && porcentajeColorantes !== null) {
      console.log("🔹 Porcentaje Bases:", porcentajeBases);
      console.log("🔹 Porcentaje Colorantes:", porcentajeColorantes);
    }
  }, [porcentajeBases, porcentajeColorantes]);

  // Asegurarse de que no calcule hasta que haya valores correctos
  if (porcentajeBases === null || porcentajeColorantes === null) {
    return <p className='font-bold text-[var(--primary-color)]'>Cargando...</p>;
  }

  // Asegurarse de que los valores sean números válidos
  const base = typeof precioBases === 'number' ? precioBases : 0;
  const color = typeof totalImporte === 'number' ? totalImporte : 0;

  // Calcular los valores ajustados
  const precioBasesAjustado = base * (1 + porcentajeBases / 100);
  const totalImporteAjustado = color * (1 + porcentajeColorantes / 100);
  const finalBasesColorantes = precioBasesAjustado + totalImporteAjustado;

  return (
    <div className="parent px-2">
      <div className="div1"> <p className="text-right font-bold">P. Lista </p></div>
      <div className="div2"> <p className="text-right font-bold">P. Venta </p></div>
      <div className="div3"> <p>Importe base</p> </div>
      <div className="div4"> <p>Importe colorante</p> </div>
      <div className="div5"> <p className="border-y-2 py-1 border-[var(--secondary-color)] font-bold">Importe TOTAL</p></div>

      {/* Precio Bases Original */}
      <div className="div6">
        <p className="text-right">{`$ ${base.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      </div>

      {/* Precio Bases Ajustado */}
      <div className="div7">
        <p className="text-right">{`$ ${precioBasesAjustado.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      </div>

      {/* Total Importe Original */}
      <div className="div8">
        <p className="text-right">{`$ ${color.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      </div>

      {/* Total Importe Ajustado */}
      <div className="div9">
        <p className="text-right">{`$ ${totalImporteAjustado.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      </div>

      {/* Total Final */}
      <div className="div10">
        <p className="border-y-2 py-1 border-[var(--secondary-color)] text-right font-bold">{`$ ${(color + base).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      </div>

      <div className="div11">
        <p className="border-y-2 py-1 border-[var(--secondary-color)] text-right font-bold">{`$ ${(finalBasesColorantes).toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</p>
      </div>

      <div className="div12 border-y-2 py-1 border-[var(--secondary-color)]"></div>
    </div>
  );
};

export default ImporteTotal;
