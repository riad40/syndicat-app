import { useState, useEffect } from "react"
import { api } from "../../helpers/api"
import { generateUniqId } from "../../helpers/id_generator"
import { useParams } from "react-router-dom"

function UpdatePayment() {
    const params = useParams()

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

    const setAppartmentValue = (e) => {
        if (data.appartement.appartementNumber)
            e.target.value = data.appartement.appartementNumber
        else e.target.value = ""
    }

    // get the specific payment data
    const getPaymentData = (id) => {
        api.get(`/payments/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        // get the specific payment data
        getPaymentData(params.payment_id)
        // get appartments data
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

    const updatePayment = (e) => {
        e.preventDefault()

        api.put(`/payments/${params.payment_id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setSucc(response.data.message)
                console.log(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className="p-6 rounded bg-gray-700 w-2/4 mx-auto mt-5 bg-gray-800">
                <h1 className="text-2xl font-medium text-gray-300 text-center py-2">
                    Update Payment
                </h1>
                <p className="text-center text-green-300">{succ}</p>
                <form onSubmit={updatePayment} className="w-full">
                    <div className="form-group mb-6">
                        <label htmlFor="">Payment Amount</label>
                        <input
                            type="number"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            placeholder="100dh"
                            name="paymentAmount"
                            onChange={inputHandler}
                            value={data.paymentAmount}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="">Months Payed</label>
                        <input
                            type="date"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-whitebg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            name="monthsPayed"
                            onChange={inputHandler}
                            value={data.monthsPayed}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label
                            for="apparte"
                            class="block mb-2 text-sm font-medium text-white"
                        >
                            Select Appartment Number
                        </label>
                        <select
                            id=""
                            class="outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="appartement"
                            onChange={inputHandler}
                            value={setAppartmentValue}
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

export default UpdatePayment
