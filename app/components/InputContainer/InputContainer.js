import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from 'fuse.js';
import Swal from 'sweetalert2'
import SearchBar from "../SearchBar/SearchBar";
import SelectProductos from "../SelectProductos/SelectProductos";
import TablaColorantes from "../TablaColorantes/TablaColorantes";
import ImporteTotal from "../ImporteTotal/ImporteTotal";
import "./InputContainer.css";

export default function InputContainer() {
    const [tablaPinturas, setTablaPinturas] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [subProductos, setSubProductos] = useState([]);
    const [selectedSubProducto, setSelectedSubProducto] = useState(null);
    const [selectedLitros, setSelectedLitros] = useState(null);
    // Busqueda de formula
    const [hasSearched, setHasSearched] = useState(false);
    const [coloranteResultados, setColoranteResultados] = useState([]);
    const [subProductosObjetos, setSubProductosObjetos] = useState([]);
    const [tablaPigmentos, setTablaPigmentos] = useState([]);
    const [tablaBases, setTablaBases] = useState([]);
    const [tablaArticulos, setTablaArticulos] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda de articulo / bases
    const [filteredArticulos, setFilteredArticulos] = useState([]);
    const [totalImporte, setTotalImporte] = useState(0);
    const [precioBases, setPrecioBases] = useState(0);
    const [loading, setLoading] = useState(false); // Estado para controlar la carga
    const [tituloFormula, setTituloFormula] = useState("")
    const [tituloBase, setTituloBase] = useState("")


    const handleInputChange = (event) => {
        const value = event.target.value;
        setBusqueda(value);

        if (value === "") {
            setSubProductos([]);
            setSelectedSubProducto(null);
            setColoranteResultados([]);
            setHasSearched(false);
            setTituloFormula("");
            setTituloBase("");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Inicia la carga
            try {
                const [formulas, pigmentos, bases, articulos] = await Promise.all([
                    axios.get("http://192.168.0.240:5000/api/data/formulas"),
                    axios.get("http://192.168.0.240:5000/api/data/pigmentos"),
                    axios.get("http://192.168.0.240:5000/api/data/bases"),
                    axios.get("http://192.168.0.240:5000/api/data/articulos")
                ]);
                setTablaPinturas(formulas.data);
                setTablaPigmentos(pigmentos.data);
                setTablaBases(bases.data);
                setTablaArticulos(articulos.data);
            } catch (err) {
                console.error('Error al obtener los datos:', err);
            } finally {
                setLoading(false); // Termina la carga
            }
        };
        fetchData();
    }, []);

    // Con la barra de búsqueda filtra ese valor para mapear el select con los subproductos de ese código o fórmula
    const buscarSubProductos = () => {
        if (busqueda === "") {
            Swal.fire({
                icon: "error",
                color: "#0154b8",
                title: "Por favor ingrese un codigo",
            });
            return null;
        }

        const resultadosBusqueda = tablaPinturas.filter((elemento) =>
            elemento.Codigo.toLowerCase() === busqueda.toLowerCase() ||  // Búsqueda en la columna Codigo
            elemento.Formula.toLowerCase().includes(busqueda.toLowerCase()) // Búsqueda en la columna Formula
        );

        if (resultadosBusqueda.length === 0) {
            Swal.fire({
                color: "#0154b8",
                title: "No hay coincidencias en la busqueda, ingrese un codigo valido.",
            });
        } else {
            setSubProductos(resultadosBusqueda.map(item => item.SubProducto));
            setSubProductosObjetos(resultadosBusqueda);
            setHasSearched(true);
        }
    };


    // Función para borrar la barra de búsqueda
    const borrarBusqueda = () => {
        setBusqueda("");
        setHasSearched(false);
        setColoranteResultados([]);
        setSelectedSubProducto(null);  // Volver a null para deshabilitar el select de litros
        setTotalImporte(0);
        setPrecioBases(0);
        setTituloFormula("");
        setTituloBase("");
    };


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

        if (selectedSubProducto) {
            setTituloFormula(selectedSubProducto.Formula)
            setTituloBase(selectedSubProducto.Base)
        }
    };

    // Data de colorantes
    const obtenerColorantes = (litros) => {
        // Validar que se haya seleccionado un subproducto y que se haya seleccionado un valor válido para litros
        if (!selectedSubProducto) {
            console.warn("No se ha seleccionado un subproducto.");
            return;
        }

        if (!litros || litros < 3 || litros > 6) {  // Entre 3 y 6 porque en los value de las tablas son 3, 4, 5, y 6
            console.warn("Valor de litros no válido:", litros);
            return;
        }

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

        // Validar y agregar cada CodigoColorante
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

    // Busqueda por articulo / bases
    // useEffect(() => {
    //     // Filtrar los artículos en base a la búsqueda
    //     const resultados = tablaArticulos.filter(articulo =>
    //         articulo.DESCRI.toLowerCase().includes(searchTerm.toLowerCase()) // Comparación case-insensitive
    //     );
    //     setFilteredArticulos(resultados);
    // }, [searchTerm, tablaArticulos]);

    useEffect(() => {
        // Opciones de Fuse.js
        const options = {
            keys: ['DESCRI'],
            threshold: 0.3, // Permite cierta tolerancia a errores
        };

        const fuse = new Fuse(tablaArticulos, options);
        const resultados = searchTerm ? fuse.search(searchTerm).map(result => result.item) : tablaArticulos;
        
        setFilteredArticulos(resultados);
    }, [searchTerm, tablaArticulos]);

    // Sumatoria final
    useEffect(() => {
        const importeTotal = coloranteResultados.reduce((total, resultado) => {
            const importe = resultado.cantidad && resultado.precio ? resultado.cantidad * resultado.precio : 0;
            return total + importe;
        }, 0);
        setTotalImporte(importeTotal);
    }, [coloranteResultados]);


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
        // Validar que se haya seleccionado un subproducto y que se haya seleccionado un valor válido para litros
        if (!selectedSubProducto) {
            console.warn("No se ha seleccionado un subproducto.");
            return;
        }

        if (!litros || litros < 3 || litros > 6) {
            console.warn("Valor de litros no válido:", litros);
            return;
        }

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
            const baseEncontrada = tablaBases.find(base => base.Codigo === codigoBase);
            if (baseEncontrada) {
                setPrecioBases(baseEncontrada.Precio);
            } else {
                console.warn(`No se encontró la base con el código: ${codigoBase}`);
            }
        }
    };

    const generarFilasVacias = (num) => {
        return Array.from({ length: num }, (_, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 p-2 items-center zebra-row">
                <div style={{ minWidth: "100px" }}>
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
            <h2 className="mx-2 mt-10 text-3xl text-center text-[#fc5273] font-bold border-y-2 py-3 border-[#fc5273]">Tintometría para HOGAR / OBRA</h2>
            {/* COMPONENTE BARRA DE BUSQUEDA */}
            <SearchBar busqueda={busqueda} handleInputChange={handleInputChange} buscarSubProductos={buscarSubProductos} borrarBusqueda={borrarBusqueda} />
            {/* COMPONENTE DE SELECT PRODUCTOS */}
            <SelectProductos subProductos={subProductos} handleSubProductoSelect={handleSubProductoSelect} handleLitrosSelect={handleLitrosSelect} hasSearched={hasSearched} selectedSubProducto={selectedSubProducto} searchTerm={searchTerm} setSearchTerm={setSearchTerm} options={filteredArticulos.map(a => a.DESCRI)} />
            {/* Titulo que se completa una vez obtenido el valor del select y de los litros */}
            <h2 className="text-center font-bold text-[#0154b8] text-3xl">{tituloFormula + " " + tituloBase}</h2>
            {/* COMPONENTE DE TABLA COLORANTES */}
            <TablaColorantes coloranteResultados={coloranteResultados} generarFilasVacias={generarFilasVacias} />
            {/* CALCULO DE IMPORTE TOTAL */}
            <ImporteTotal precioBases={precioBases} totalImporte={totalImporte} />
        </div>
    );
}
