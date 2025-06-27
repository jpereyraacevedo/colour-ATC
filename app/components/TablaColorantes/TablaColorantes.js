import { Card, Typography, Input} from "@material-tailwind/react";

const TablaColorantes = ({ coloranteResultados, generarFilasVacias, actualizarCantidadColorante }) => (
  <Card className="w-full">
    <h2 className="text-center my-2">{ }</h2>
    <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full font-bold bg-[var(--primary-color)] text-white text-center">
      <div>Colorante</div>
      <div>Cantidad</div>
      <div>Precio</div>
      <div>Importe</div>
    </div>
    <div>
      {coloranteResultados.length > 0 ? (
        <>
          {coloranteResultados.map((resultado, index) => {
            const importe = resultado.cantidad && resultado.precio ? resultado.cantidad * resultado.precio : 0; // Calcular importe
            return (
              <div key={index} className="grid grid-cols-4 gap-4 p-2 items-center zebra-row">
                <div style={{ minWidth: "120px" }}>
                  <Input
                    type="text"
                    value={resultado.colorante || ""}
                    readOnly
                    className="text-[var(--primary-color)] border rounded p-2 font-bold text-center"
                  />
                </div>
                <div style={{ minWidth: "100px" }}>
                  <Input
                    type="number"
                    onChange={(e) => actualizarCantidadColorante(index, e.target.value)}
                    value={resultado.cantidad ? resultado.cantidad.toFixed(2) : ""} // Formatear cantidad a 2 decimales
                    className="text-[var(--primary-color)] focus:text-[var(--secondary-color)] outline-[var(--secondary-color)] border rounded p-2 font-bold text-end"
                  />
                </div>
                <div style={{ minWidth: "100px" }}>
                  <Typography variant="small" className="font-bold text-[var(--primary-color)] text-end">
                    {resultado.precio ? `${resultado.precio.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                  </Typography>
                </div>
                <div style={{ minWidth: "100px" }}>
                  <Typography variant="small" className="font-bold text-[var(--primary-color)] text-end mr-[20px]">
                    {importe > 0 ? `${importe.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : ""}
                  </Typography>
                </div>
              </div>
            );
          })}
          {generarFilasVacias(8 - coloranteResultados.length)} {/* Generar las filas vacías necesarias */}
        </>
      ) : (
        generarFilasVacias(8) // Generar 8 filas vacías cuando no hay resultados
      )}
    </div>
  </Card>
);


export default TablaColorantes