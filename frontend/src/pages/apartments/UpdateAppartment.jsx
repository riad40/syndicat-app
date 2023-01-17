import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../helpers/api"

function UpdateAppartment() {
    const params = useParams()

    const [data, setData] = useState({})
    const [floors, setFloors] = useState([])
    const [succ, setSucc] = useState()
    const [err, setErr] = useState()

    const token = localStorage.getItem("token")

    // get the specific appartment data
    const getAppartmentData = (id) => {
        api.get(`/appartements/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setData(response.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // console.log(data)

    const getFloors = () => {
        api.get("/appartements/floors", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setFloors(response.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        // get the specific appartment data
        getAppartmentData(params.appartment_id)
        // get all floors
        getFloors()
    }, [params.appartment_id])

    // handle input changes

    const inputHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    console.log(data)

    // update appartment
    const updateAppartment = (e) => {
        e.preventDefault()

        api.put(`/appartements/${params.appartment_id}`, data, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                setSucc(response.data.message)
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
                setErr(err.response?.data?.message)
            })
    }

    return (
        <>
            <div className="p-6 rounded bg-gray-700 w-2/4 mx-auto mt-5 bg-gray-800">
                <h1 className="text-2xl font-medium text-gray-300 text-center py-2">
                    Update Appartment
                </h1>
                <p className="text-center text-green-300">{succ}</p>
                <p className="text-center text-red-300">
                    {err && err.map((er) => er.msg + " " + er.param + " ")}
                </p>
                <form onSubmit={updateAppartment} className="w-full">
                    <div className="form-group mb-6">
                        <label htmlFor="">Appartment Number</label>
                        <input
                            type="number"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            placeholder="100dh"
                            value={data.appartementNumber}
                            name="appartementNumber"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="">Appartment Owner</label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-whitebg-clip-padding border border-solid border-gray-400 rounded transition ease-in-out m-0 focus:text-white focus:outline-none bg-gray-700"
                            placeholder="bokhari pakha"
                            value={data.appartementOwner}
                            name="appartementOwner"
                            onChange={inputHandler}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label
                            for="countries"
                            class="block mb-2 text-sm font-medium text-white"
                        >
                            Floor Number
                        </label>
                        <select
                            id="countries"
                            class="outline-none text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                            value={data.floorNumber?.floorNumber}
                            name="floorNumber"
                            onChange={inputHandler}
                        >
                            <option selected disabled>
                                Floor Number
                            </option>
                            {floors?.map((floor) => (
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

export default UpdateAppartment
