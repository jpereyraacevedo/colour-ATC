import react, { useState } from "react"
import { Radio } from "@material-tailwind/react"
import InputContainer from "../InputContainer/InputContainer"
import "./Container.css"

export default function () {



    const [mount, setMount] = useState("")

    let handleClick = (tipo) => {

        setMount(tipo)
    }

    return (
        <section className="px-5 rounded border flex-col max-w-5xl bg-neutral-100 mx-auto">
            <h3 className="text-center text-3xl text-stone-950 p-5">
                Seleccione lo que desee presupuestar
            </h3>
            <div className="flex align-center content-center">
                <div className="flex gap-10 content-center mx-auto my-5">
                    <Radio name="type" className="radio-btn" label="Linea HOGAR" onClick={() => handleClick("Hogar")} />
                    <Radio name="type" className="radio-btn" label="Automotriz" onClick={() => handleClick("Automotriz")} />
                </div>
            </div>
            <div className="flex align-center content-center justify-center">
                <div>
                    {(mount !== "") ? <InputContainer name={mount} /> : null}
                </div>
            </div>
        </section>
    )
}