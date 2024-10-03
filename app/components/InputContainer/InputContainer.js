import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Input, Button } from "@material-tailwind/react";
import { ClassContext } from "../../Context";
import axios from "axios";
import "./InputContainer.css";

export default function InputContainer() {
    const { footerActive } = useContext(ClassContext);
    const [tablaPinturas, setTablaPinturas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [subProductos, setSubProductos] = useState([]);
    const [selectedSubProducto, setSelectedSubProducto] = useState(null);
    const [selectedLitros, setSelectedLitros] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [coloranteResultados, setColoranteResultados] = useState([]);
    const [subProductosObjetos, setSubProductosObjetos] = useState([]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setBusqueda(value);

        if (value === "") {
            setSubProductos([]);
            setSelectedSubProducto(null);
            setColoranteResultados([]);
            setHasSearched(false);
        }
    };

    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/data");
            setTablaPinturas(response.data);
        } catch (err) {
            console.error('Error al obtener los datos:', err);
        }
    };

    const buscarSubProductos = () => {
        const resultadosBusqueda = tablaPinturas.filter((elemento) =>
            elemento.Codigo.toLowerCase() === busqueda.toLowerCase()
        );
        console.log(resultadosBusqueda);
        setSubProductos(resultadosBusqueda.map(item => item.SubProducto));
        setSubProductosObjetos(resultadosBusqueda); 
        setHasSearched(true);
    };

    const handleSubProductoSelect = (subProducto) => {    
        console.log("MIRA ESTO:");
        console.log(subProductosObjetos);
        const selectedPintura = subProductosObjetos.find(item => item.SubProducto === subProducto);   
        setSelectedSubProducto(selectedPintura);
        setColoranteResultados([]);
        //console.log(selectedPintura)
    };


    useEffect(() => {
        console.log("CAMBIO")
        console.log(selectedSubProducto);
    }, [selectedSubProducto])


    const handleLitrosSelect = (event) => {
        const litros = event.target.value;
        setSelectedLitros(litros);
        obtenerColorantes(litros);
    };

    const obtenerColorantes = (litros) => {
        console.log("ENTRO AMIGO");
        console.log(selectedSubProducto);
        if (!selectedSubProducto) return;


        const colorantes = [];

        console.log("Datos del subproducto seleccionado:", selectedSubProducto); // Ver los datos del subproducto

        // Verificamos cada CodigoColorante y agregamos su correspondiente cantidad
        if (selectedSubProducto.CodigoColorante1 && selectedSubProducto.CodigoColorante1 !== '0') {
            colorantes.push({
                colorante: selectedSubProducto.CodigoColorante1,
                cantidad: selectedSubProducto[`Cantidad1_${litros}`],
            });
        }
        if (selectedSubProducto.CodigoColorante2 && selectedSubProducto.CodigoColorante2 !== '0') {
            colorantes.push({
                colorante: selectedSubProducto.CodigoColorante2,
                cantidad: selectedSubProducto[`Cantidad2_${litros}`],
            });
        }
        if (selectedSubProducto.CodigoColorante3 && selectedSubProducto.CodigoColorante3 !== '0') {
            colorantes.push({
                colorante: selectedSubProducto.CodigoColorante3,
                cantidad: selectedSubProducto[`Cantidad3_${litros}`],
            });
        }
        if (selectedSubProducto.CodigoColorante4 && selectedSubProducto.CodigoColorante4 !== '0') {
            colorantes.push({
                colorante: selectedSubProducto.CodigoColorante4,
                cantidad: selectedSubProducto[`Cantidad4_${litros}`],
            });
        }
        if (selectedSubProducto.CodigoColorante5 && selectedSubProducto.CodigoColorante5 !== '0') {
            colorantes.push({
                colorante: selectedSubProducto.CodigoColorante5,
                cantidad: selectedSubProducto[`Cantidad5_${litros}`],
            });
        }
        if (selectedSubProducto.CodigoColorante6 && selectedSubProducto.CodigoColorante6 !== '0') {
            colorantes.push({
                colorante: selectedSubProducto.CodigoColorante6,
                cantidad: selectedSubProducto[`Cantidad6_${litros}`],
            });
        }
        console.log("Colorantes y cantidades obtenidos:", colorantes); // Mostrar colorantes obtenidos

        setColoranteResultados(colorantes);
    };



    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        footerActive(tablaPinturas.length === 0);
    }, [tablaPinturas]);

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
                        <select
                            onChange={(e) => handleSubProductoSelect(e.target.value)} // Mover onChange al select
                            className="rounded input-design my-2 bg-[#efecec] mx-2 h-[40px]">
                            <option value="">Seleccione un Producto</option> {/* Asegúrate de que el valor sea una cadena vacía */}
                            {subProductos.map((subProducto, index) => (
                                <option key={index} value={subProducto}>{subProducto}</option>
                            ))}
                        </select>

                        <select onChange={handleLitrosSelect} className="rounded input-design my-2 bg-[#efecec] mx-2 h-[40px]">
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
                <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full font-bold text-[#0154b8]">
                    <div>Colorante</div>
                    <div>Cantidad</div>
                    <div>Precio</div>
                    <div>Importe</div>
                </div>
                <hr />
                <div>
                    {coloranteResultados.length > 0 ? (
                        coloranteResultados.map((resultado, index) => (
                            <div key={index} className={`grid grid-cols-4 gap-4 p-2 items-center zebra-row`}>
                                <div style={{ minWidth: "120px" }}>
                                    <Input
                                        type="text"
                                        value={resultado.colorante || ""}
                                        readOnly
                                        className="text-[#0154b8] border rounded p-1"
                                    />
                                </div>
                                <div style={{ minWidth: "100px" }}>
                                    <Input
                                        type="text"
                                        value={resultado.cantidad || ""}
                                        readOnly
                                        className="text-[#0154b8] border rounded p-1"
                                    />
                                </div>
                                <div style={{ minWidth: "100px" }}>
                                    <Typography variant="small" className="font-bold text-[#0154b8]">
                                        {resultado.cantidad > 0 ? `$0` : ""}
                                    </Typography>
                                </div>
                                <div style={{ minWidth: "100px" }}>
                                    <Typography variant="small" className="font-bold text-[#0154b8]">
                                        {resultado.cantidad > 0 ? `$0` : ""}
                                    </Typography>
                                </div>
                            </div>
                        ))
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
