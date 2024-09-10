import react, { useState } from "react"
import Input from "../Input/Input";
import "./InputContainer.css"


export default function InputContainer({ name }) {


    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const items = [
        { id: 1, name: 'Verde' },
        { id: 2, name: 'Rojo' },
        { id: 3, name: 'Azul' },
    ];

    return (
        <>
            <div className="pb-10">
                <h2 className="my-2 text-3xl text-center text-black">{name}</h2>
                <label>
                    <input
                        className="rounded input-design my-2"
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange} />
                </label>
                <hr />
                <ul>
                    {items.map(item => (
                        <li key={item.id}><Input input={item.name} /></li>
                    ))}
                </ul>
            </div>
        </>
    )
}