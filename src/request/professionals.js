import axios from "axios";


export const getProfessionalById = async (id) => {
  try {
    return await axios.get(`/profesionals/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllProfessionals = async () => {
  try {
    return await axios.get(`/profesionals`);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProfessional = async (body) => {
  try {
    return await axios.post(`/profesionals`, body);
  } catch (error) {
    console.log(error.message);
  }
};
