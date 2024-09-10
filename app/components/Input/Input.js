import react from "react"
import "./Input.css"


export default function Input({ input }) {

    return (
        <>
            <div className="rounded inputs bg-white my-2">
                <p>{input} </p>
            </div>
        </>
    )
}