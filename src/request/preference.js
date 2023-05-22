import axios from "axios";


export default async function askPreference(props) {
  try {
    return await axios.post(`/mercadopago/create_preference`, props);
  } catch (error) {
    console.log(error.message);
  }
}
