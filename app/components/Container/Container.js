import { useState } from "react"
import InputContainer from "../InputContainer/InputContainer"
import "./Container.css"

export default function () {

    const [title, setTitle] = useState("OBRA")

    return (
        <section className="rounded border flex-col max-w-5xl mx-auto mt-5 mb-10 bg-white container z-10 flex justify-center items-center">
            <div className="flex align-center content-center">
                <hr />
                <div className="flex align-center content-center justify-center">
                    <InputContainer title={title} />
                </div>
            </div>
        </section>
    )
}