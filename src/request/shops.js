import axios from "axios";


export const cancelShop = async (shopId) => {
  try {
    return await axios.delete(`/shops/${shopId}`);
  } catch (error) {
    console.log(error.message);
  }
};
