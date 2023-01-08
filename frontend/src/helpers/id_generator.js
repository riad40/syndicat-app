import { v4 as uuid } from "uuid"

const generateUniqId = () => {
    let uniqId = uuid()
    return uniqId
}

export { generateUniqId }
