import React, { useState, useEffect, useContext } from "react";
import { Card, Typography, Input } from "@material-tailwind/react";
import { ClassContext } from "../../Context";
import axios from "axios";
import "./InputContainer.css";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/routes/data");
                console.log('Datos recibidos:', response.data);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="pb-10">
            <h2 className="my-2 text-3xl text-center text-[#0154b8] font-bold">{title}</h2>
            <div className="flex flex-col m-2 items-center justify-center">
                <label>
                    <Input
                        className="rounded input-design my-2 bg-slate-300"
                        type="text"
                        value={busqueda}
                        placeholder="Ingrese el código color"
                        onChange={handleInputChange}
                    />
                </label>
                <h2 className="my-2 text-xl text-center text-[#0154b8] font-bold">Nombre pintura</h2>
            </div>
            <hr />
            <Card className="w-full">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Col</Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Cantidad</Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Precio</Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">Importe</Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pinturas.map(pintura => (
                            <tr key={pintura.Id}>
                                <td>
                                    <Input
                                        type="text"
                                        value={pintura.Col}
                                        onChange={(e) => handleEditableChange(pintura.Id, 'Col', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td>
                                    <Input
                                        type="text"
                                        value={pintura.Cant}
                                        onChange={(e) => handleEditableChange(pintura.Id, 'Cant', e.target.value)}
                                        className="border rounded p-1"
                                    />
                                </td>
                                <td>
                                    <Typography variant="small" color="blue-gray" className="font-normal">${pintura.Precio}</Typography>
                                </td>
                                <td>
                                    <Typography variant="small" color="blue-gray" className="font-normal">${pintura.Importe}</Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
            <div className="flex justify-between p-5 border-t border-blue-gray-100">
                
            </div>
        </div>
    );
}
