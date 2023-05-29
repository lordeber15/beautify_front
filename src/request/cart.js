import axios from "axios";


export const getCart = async (clientId) => {
    try {
        return await axios.get(`/savedCarts/${clientId}`)
    } catch (error) {
        console.log(error.message);
    }
}

export const postCart = async (clientId, products) => {
    try {
        return await axios.post(`/savedCarts/${clientId}`, products)
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteCart = async (clientId) => {
    try {
        return await axios.delete(`/savedCarts/${clientId}`)
    } catch (error) {
        console.log(error.message);
    }
};