import react from "react"
import { TEInput } from "tw-elements-react";
import Input from "../Input/Input";

export default function InputContainer ({name}) {
    return (
        <div className="py-10">
            <h2 className="my-2">Presupuesto para {name}</h2>
           <Input input={name} />
        </div>
    )
}