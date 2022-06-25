import axios from "axios"
const url = "https://pokeapi.co/api/v2/pokemon"


export const get = async () => {
    const data = await axios.get(url)
    return data.data
}