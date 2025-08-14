import { useState, useRef } from "react";
import { Card, Typography, Input } from "@material-tailwind/react";

const TablaColorantes = ({
  coloranteResultados,
  generarFilasVacias,
  actualizarCantidadColorante,
  setColoranteResultados,           // <-- necesario para agregar filas
  listaPigmentos = [],              // <-- llega desde el padre
}) => {
  const inputColoranteRef = useRef(null);
  const inputCantidadRef = useRef(null);

  // Fila editable
  const [nuevoColorante, setNuevoColorante] = useState({
    colorante: "",
    cantidad: "",
    precio: null,
  });

  // Agregar fila a la lista del padre
  const agregarNuevoColorante = () => {
    const colorante = (nuevoColorante.colorante || "").trim();
    const cantidad = parseFloat(nuevoColorante.cantidad);

    if (!colorante || isNaN(cantidad) || cantidad <= 0) return;

    // Tomar precio desde la lista por "Letra"
    const encontrado = listaPigmentos.find(
      (p) => (p.Letra || "").toUpperCase() === colorante.toUpperCase()
    );
    const precio = encontrado ? Number(encontrado.PrecioPulzo) : nuevoColorante.precio || null;

    // Agregar al estado del padre
    if (typeof setColoranteResultados === "function") {
      setColoranteResultados((prev) => [
        ...prev,
        { colorante, cantidad, precio },
      ]);
    } else {
      console.error("setColoranteResultados no es una función. Pasalo como prop desde el padre.");
    }

    // Limpiar y volver a enfocar para el próximo ingreso
    setNuevoColorante({ colorante: "", cantidad: "", precio: null });
    requestAnimationFrame(() => {
      inputColoranteRef.current?.focus();
    });
  };

  // Navegación/confirmación con teclado
  const handleKeyDown = (e, campo) => {
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      if (campo === "colorante") {
        // si completó colorante, pasamos a cantidad
        inputCantidadRef.current?.focus();
      } else {
        // en cantidad, confirmamos y agregamos
        agregarNuevoColorante();
      }
    }
  };

  // Cuando cambia el texto del colorante, seteamos precio si existe la letra
  const handleColoranteChange = (valor) => {
    setNuevoColorante((prev) => ({ ...prev, colorante: valor }));
    const pigmento = listaPigmentos.find(
      (p) => (p.Letra || "").toUpperCase() === valor.toUpperCase()
    );
    setNuevoColorante((prev) => ({
      ...prev,
      precio: pigmento ? Number(pigmento.PrecioPulzo) : null,
    }));
  };

  return (
    <Card className="w-full">
      {/* Encabezado */}
      <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full font-bold bg-[var(--primary-color)] text-white text-center">
        <div>Colorante</div>
        <div>Cantidad</div>
        <div>Precio</div>
        <div>Importe</div>
      </div>

      <div>
        {/* Filas existentes */}
        {coloranteResultados.map((resultado, index) => {
          const importe =
            resultado.cantidad && resultado.precio
              ? resultado.cantidad * resultado.precio
              : 0;

          return (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 p-2 items-center zebra-row"
            >
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
                  onChange={(e) =>
                    actualizarCantidadColorante(index, e.target.value)
                  }
                  value={
                    typeof resultado.cantidad === "number"
                      ? resultado.cantidad.toFixed(2)
                      : resultado.cantidad || ""
                  }
                  className="text-[var(--primary-color)] border rounded p-2 font-bold text-end"
                />
              </div>

              <div style={{ minWidth: "100px" }}>
                <Typography
                  variant="small"
                  className="font-bold text-[var(--primary-color)] text-end"
                >
                  {resultado.precio != null && !isNaN(resultado.precio)
                    ? Number(resultado.precio).toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : ""}
                </Typography>
              </div>

              <div style={{ minWidth: "100px" }}>
                <Typography
                  variant="small"
                  className="font-bold text-[var(--primary-color)] text-end mr-[20px]"
                >
                  {importe > 0
                    ? importe.toLocaleString("es-ES", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                    : ""}
                </Typography>
              </div>
            </div>
          );
        })}

        {/* Fila editable SIEMPRE visible */}
        <div className="grid grid-cols-4 gap-4 p-2 items-center zebra-row">
          <div style={{ minWidth: "120px" }}>
            <Input
              inputRef={inputColoranteRef} // Material Tailwind: usar inputRef para el <input> real
              list="opciones-colorantes"
              type="text"
              placeholder="Agregar colorante (Letra)"
              value={nuevoColorante.colorante}
              onChange={(e) => handleColoranteChange(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "colorante")}
              className="text-[var(--primary-color)] border rounded p-2 font-bold text-center"
            />
            <datalist id="opciones-colorantes">
              {listaPigmentos.map((p, i) => (
                <option key={i} value={p.Letra} />
              ))}
            </datalist>
          </div>

          <div style={{ minWidth: "100px" }}>
            <Input
              inputRef={inputCantidadRef}
              type="number"
              step="0.01"
              placeholder="Cantidad"
              value={nuevoColorante.cantidad}
              onChange={(e) =>
                setNuevoColorante((prev) => ({
                  ...prev,
                  cantidad: e.target.value,
                }))
              }
              onKeyDown={(e) => handleKeyDown(e, "cantidad")}
              className="text-[var(--primary-color)] border rounded p-2 font-bold text-end"
            />
          </div>

          <div style={{ minWidth: "100px" }}>
            <Typography
              variant="small"
              className="font-bold text-[var(--primary-color)] text-end"
            >
              {nuevoColorante.precio != null && !isNaN(nuevoColorante.precio)
                ? Number(nuevoColorante.precio).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : ""}
            </Typography>
          </div>

          <div style={{ minWidth: "100px" }}>
            <Typography
              variant="small"
              className="font-bold text-[var(--primary-color)] text-end mr-[20px]"
            >
              {nuevoColorante.precio && nuevoColorante.cantidad
                ? (
                    Number(nuevoColorante.precio) *
                    Number(nuevoColorante.cantidad)
                  ).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : ""}
            </Typography>
          </div>
        </div>

        {/* Completar hasta 8 filas */}
        {generarFilasVacias(
          Math.max(8 - (coloranteResultados.length + 1), 0)
        )}
      </div>
    </Card>
  );
};

export default TablaColorantes;
