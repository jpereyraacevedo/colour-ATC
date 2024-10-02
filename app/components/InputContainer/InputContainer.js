import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { ClassContext } from "../../Context";
import axios from "axios";
import "./InputContainer.css"; // Asegúrate de agregar los estilos nuevos aquí.

export default function InputContainer() {
    const { footerActive } = useContext(ClassContext);
    const [pinturas, setPinturas] = useState([]);
    const [tablaPinturas, setTablaPinturas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [subProductos, setSubProductos] = useState([]); // Para almacenar los subproductos coincidentes
    const [selectedSubProducto, setSelectedSubProducto] = useState(null); // SubProducto seleccionado para llenar campos
    const [selectedLitros, setSelectedLitros] = useState(null); // Litros seleccionados
    const [hasSearched, setHasSearched] = useState(false); // Estado para controlar si el usuario ha buscado

    const handleInputChange = (event) => {
        const value = event.target.value;
        setBusqueda(value);

        // Si el input de búsqueda está vacío, restablecemos el estado
        if (value === "") {
            setSubProductos([]);
            setSelectedSubProducto(null);
            setHasSearched(false);
        }
    };

    // Esta funcion se conecta al backend
    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/data"); // Asegúrate de que esta línea sea correcta
            setTablaPinturas(response.data);
        } catch (err) {
            console.error('Error al obtener los datos:', err);
            console.log(err);
        }
    };

    // Filtramos los valores de SubProducto al buscar
    const buscarSubProductos = () => {
        const resultadosBusqueda = tablaPinturas.filter((elemento) =>
            elemento.Codigo.toLowerCase() === busqueda.toLowerCase()
        );
        setSubProductos(resultadosBusqueda.map(item => item.SubProducto)); // Guardamos los subproductos coincidentes
        setHasSearched(true); // Marcar que se ha buscado
    };

    const handleSubProductoSelect = (subProducto) => {
        const selectedPintura = tablaPinturas.find(item => item.SubProducto === subProducto);
        setSelectedSubProducto(selectedPintura);
    };

    const handleLitrosSelect = (event) => {
        setSelectedLitros(event.target.value); // Establecer los litros seleccionados
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
            <div key={index} className="grid grid-cols-4 gap-4 p-2 items-center zebra-row">
                <div style={{ minWidth: "120px" }}>
                    <div className="desactivado" />
                </div>
                <div style={{ minWidth: "100px" }}>
                    <div className="desactivado" />
                </div>
                <div style={{ minWidth: "100px" }}>
                    <div className="desactivado" />
                </div>
                <div style={{ minWidth: "100px" }}>
                    <div className="desactivado" />
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
                        className="bg-[#fff] px-4 py-3 outline-none w-[220px] text-[#0154b8] font-bold rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#0154b8] border-[#0154b8]"
                        type="text"
                        value={busqueda}
                        placeholder="Ingrese el código color"
                        onChange={handleInputChange}
                    />
                </label>
                <Button onClick={buscarSubProductos} className="my-2 bg-[#0154b8] mx-2 h-[40px] prueba ov-btn-grow-skew">Buscar</Button>
            </div>
            <div className="flex flex-row m-2 items-center justify-center">
                {hasSearched && subProductos.length > 0 && (
                    <>
                        <select onChange={(e) => handleSubProductoSelect(e.target.value)} className="rounded input-design my-2 bg-[#efecec] mx-2 h-[40px]">
                            <option value="">Seleccione un Producto</option>
                            {subProductos.map((subProducto, index) => (
                                <option key={index} value={subProducto}>{subProducto}</option>
                            ))}
                        </select>
                        <select onChange={handleLitrosSelect} className="rounded input-design my-2 bg-[#efecec] mx-2 mx-2 h-[40px]">
                            <option value="">Seleccione Litros de Base</option>
                            <option value="3">1 LITRO</option>
                            <option value="4">4 LITROS</option>
                            <option value="5">10 LITROS</option>
                            <option value="6">20 LITROS</option>
                        </select>
                    </>
                )}
            </div>
            <hr />
            <Card className="w-full">
                {/* Encabezado fijo siempre visible */}
                <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full font-bold text-[#0154b8]">
                    <div>Colorante</div>
                    <div>Cantidad</div>
                    <div>Precio</div>
                    <div>Importe</div>
                </div>
                <hr />
                <div>
                    {selectedSubProducto ? (
                        <div className={`grid grid-cols-4 gap-4 p-2 items-center zebra-row`}>
                            <div style={{ minWidth: "120px" }}>
                                <Input
                                    type="text"
                                    value={selectedSubProducto.Col || ""}
                                    readOnly
                                    className="text-[#0154b8] border rounded p-1"
                                />
                            </div>
                            <div style={{ minWidth: "100px" }}>
                                {selectedSubProducto.Cant ? (
                                    <Input
                                        type="text"
                                        value={selectedSubProducto.Cant}
                                        readOnly
                                        className="text-[#0154b8] border rounded p-1"
                                    />
                                ) : (
                                    <div className="desactivado" />  // Div vacío para la cantidad
                                )}
                            </div>
                            <div style={{ minWidth: "100px" }}>
                                <Typography variant="small" className="font-bold text-[#0154b8]">
                                    {selectedSubProducto.CodigoBase3 ? `$${selectedSubProducto.CodigoBase3}` : ""}
                                </Typography>
                            </div>
                            <div style={{ minWidth: "100px" }}>
                                <Typography variant="small" className="font-bold text-[#0154b8]">
                                    {selectedSubProducto.CodigoBase3 ? `$${selectedSubProducto.CodigoBase3}` : ""}
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
