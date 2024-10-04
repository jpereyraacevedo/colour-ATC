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
    const [tablaPigmentos, setTablaPigmentos] = useState([]);
    const [totalImporte, setTotalImporte] = useState(0); // Estado para almacenar el total del importe

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

    const buscarSubProductos = () => {
        const resultadosBusqueda = tablaPinturas.filter((elemento) =>
            elemento.Codigo.toLowerCase() === busqueda.toLowerCase()
        );
        setSubProductos(resultadosBusqueda.map(item => item.SubProducto));
        setSubProductosObjetos(resultadosBusqueda);
        setHasSearched(true);
    };

    const handleSubProductoSelect = (subProducto) => {
        const selectedPintura = subProductosObjetos.find(item => item.SubProducto === subProducto);
        setSelectedSubProducto(selectedPintura);
        setColoranteResultados([]);
    };

    const handleLitrosSelect = (event) => {
        const litros = event.target.value;
        setSelectedLitros(litros);
        obtenerColorantes(litros);
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

    const buscarLetraPorCodigo = (codigoColorante) => {
        const pigmentoEncontrado = tablaPigmentos.find((pigmento) => pigmento.Codigo === codigoColorante);

        if (!pigmentoEncontrado) return null;

        return {
            letra: pigmentoEncontrado.Letra,
            precioPulzo: pigmentoEncontrado.PrecioPulzo
        };
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

    // Calcular el importe total de todos los colorantes
    const calcularImporteTotal = () => {
        const total = coloranteResultados.reduce((sum, resultado) => {
            const importe = resultado.cantidad && resultado.precio ? resultado.cantidad * resultado.precio : 0;
            return sum + importe;
        }, 0);
        setTotalImporte(total); // Actualizar el estado con el importe total
    };

    // Calcular el importe total cada vez que cambie coloranteResultados
    useEffect(() => {
        calcularImporteTotal();
    }, [coloranteResultados]);

    useEffect(() => {
        getData();
        getDataPigmen();
    }, []);

    useEffect(() => {
        footerActive(tablaPinturas.length === 0);
    }, [tablaPinturas]);

    return (
        <div className="mb-10 ancho-minimo">
            <h2 className="my-2 mt-10 text-3xl text-center text-[#fc5273] font-bold">OBRA</h2>
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
            <div className="flex flex-col m-2 items-center justify-center">
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
                            <option value="">Seleccione un volumen</option>
                            {[3, 4, 5, 6].map(volumen => (
                                <option key={volumen} value={volumen}>{volumen}L</option>
                            ))}
                        </select>
                    </>
                )}

                <Card className="mt-5 mb-10 w-full flex flex-col p-2">
                    <div className="grid grid-cols-4 gap-4 p-2 items-center font-bold">
                        <div>Colorante</div>
                        <div>Cantidad</div>
                        <div>Precio</div>
                        <div>Importe</div>
                    </div>

                    {coloranteResultados.length > 0
                        ? coloranteResultados.map((resultado, index) => (
                            <div key={index} className="grid grid-cols-4 gap-4 p-2 items-center zebra-row">
                                <div>{resultado.colorante}</div>
                                <div>{resultado.cantidad}</div>
                                <div>{resultado.precio}</div>
                                <div>{resultado.cantidad * resultado.precio}</div>
                            </div>
                        ))
                        : generarFilasVacias(8)}

                </Card>

                {/* Mostrar el total */}
                <Typography className="text-black mt-5 font-bold text-2xl">
                    Total Importe: {totalImporte}
                </Typography>

                <p>IMPRIMIR FINAL AQUI</p>
            </div>
        </div>
    );
}
