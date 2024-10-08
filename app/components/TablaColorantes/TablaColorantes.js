const TablaColorantes = ({ coloranteResultados, generarFilasVacias }) => (
  <Card className="w-full">
    <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full font-bold bg-[#0154b8] text-white">
      <div>Colorante</div>
      <div>Cantidad</div>
      <div>Precio</div>
      <div>Importe</div>
    </div>
    <div>
      {coloranteResultados.length > 0 ? (
        <>
          {coloranteResultados.map((resultado, index) => {
            const importe = resultado.cantidad && resultado.precio ? resultado.cantidad * resultado.precio : 0;
            return (
              <div key={index} className="grid grid-cols-4 gap-4 p-2 items-center zebra-row">
                <div style={{ minWidth: "120px" }}>
                  <Input
                    type="text"
                    value={resultado.colorante || ""}
                    readOnly
                    className="text-[#0154b8] border rounded p-2 font-bold"
                  />
                </div>
                <div style={{ minWidth: "100px" }}>
                  <Input
                    type="text"
                    value={resultado.cantidad || ""}
                    readOnly
                    className="text-[#0154b8] border rounded p-2 font-bold"
                  />
                </div>
                <div style={{ minWidth: "100px" }}>
                  <Typography variant="small" className="font-bold text-[#0154b8]">
                    {resultado.precio ? `$${resultado.precio.toLocaleString("es-ES", { minimumFractionDigits: 4 })}` : ""}
                  </Typography>
                </div>
                <div style={{ minWidth: "100px" }}>
                  <Typography variant="small" className="font-bold text-[#0154b8]">
                    {importe > 0 ? `$${importe.toLocaleString("es-ES", { minimumFractionDigits: 4 })}` : ""}
                  </Typography>
                </div>
              </div>
            );
          })}
          {generarFilasVacias(8 - coloranteResultados.length)} {/* Filas vacías adicionales */}
        </>
      ) : (
        generarFilasVacias(8) // Filas vacías cuando no hay resultados
      )}
    </div>
  </Card>
);
