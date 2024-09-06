import react from "react"
import { Radio } from "@material-tailwind/react"
import InputContainer from "../InputContainer/InputContainer"

export default function () {
    return (
        <section className="px-5 rounded-lg border flex-col items-center content-center max-w-5xl bg-neutral-100 mx-auto">
            <h3 className="text-center text-3xl text-stone-950 p-5">
                Seleccione lo que desee presupuestar
            </h3>
            <div className="flex align-center content-center">
                <div className="flex gap-10 content-center mx-auto my-5">
                    <Radio name="type" label="Linea HOGAR" defaultChecked />
                    <Radio name="type" label="Automotriz" />
                </div>
            </div>
            <div className="flex align-center content-center justify-center">
                <InputContainer />
            </div>
            {/* aca van los componentes */}
        </section>
    )
}