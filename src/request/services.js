import axios from "axios";


export const getServices = async () => {
    try {
        return await axios.get(`/services`)
    } catch (error) {
        console.log(error.message);
    }
}

export const getServiceById = async (id) => {
    try {
        return await axios.get(`/services/${id}`)
    } catch (error) {
        console.log(error.message);
    }
}

