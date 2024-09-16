import react, { useState, useEffect } from "react";
import axios from "axios";
import "./InputContainer.css";
import { Card, Typography, Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


export default function InputContainer({ name }) {

    const [usuarios, setUsuarios] = useState([])
    const [tablaUsuarios, setTablaUsuarios] = useState([])
    const [busqueda, setBusqueda] = useState("")

    const handleInputChange = (event) => {
        setBusqueda(event.target.value)
        filterData(event.target.value);
    };

    const getData = async () => {
        await axios.get("https://jsonplaceholder.typicode.com/users")
            .then(response => {
                setUsuarios(response.data);
                setTablaUsuarios(response.data)
            }).catch(err => {
                console.log(err)
            })
    }

    const filterData = (terminoBusqueda) => {
        var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())){
                return elemento;
            }
        })
        setUsuarios(resultadosBusqueda)
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <>
            <div className="pb-10">
                <h2 className="my-2 text-3xl text-center text-[#0154b8]">{name}</h2>
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
                    <FontAwesomeIcon icon={faSearch} className="mx-3 search-btn" />
                </div>
                <hr />
                <Card className="h-full w-full" >
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
                            {(busqueda==="") ? console.log ("BUSQUEDA ESTA VACIO"): null}
                            {usuarios && usuarios.map(usuario => {

                                return (
                                    <tr key={usuario.id}>
                                        <td>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {usuario.name}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {usuario.phone}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {usuario.username}
                                            </Typography>
                                        </td>
                                        <td>
                                            <Typography
                                                as="a"
                                                href="#"
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium"
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>
        </>
    )
}