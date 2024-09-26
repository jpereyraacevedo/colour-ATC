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

    const handleInputChange = (event) => {
        setBusqueda(event.target.value);
        filterData(event.target.value);
    };

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/routes/data");
            setPinturas(response.data);
            setTablaPinturas(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const filterData = (terminoBusqueda) => {
        const resultadosBusqueda = tablaPinturas.filter((elemento) =>
            elemento.Col.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
        setPinturas(resultadosBusqueda);
    };

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
        footerActive(tablaPinturas.length === 0);
    }, [tablaPinturas]);

    // Asegurarse de que siempre haya al menos 6 filas
    const minRows = 6;
    const emptyRows = minRows - pinturas.length > 0 ? new Array(minRows - pinturas.length).fill({}) : [];

    return (
        <div className="mb-10">
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
                <div className="grid grid-cols-4 gap-4 text-left p-2">
                    <div className="font-bold text-[#0154b8]">Col</div>
                    <div className="font-bold text-[#0154b8]">Cantidad</div>
                    <div className="font-bold text-[#0154b8]">Precio</div>
                    <div className="font-bold text-[#0154b8]">Importe</div>
                </div>
                <hr />
                <div>
                    {[...pinturas, ...emptyRows].map((pintura, index) => (
                        <div
                            className={`grid grid-cols-4 gap-4 p-2 items-center zebra-row ${index % 2 === 0 ? 'bg-white' : 'bg-gray-200'}`}
                            key={pintura.Id || index} // Usar el índice para filas vacías
                            style={{ minHeight: "45px" }} // Ajusta esta altura según necesites
                        >
                            <div>
                                {pintura.Id ? (
                                    <Input
                                        type="text"
                                        value={pintura.Col || ""}
                                        onChange={(e) => handleEditableChange(pintura.Id, "Col", e.target.value)}
                                        className={`border rounded p-1 ${index % 2 !== 0 ? 'input-gray' : ''}`}
                                    />
                                ) : (
                                    <div style={{ minHeight: "35px" }}></div>  // Placeholder para mantener la altura
                                )}
                            </div>
                            <div>
                                {pintura.Id ? (
                                    <Input
                                        type="text"
                                        value={pintura.Cant || ""}
                                        onChange={(e) => handleEditableChange(pintura.Id, "Cant", e.target.value)}
                                        className={`border rounded p-1 ${index % 2 !== 0 ? 'input-gray' : ''}`}
                                    />
                                ) : (
                                    <div style={{ minHeight: "35px" }}></div>  // Placeholder para mantener la altura
                                )}
                            </div>
                            <div>
                                <Typography variant="small" color="blue-gray" className="font-bold">
                                    {pintura.Precio ? `$${pintura.Precio}` : ""}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="small" color="blue-gray" className="font-bold">
                                    {pintura.Importe ? `$${pintura.Importe}` : ""}
                                </Typography>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            <div className="flex justify-between p-5 border-t border-blue-gray-100">
                {/* Agregar cualquier otro contenido aquí */}
            </div>
        </div>
    );
}
