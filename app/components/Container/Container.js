import InputContainer from "../InputContainer/InputContainer"
import "./Container.css"

export default function () {


    return (
        <div className="mx-3 altura-minima">
            <section className="rounded border flex-col max-w-5xl mx-auto mt-5 mb-10 bg-white container z-10 flex justify-center items-center altura-minima">
                <div className="flex align-center content-center">
                    <div className="flex align-center content-center justify-center">
                        <InputContainer />
                    </div>
                </div>
            </section>
        </div>
    )
}