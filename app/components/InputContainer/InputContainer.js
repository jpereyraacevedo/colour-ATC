import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from 'fuse.js';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
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
  const [hasSearched, setHasSearched] = useState(false);
  const [coloranteResultados, setColoranteResultados] = useState([]);
  const [subProductosObjetos, setSubProductosObjetos] = useState([]);
  const [tablaPigmentos, setTablaPigmentos] = useState([]);
  const [tablaBases, setTablaBases] = useState([]);
  const [tablaArticulos, setTablaArticulos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredArticulos, setFilteredArticulos] = useState([]);
  const [totalImporte, setTotalImporte] = useState(0);
  const [precioBases, setPrecioBases] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tituloFormula, setTituloFormula] = useState("");
  const [tituloBase, setTituloBase] = useState("");
  const [articulos, setArticulos] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

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
      setLoading(true);
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
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
      elemento.Codigo.toLowerCase() === busqueda.toLowerCase() ||
      elemento.Formula.toLowerCase().includes(busqueda.toLowerCase())
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

  const borrarBusqueda = () => {
    setBusqueda("");
    setHasSearched(false);
    setColoranteResultados([]);
    setSelectedSubProducto(null);
    setTotalImporte(0);
    setPrecioBases(0);
    setTituloFormula("");
    setTituloBase("");
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
    obtenerCodigoBase(litros);

    if (selectedSubProducto) {
      setTituloFormula(selectedSubProducto.Formula);
      setTituloBase(selectedSubProducto.Base);
    }
  };

  const obtenerColorantes = (litros) => {
    if (!selectedSubProducto) return;
    if (!litros || litros < 3 || litros > 6) return;

    const colorantes = [];
    const agregarColorante = (codigoColorante, cantidadLitros) => {
      const resultado = buscarLetraPorCodigo(codigoColorante);
      if (resultado) {
        colorantes.push({
          colorante: resultado.letra,
          cantidad: cantidadLitros,
          precio: resultado.precioPulzo
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

  const actualizarCantidadColorante = (index, nuevaCantidad) => {
    setColoranteResultados((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, cantidad: parseFloat(nuevaCantidad) || 0 } : item
      )
    );
  };

  useEffect(() => {
    const options = { keys: ['DESCRI'], threshold: 0.3 };
    const fuse = new Fuse(tablaArticulos, options);
    const resultados = searchTerm ? fuse.search(searchTerm).map(r => r.item) : tablaArticulos;
    setFilteredArticulos(resultados);
  }, [searchTerm, tablaArticulos]);

  useEffect(() => {
    const importeTotal = coloranteResultados.reduce((total, resultado) => {
      const importe =
        resultado.cantidad && resultado.precio
          ? resultado.cantidad * resultado.precio
          : 0;
      return total + importe;
    }, 0);
    setTotalImporte(importeTotal);
  }, [coloranteResultados]);

  const buscarLetraPorCodigo = (codigoColorante) => {
    const pigmento = tablaPigmentos.find((p) => p.Codigo === codigoColorante);
    if (!pigmento) return null;
    return { letra: pigmento.Letra, precioPulzo: pigmento.PrecioPulzo };
  };

  const obtenerCodigoBase = (litros) => {
    if (!selectedSubProducto) return;
    if (!litros || litros < 3 || litros > 6) return;

    let codigoBase = null;
    switch (litros) {
      case "3": codigoBase = selectedSubProducto.CodigoBase3; break;
      case "4": codigoBase = selectedSubProducto.CodigoBase4; break;
      case "5": codigoBase = selectedSubProducto.CodigoBase5; break;
      case "6": codigoBase = selectedSubProducto.CodigoBase6; break;
      default: break;
    }

    if (codigoBase) {
      const baseEncontrada = tablaBases.find(base => base.Codigo === codigoBase);
      if (baseEncontrada) {
        // setPrecioBases(baseEncontrada.Precio);
      }
    }
  };

  const generarFilasVacias = (num) => {
    return Array.from({ length: Math.max(num, 0) }, (_, index) => (
      <div key={index} className="grid grid-cols-4 gap-4 p-2 items-center zebra-row">
        <div style={{ minWidth: "100px" }}><div className="desactivado" /></div>
        <div style={{ minWidth: "100px" }}><div className="desactivado" /></div>
        <div style={{ minWidth: "100px" }}><div className="desactivado" /></div>
        <div style={{ minWidth: "100px" }}><div className="desactivado" /></div>
      </div>
    ));
  };

  return (
    <div className="mb-10 ancho-minimo">
      <h2 className="mx-2 mt-10 text-3xl text-center text-[#fc5273] font-bold border-y-2 py-3 border-[#fc5273]">
        Tintometría para HOGAR / OBRA
      </h2>

      <SearchBar
        busqueda={busqueda}
        handleInputChange={handleInputChange}
        buscarSubProductos={buscarSubProductos}
        borrarBusqueda={borrarBusqueda}
        // tituloFormula={tituloFormula}
      />

      <SelectProductos
        subProductos={subProductos}
        handleSubProductoSelect={handleSubProductoSelect}
        handleLitrosSelect={handleLitrosSelect}
        hasSearched={hasSearched}
        selectedSubProducto={selectedSubProducto}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        options={filteredArticulos.map(a => a.DESCRI)}
        setPrecioBases={setPrecioBases}
        precioBases={precioBases}
        onBaseSelect={(base) => console.log("Base seleccionada:", base)}
        articulos={articulos}
      />

      <h2 className="text-center font-bold text-[#0154b8] text-3xl my-5">
        {tituloFormula + " " + tituloBase}
      </h2>

      {/* AQUÍ PASAMOS setColoranteResultados y la lista de pigmentos */}
      <TablaColorantes
        coloranteResultados={coloranteResultados}
        generarFilasVacias={generarFilasVacias}
        actualizarCantidadColorante={actualizarCantidadColorante}
        setColoranteResultados={setColoranteResultados}
        listaPigmentos={tablaPigmentos}
      />

      <ImporteTotal precioBases={precioBases} totalImporte={totalImporte} />
    </div>
  );
}
