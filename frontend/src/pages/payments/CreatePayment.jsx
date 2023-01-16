import { useState, useEffect } from "react"
import { api } from "../../helpers/api"
import { generateUniqId } from "../../helpers/id_generator"
import { saveAs } from "file-saver"

function CreatePayment() {
    const [data, setData] = useState({ paymentId: generateUniqId() })
    const [err, setErr] = useState("")
    const [succ, setSucc] = useState("")
    const [appartments, setAppartments] = useState([])

    const inputHandler = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    const token = localStorage.getItem("token")

    useEffect(() => {
        api.get("/appartements", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setAppartments(response.data.data)
            })
            .catch((err) => {
                setErr(err.response?.data)
                console.log(err)
            })
    }, [])

    const createPayment = (e) => {
        e.preventDefault()

        api.post("/payments", data, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setSucc(response.data.message)
                api.get("/payments/fetch-invoice", {
                    responseType: "blob",
                }).then((res) => {
                    const pdfBlob = new Blob([res.data], {
                        type: "application/pdf",
                    })

                    saveAs(pdfBlob, "invoice.pdf")
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <>
            <div className="p-6 rounded bg-gray-700 w-2/4 mx-auto mt-5 bg-gray-800">
                <h1 className="text-2xl font-medium text-gray-300 text-center py-2">
                    Create New Payment
                </h1>
                <p className="text-center text-green-300">{succ}</p>
                <form onSubmit={createPayment} className="w-full">
                    <div className="form-group mb-6">
                        <label htmlFor="">Payment Amount</label>
                        <input
                            type="number"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            placeholder="100dh"
                            name="paymentAmount"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="">Months Payed</label>
                        <input
                            type="date"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-whitebg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            name="monthsPayed"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label
                            for="countries"
                            class="block mb-2 text-sm font-medium text-white"
                        >
                            Select Appartment Number
                        </label>
                        <select
                            id="countries"
                            class="outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="appartement"
                            onChange={inputHandler}
                        >
                            <option selected disabled>
                                Appartment Number
                            </option>
                            {appartments.map((appartment) => (
                                <option value={appartment.appartementNumber}>
                                    {appartment.appartementNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreatePayment
