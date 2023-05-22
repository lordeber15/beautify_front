import axios from "axios";


export const getCategories = async () => {
    try {
        return await axios.get(`/categories`)
    } catch (error) {
        console.log(error.message);
    }
}