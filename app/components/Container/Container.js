import react, { useContext, useState } from "react"
import { Radio } from "@material-tailwind/react"
import InputContainer from "../InputContainer/InputContainer"
import "./Container.css"

export default function () {

    const [title, setTitle] = useState("OBRA")

    return (
        <section className="rounded border flex-col max-w-5xl mx-auto mt-5 mb-10 bg-white container z-10 flex justify-center items-center">
            <div className="flex align-center content-center">
                {/* <div className={`flex gap-10 content-center mx-auto my-5`}>
                    <Radio name="type" className="radio-btn" label="Linea HOGAR" onClick={() => handleClick("HOGAR")} />
                    </div> */}
                <hr />
                <div className="flex align-center content-center justify-center">
                    <InputContainer title={title} />
                </div>
            </div>
        </section>
    )
}