import axios from "axios";


export const createNewClient = async (clientData) => {
  try {
    return await axios.post(`/client/findOrCreate`, clientData);
  } catch (error) {
    console.log(error.message);
  }
};
export const getClient = async (mail) => {
  try {
    return await axios.get(`/client/${mail}`);
  } catch (error) {
    console.log(error.message);
  }
};
export const postFindOrCreate = async (userData) => {
  try {
    return await axios.post(`/client/findOrCreate`, userData);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateClient = async (data, id) => {
  try {
    const dataToUpdate = {};
    for (const property in data) {
      if (data[property]) dataToUpdate[property] = data[property];
    }
    return await axios.put(`/client/${id}`, dataToUpdate);
  } catch (error) {
    console.log(error.message);
  }
};
