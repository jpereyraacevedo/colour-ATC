import react, { useContext, useState } from "react"
import { Radio } from "@material-tailwind/react"
import InputContainer from "../InputContainer/InputContainer"
import "./Container.css"

export default function () {

    const [title, setTitle] = useState("")

    let handleClick = (tipo) => {
        setTitle(tipo)
    }


    return (
        <section className="rounded border flex-col max-w-5xl mx-auto mt-5 mb-10 bg-white container z-10">
            <h3 className="text-center text-3xl text-[#0154b8] p-5">
                Seleccione lo que desee presupuestar
            </h3>
            <div className="flex align-center content-center">
                <div className={`flex gap-10 content-center mx-auto my-5`}>
                    <Radio name="type" className="radio-btn" label="Linea HOGAR" onClick={() => handleClick("HOGAR")} />
                    <Radio name="type" className="radio-btn" label="Automotriz" onClick={() => handleClick("AUTOMOTRIZ")} />
                </div>
            </div>
            <hr />
            <div className="flex align-center content-center justify-center">
                <div>
                    {(title !== "") ? (<InputContainer title={title} />) : null}
                </div>
            </div>
        </section>
    )
}