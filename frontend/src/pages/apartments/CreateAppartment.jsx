import { useState, useEffect } from "react"
import { api } from "../../helpers/api"

function CreateAppartment() {
    const [data, setData] = useState({})
    const [err, setErr] = useState("")
    const [succ, setSucc] = useState("")
    const [floors, setFloors] = useState([])

    const inputHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const token = localStorage.getItem("token")

    useEffect(() => {
        api.get("/appartements/floors", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setFloors(response.data.data)
            })
            .catch((err) => {
                setErr(err.response?.data)
                console.log(err)
            })
    }, [])

    const createAppartment = (e) => {
        e.preventDefault()

        api.post("/appartements", data, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setSucc(response.data.message)
                // console.log(response)
            })
            .catch((err) => {
                setErr(err.response?.data?.message)
                console.log(err)
            })
    }

    return (
        <>
            <div className="p-6 rounded bg-gray-700 w-2/4 mx-auto mt-5 bg-gray-800">
                <h1 className="text-2xl font-medium text-gray-300 text-center py-2">
                    Create New Appartment
                </h1>
                <p className="text-center text-green-300">{succ}</p>
                <p className="text-center text-red-300">
                    {err && err.map((er) => er.msg + " " + er.param + " ")}
                </p>
                <form onSubmit={createAppartment} className="w-full">
                    <div className="form-group mb-6">
                        <label htmlFor="">Appartment Number</label>
                        <input
                            type="number"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            placeholder="2"
                            name="appartementNumber"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="">Appartment Owner</label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-whitebg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            placeholder="test"
                            name="appartementOwner"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label
                            Htmlfor="flornumber"
                            class="block mb-2 text-sm font-medium text-white"
                        >
                            Floor Number
                        </label>
                        <select
                            id="floornumber"
                            class="outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            name="floorNumber"
                            onChange={inputHandler}
                        >
                            <option selected disabled>
                                Select Floor Number
                            </option>
                            {floors.map((floor) => (
                                <option value={floor.floorNumber}>
                                    {floor.floorNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs rounded shadow-md hover:bg-blue-700 hover:shadow-lg foc:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </>
    )
}

export default CreateAppartment
