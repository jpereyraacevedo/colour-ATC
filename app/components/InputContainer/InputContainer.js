import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ClassContext } from "../../Context";  // Asegúrate de importar el contexto correctamente
import "./InputContainer.css";

export default function InputContainer({ title }) {

    const { footerActive } = useContext(ClassContext);  // Usa el método para activar o desactivar el footer
    const [usuarios, setUsuarios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");

    const handleInputChange = (event) => {
        setBusqueda(event.target.value);
        filterData(event.target.value);
    };

    const getData = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            setUsuarios(response.data);
            setTablaUsuarios(response.data);
        } catch (err) {
            console.log(err);
        }
    };

    const filterData = (terminoBusqueda) => {
        const resultadosBusqueda = tablaUsuarios.filter((elemento) =>
            elemento.name.toLowerCase().includes(terminoBusqueda.toLowerCase())
        );
        setUsuarios(resultadosBusqueda);
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        // Activa o desactiva el footer dependiendo si tablaUsuarios está vacío
        footerActive(tablaUsuarios.length === 0);
    }, [tablaUsuarios]);  // Ejecuta esto cada vez que tablaUsuarios cambie

    return (
        <>
            <div className="pb-10">
                <h2 className="my-2 text-3xl text-center text-[#0154b8] bold">{title}</h2>
                <div className="flex m-2 items-center justify-center">
                    <label>
                        <Input
                            className="rounded input-design my-2 bg-slate-300"
                            type="text"
                            value={busqueda}
                            placeholder="Ingrese el codigo color"
                            onChange={handleInputChange}
                        />
                    </label>
                    <FontAwesomeIcon icon={faSearch} className="mx-3 search-btn duration-100" />
                </div>
                <hr />
                <Card className="h-full w-full">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                        Tinte
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                        Cantidad
                                    </Typography>
                                </th>
                                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                    <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                        Coste
                                    </Typography>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {usuario.name}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {usuario.phone}
                                        </Typography>
                                    </td>
                                    <td>
                                        <Typography variant="small" color="blue-gray" className="font-normal">
                                            {usuario.username}
                                        </Typography>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            </div>
            <div className="flex justify-between p-5 border-t border-blue-gray-100">
                <h4 className="text-[#0154b8]">Total:</h4>
                <p className="text-[#0154b8] font-bold">$999,99</p>
            </div>
        </>
    );
}
