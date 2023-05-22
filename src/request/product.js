import axios from "axios";

export const getProductByName = async (searched) => {
    try {
        return await axios.get(`/products?name=${searched}`)
    } catch (error) {
        console.log(error.message);
    }
}
export const getProductById = async (id) => {
    try {
        return await axios.get(`/products/${Number(id)}`)
    } catch (error) {
        console.log(error.message);
    }
}

export const getProducts = async () => {
    try {
        return await axios.get(`/products`)
    } catch (error) {
        console.log(error.message);
    }
};
export const createProduct = async (product) => {
    try {
        return await axios.post(`/products`, product)
    } catch (error) {
        console.log(error.message);
    }
};
