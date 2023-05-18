import axios from "axios";

// const URL_BASE = "http://localhost:3001";

export const getCategories = async () => {
  try {
    return await axios.get(`/categories`);
  } catch (error) {
    console.log(error.message);
  }
};
