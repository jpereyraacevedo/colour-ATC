import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Input } from "@material-tailwind/react";
import { ClassContext } from "../../Context";
import axios from "axios";
import "./InputContainer.css"; // Asegúrate de agregar los estilos nuevos aquí.

export default function InputContainer({ title }) {
    const { footerActive } = useContext(ClassContext);
    const [pinturas, setPinturas] = useState([]);
    const [tablaPinturas, setTablaPinturas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [hasSearched, setHasSearched] = useState(false); // Estado para controlar si el usuario ha buscado

    const handleInputChange = (event) => {
        const value = event.target.value;
        setBusqueda(value);
        setHasSearched(true); // Marcar como que el usuario ha buscado
    };

    // Esta funcion se conecta al backend
    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/routes/data");
            setTablaPinturas(response.data); // Guardamos los datos originales
        } catch (err) {
            console.log(err);
        }
    };

    // Filtramos los datos de la búsqueda
    useEffect(() => {
        if (busqueda.trim() === "") {
            // Si no hay búsqueda, restablecemos las filas vacías
            setPinturas([]);
            setHasSearched(false); // Restablecer el estado de búsqueda
        } else {
            // Filtramos los datos según la búsqueda
            const resultadosBusqueda = tablaPinturas.filter((elemento) =>
                elemento.Col.toLowerCase().includes(busqueda.toLowerCase())
            );
            setPinturas(resultadosBusqueda);
        }
    }, [busqueda, tablaPinturas]);

    const handleEditableChange = (id, field, value) => {
        const updatedPinturas = pinturas.map(pintura =>
            pintura.Id === id ? { ...pintura, [field]: value } : pintura
        );
        setPinturas(updatedPinturas);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        footerActive(pinturas.length === 0);
    }, [pinturas]);

    // Asegurarse de que siempre haya al menos 8 filas
    const minRows = 8;
    const emptyRows = minRows - pinturas.length > 0 ? new Array(minRows - pinturas.length).fill({}) : [];

    return (
        <div className="mb-10 ancho-minimo">
            <h2 className="my-2 text-3xl text-center text-[#0154b8] font-bold">{title}</h2>
            <div className="flex flex-col m-2 items-center justify-center">
                <label>
                    <Input
                        className="rounded input-design my-2 bg-[#efecec]"
                        type="text"
                        value={busqueda}
                        placeholder="Ingrese el código color"
                        onChange={handleInputChange}
                    />
                </label>
                <h2 className="my-2 text-xl text-center text-[#0154b8] font-bold">{busqueda}</h2>
            </div>
            <hr />
            <Card className="w-full">
                {/* Encabezado fijo siempre visible */}
                <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full">
                    <div className="font-bold text-[#0154b8]">Col</div>
                    <div className="font-bold text-[#0154b8]">Cantidad</div>
                    <div className="font-bold text-[#0154b8]">Precio</div>
                    <div className="font-bold text-[#0154b8]">Importe</div>
                </div>
                <hr />
                <div>
                    {hasSearched && pinturas.length === 0 ? (
                        <div className="p-2 text-center text-gray-500">No se encontraron resultados</div>
                    ) : (
                        [...pinturas, ...emptyRows].map((pintura, index) => (
                            <div
                                className={`grid grid-cols-4 gap-4 p-2 items-center zebra-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}`}
                                key={pintura.Id || `empty-${index}`} // Asegurarse de que las claves sean únicas
                                style={{ minHeight: "45px" }} // Ajusta esta altura según necesites
                            >
                                <div style={{ minWidth: "120px" }}> {/* Fija el ancho de esta columna */}
                                    {pintura.Id ? (
                                        <Input
                                            type="text"
                                            value={pintura.Col || ""}
                                            onChange={(e) => handleEditableChange(pintura.Id, "Col", e.target.value)}
                                            className={`text-[#0154b8] border rounded p-1 ${index % 2 !== 0 ? 'input-gray' : ''}`}
                                        />
                                    ) : (
                                        <div style={{ minHeight: "35px", minWidth: "120px" }}></div>  // Placeholder con el mismo ancho
                                    )}
                                </div>
                                <div style={{ minWidth: "100px" }}> {/* Fija el ancho de esta columna */}
                                    {pintura.Id ? (
                                        <Input
                                            type="text"
                                            value={pintura.Cant || ""}
                                            onChange={(e) => handleEditableChange(pintura.Id, "Cant", e.target.value)}
                                            className={`text-[#0154b8] border rounded p-1 ${index % 2 !== 0 ? 'input-gray' : ''}`}
                                        />
                                    ) : (
                                        <div style={{ minHeight: "35px", minWidth: "100px" }}></div>  // Placeholder con el mismo ancho
                                    )}
                                </div>
                                <div style={{ minWidth: "100px" }}> {/* Fija el ancho de esta columna */}
                                    <Typography variant="small" className="font-bold text-[#0154b8]">
                                        {pintura.Precio ? `$${pintura.Precio}` : ""}
                                    </Typography>
                                </div>
                                <div style={{ minWidth: "100px" }}> {/* Fija el ancho de esta columna */}
                                    <Typography variant="small" className="font-bold text-[#0154b8]">
                                        {pintura.Importe ? `$${pintura.Importe}` : ""}
                                    </Typography>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </Card>
            <div className="flex justify-between p-5 border-t border-blue-gray-100 text-[#0154b8]">
                <div className="flex flex-col">
                    <p className="font-bold">Importe colorante</p>
                    <p className="font-bold">Importe base</p>
                    <p className="font-bold">Importe TOTAL</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold">$</p>
                    <p className="font-bold">$</p>
                    <p className="font-bold">$</p>
                </div>
            </div>
        </div>
    );
}
