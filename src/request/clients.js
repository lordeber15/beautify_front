import axios from "axios";

// const URL_BASE = "http://localhost:3001";

export const createNewClient = async (clientData) => {
  try {
    return await axios.post(`/client`, clientData);
  } catch (error) {
    console.log(error.message);
  }
};
