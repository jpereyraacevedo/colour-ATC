import react from "react"
import { Radio } from "@material-tailwind/react"

export default function () {
    return (
        <section className="border-gray-500 px-5 rounded-lg border flex-col items-center content-center max-w-5xl bg-neutral-300 mx-auto">
            <h3 className="text-center text-3xl text-stone-950 p-5">
                Seleccione lo que desee presupuestar
            </h3>
            <div className="flex align-center content-center">
                <div className="flex gap-10 content-center mx-auto my-5">
                    <Radio name="type" label="Linea HOGAR" defaultChecked />
                    <Radio name="type" label="Automotriz" />
                </div>
            </div>
            {/* aca van los componentes */}
        </section>
    )
}