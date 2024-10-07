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
    const [tablaPigmentos, setTablaPigmentos] = useState([])
    const [tablaBases, setTablaBases] = useState([])
    const [totalImporte, setTotalImporte] = useState(0)
    const [precioBases, setPrecioBases] = useState(0)

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

    // Llamada a la tabla de formulas
    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/data/formulas");
            setTablaPinturas(response.data);
        } catch (err) {
            console.error('Error al obtener los datos:', err);
        }
    };

    // Llamada a la tabla de pigmentos 
    const getDataPigmen = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/data/pigmentos");
            setTablaPigmentos(response.data);
        } catch (err) {
            console.error('Error al obtener los datos:', err);
        }
    };

    // Llamada a la tabla de bases 
    const getDataBases = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/data/bases");
            setTablaBases(response.data);
        } catch (err) {
            console.error('Error al obtener los datos:', err);
        }
    };


    // Con la barra de busqueda filtra ese valor para mapear el select con los subproductos de ese codigo
    const buscarSubProductos = () => {
        const resultadosBusqueda = tablaPinturas.filter((elemento) =>
            elemento.Codigo.toLowerCase() === busqueda.toLowerCase()
        );
        setSubProductos(resultadosBusqueda.map(item => item.SubProducto));
        setSubProductosObjetos(resultadosBusqueda);
        setHasSearched(true);
    };

    // Funcion para borrar la barra de busqueda
    const borrarBusqueda = () => {
        setBusqueda("");
        setHasSearched(false);
        coloranteResultados.length = 0;
        setTotalImporte(0);
        setPrecioBases(0);
    }


    // Pa tomar el subproducto y completar los datos de la pintura ingresada
    const handleSubProductoSelect = (subProducto) => {
        const selectedPintura = subProductosObjetos.find(item => item.SubProducto === subProducto);
        setSelectedSubProducto(selectedPintura);
        setColoranteResultados([]);
    };

    // Manejar los litros del segundo select
    const handleLitrosSelect = (event) => {
        const litros = event.target.value;
        setSelectedLitros(litros);
        obtenerColorantes(litros);
        obtenerCodigoBase(litros);
    };



    const obtenerColorantes = (litros) => {
        if (!selectedSubProducto) return;

        const colorantes = [];

        const agregarColorante = (codigoColorante, cantidadLitros) => {
            const resultadoColorante = buscarLetraPorCodigo(codigoColorante);
            if (resultadoColorante) {
                colorantes.push({
                    colorante: resultadoColorante.letra,
                    cantidad: cantidadLitros,
                    precio: resultadoColorante.precioPulzo
                });
            }
        };

        // Verificamos cada CodigoColorante y agregamos su correspondiente cantidad y precio
        if (selectedSubProducto.CodigoColorante1 && selectedSubProducto.CodigoColorante1 !== '0') {
            agregarColorante(selectedSubProducto.CodigoColorante1, selectedSubProducto[`Cantidad1_${litros}`]);
        }
        if (selectedSubProducto.CodigoColorante2 && selectedSubProducto.CodigoColorante2 !== '0') {
            agregarColorante(selectedSubProducto.CodigoColorante2, selectedSubProducto[`Cantidad2_${litros}`]);
        }
        if (selectedSubProducto.CodigoColorante3 && selectedSubProducto.CodigoColorante3 !== '0') {
            agregarColorante(selectedSubProducto.CodigoColorante3, selectedSubProducto[`Cantidad3_${litros}`]);
        }
        if (selectedSubProducto.CodigoColorante4 && selectedSubProducto.CodigoColorante4 !== '0') {
            agregarColorante(selectedSubProducto.CodigoColorante4, selectedSubProducto[`Cantidad4_${litros}`]);
        }
        if (selectedSubProducto.CodigoColorante5 && selectedSubProducto.CodigoColorante5 !== '0') {
            agregarColorante(selectedSubProducto.CodigoColorante5, selectedSubProducto[`Cantidad5_${litros}`]);
        }
        if (selectedSubProducto.CodigoColorante6 && selectedSubProducto.CodigoColorante6 !== '0') {
            agregarColorante(selectedSubProducto.CodigoColorante6, selectedSubProducto[`Cantidad6_${litros}`]);
        }

        setColoranteResultados(colorantes);
    };

    // Sumatoria final
    useEffect(() => {
        const importeTotal = coloranteResultados.reduce((total, resultado) => {
            const importe = resultado.cantidad && resultado.precio ? resultado.cantidad * resultado.precio : 0;
            return total + importe;
        }, 0);
        setTotalImporte(importeTotal);
    }, [coloranteResultados]);

    useEffect(() => {
        getData();
        getDataPigmen();
        getDataBases();
    }, []);

    useEffect(() => {
        footerActive(tablaPinturas.length === 0);
    }, [tablaPinturas]);



    const buscarLetraPorCodigo = (codigoColorante) => {
        const pigmentoEncontrado = tablaPigmentos.find((pigmento) => pigmento.Codigo === codigoColorante);

        if (!pigmentoEncontrado) return null;

        return {
            letra: pigmentoEncontrado.Letra,
            precioPulzo: pigmentoEncontrado.PrecioPulzo
        };
    };

    // Nueva función para obtener el CodigoBase según el litro seleccionado
    const obtenerCodigoBase = (litros) => {
        if (!selectedSubProducto) return;

        let codigoBase = null;
        switch (litros) {
            case "3":
                codigoBase = selectedSubProducto.CodigoBase3;
                break;
            case "4":
                codigoBase = selectedSubProducto.CodigoBase4;
                break;
            case "5":
                codigoBase = selectedSubProducto.CodigoBase5;
                break;
            case "6":
                codigoBase = selectedSubProducto.CodigoBase6;
                break;
            default:
                console.log("Valor no válido");
        }

        if (codigoBase) {
            // Buscar el valor del precio en la tabla de bases
            const baseEncontrada = tablaBases.find(base => base.Codigo === codigoBase);
            if (baseEncontrada) {
                console.log(`CodigoBase${litros}:`, codigoBase);
                console.log(`Precio de la base ${codigoBase}: $${baseEncontrada.Precio}`);
                setPrecioBases(baseEncontrada.Precio)
            } else {
                console.log(`No se encontró la base con el código: ${codigoBase}`);
            }
        }
    };



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
            <h2 className="my-2 mt-10 text-3xl text-center text-[#fc5273] font-bold">Tintometria para HOGAR/OBRA</h2>
            <hr />
            <div className="flex flex-col m-2 items-center justify-center md:flex-row">
                <label>
                    <Input
                        className="bg-[#fff] px-4 py-3 outline-none w-[220px] text-[#0154b8] font-bold rounded border-2 transition-colors duration-100 border-solid focus:border-[#0154b8] border-[#0154b8]"
                        type="text"
                        value={busqueda}
                        placeholder="Ingrese el código color"
                        onChange={handleInputChange}
                    />
                </label>
                    <Button onClick={buscarSubProductos} className="m-2 px-auto h-[44px] ov-btn-grow-skew">Buscar</Button>
                    <Button onClick={borrarBusqueda} className="m-2 px-auto h-[44px] ov-btn-grow-skew-borrar">Borrar</Button>
            </div>
            <div className="flex flex-col md:flex-row m-2 items-center justify-center">
                {hasSearched && subProductos.length > 0 && (
                    <>
                        <select
                            onChange={(e) => handleSubProductoSelect(e.target.value)}
                            className="border-b border-[#0154b8] rounded input-design my-2 mx-2 h-[40px]">
                            <option value="">Seleccione un Producto</option>
                            {subProductos.map((subProducto, index) => (
                                <option key={index} value={subProducto}>{subProducto}</option>
                            ))}
                        </select>

                        <select onChange={handleLitrosSelect} className="border-b border-[#0154b8] rounded input-design my-2 mx-2 h-[40px]">
                            <option value="">Seleccione Cant. de Base</option>
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
                <div className="grid grid-cols-4 gap-4 text-left p-2 min-w-full font-bold bg-[#0154b8] text-white">
                    <div>Colorante</div>
                    <div>Cantidad</div>
                    <div>Precio</div>
                    <div>Importe</div>
                </div>
                <div>
                    {coloranteResultados.length > 0 ? (
                        coloranteResultados.map((resultado, index) => {
                            const importe = resultado.cantidad && resultado.precio ? resultado.cantidad * resultado.precio : 0; // Calcular importe

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
                                            {resultado.precio ? `$${resultado.precio.toFixed(4)}` : ""}
                                        </Typography>
                                    </div>
                                    <div style={{ minWidth: "100px" }}>
                                        <Typography variant="small" className="font-bold text-[#0154b8]">
                                            {importe > 0 ? `$${importe.toFixed(4)}` : ""}
                                        </Typography>
                                    </div>
                                </div>
                            );
                        })
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
                    <p>{`$${precioBases}`}</p>
                    <p>{`$${totalImporte.toFixed(2)}`}</p>
                    <p>{`$${(totalImporte + precioBases).toFixed(2)}`}</p>
                </div>
            </div>
        </div>
    );
}
