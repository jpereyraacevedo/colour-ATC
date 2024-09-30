import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { ClassContext } from "../../Context";
import axios from "axios";
import "./InputContainer.css"; // Asegúrate de agregar los estilos nuevos aquí.

export default function InputContainer() {
    const { footerActive } = useContext(ClassContext);
    const [pinturas, setPinturas] = useState([]);
    const [tablaPinturas, setTablaPinturas] = useState([]); // Datos originales de la base de datos
    const [busqueda, setBusqueda] = useState("");
    const [bases, setBases] = useState([]); // Para almacenar las bases coincidentes
    const [selectedBase, setSelectedBase] = useState(null); // Base seleccionada para llenar campos
    const [hasSearched, setHasSearched] = useState(false); // Estado para controlar si el usuario ha buscado

    const handleInputChange = (event) => {
        const value = event.target.value;
        setBusqueda(value);

        // Si se borra la búsqueda, restablecer el estado
        if (value === "") {
            setBases([]);
            setSelectedBase(null);
            setHasSearched(false); // No se ha buscado aún
        }
    };

    // Esta funcion se conecta al backend
    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/routes/data");
            setTablaPinturas(response.data); // Guardamos los datos originales
            console.log("Datos recibidos desde SQL:", response.data);
        } catch (err) {
            console.log(err);
        }
    };

    // Filtramos los valores de Base al buscar
    const buscarBases = () => {
        const resultadosBusqueda = tablaPinturas.filter((elemento) =>
            elemento.Codigo.toLowerCase() === busqueda.toLowerCase()
        );
        setBases(resultadosBusqueda.map(item => item.Base)); // Guardamos las bases coincidentes
        setHasSearched(true); // Marcar que se ha buscado
    };

    const handleBaseSelect = (base) => {
        const selectedPintura = tablaPinturas.find(item => item.Base === base);
        setSelectedBase(selectedPintura);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        footerActive(pinturas.length === 0);
    }, [pinturas]);

    // Generar filas vacías para la tabla
    const generarFilasVacias = (num) => {
        return Array.from({ length: num }, (_, index) => (
            <div key={index} className={`grid grid-cols-4 gap-4 p-2 items-center zebra-row`}>
                <div style={{ minWidth: "120px" }}>
                    <div className="text-[#0154b8] border rounded p-1" style={{ height: "30px" }} />
                </div>
                <div style={{ minWidth: "100px" }}>
                    <div className="text-[#0154b8] border rounded p-1" style={{ height: "30px" }} />
                </div>
                <div style={{ minWidth: "100px" }}>
                    <Typography variant="small" className="font-bold text-[#0154b8]">
                        {""}
                    </Typography>
                </div>
                <div style={{ minWidth: "100px" }}>
                    <Typography variant="small" className="font-bold text-[#0154b8]">
                        {""}
                    </Typography>
                </div>
            </div>
        ));
    };

    return (
        <div className="mb-10 ancho-minimo">
            <h2 className="my-2 mt-10 text-3xl text-center text-[#0154b8] font-bold">OBRA</h2>
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
                <Button onClick={buscarBases} className="my-2 bg-[#0154b8]">Buscar</Button>
            </div>
            <div className="flex flex-col m-2 items-center justify-center">
                {hasSearched && bases.length > 0 && (
                    <select onChange={(e) => handleBaseSelect(e.target.value)} className="rounded input-design my-2 bg-[#efecec]">
                        <option value="">Seleccione una base</option>
                        {bases.map((base, index) => (
                            <option key={index} value={base}>{base}</option>
                        ))}
                    </select>
                )}
            </div>
            <hr />
            <Card className="w-full">
                {/* Encabezado fijo siempre visible */}
                <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full">
                    <div className="font-bold text-[#0154b8]">Colorante</div>
                    <div className="font-bold text-[#0154b8]">Cantidad</div>
                    <div className="font-bold text-[#0154b8]">Precio</div>
                    <div className="font-bold text-[#0154b8]">Importe</div>
                </div>
                <hr />
                <div>
                    {/* Mostrar datos seleccionados o filas vacías */}
                    {selectedBase ? (
                        <div className={`grid grid-cols-4 gap-4 p-2 items-center zebra-row`}>
                            <div style={{ minWidth: "120px" }}>
                                <div className="text-[#0154b8] border rounded p-1" style={{ height: "30px" }}>
                                    {selectedBase.Col || ""}
                                </div>
                            </div>
                            <div style={{ minWidth: "100px" }}>
                                <div className="text-[#0154b8] border rounded p-1" style={{ height: "30px" }}>
                                    {selectedBase.Cant || ""}
                                </div>
                            </div>
                            <div style={{ minWidth: "100px" }}>
                                <Typography variant="small" className="font-bold text-[#0154b8]">
                                    {selectedBase.CodigoBase3 ? `$${selectedBase.CodigoBase3}` : ""}
                                </Typography>
                            </div>
                            <div style={{ minWidth: "100px" }}>
                                <Typography variant="small" className="font-bold text-[#0154b8]">
                                    {selectedBase.CodigoBase3 ? `$${selectedBase.CodigoBase3}` : ""}
                                </Typography>
                            </div>
                        </div>
                    ) : (
                        generarFilasVacias(8) // Generar 8 filas vacías
                    )}
                </div>
            </Card>
            <div className="flex justify-between p-5 border-t border-blue-gray-100 text-[#0154b8] font-bold">
                <div className="flex flex-col">
                    <p>Importe base</p>
                    <p>Importe colorante</p>
                    <p>Importe TOTAL</p>
                </div>
                <div className="flex flex-col">
                    <p>$</p>
                    <p>$</p>
                    <p>$</p>
                </div>
            </div>
        </div>
    );
}
