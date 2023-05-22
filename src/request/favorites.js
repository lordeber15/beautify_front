import axios from "axios";

export const getFavorites = async (clientId) => {
  try {
    return await axios.get(`/favorites/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const createFavorite = async (clientId, productId) => {
  try {
    const response = await axios.get(`/favorites/${clientId}`);
    const allClientFavorites = response.data;

    for (const product of allClientFavorites) {
      if (product.id === Number(productId))
        throw Error("Product alredy in Favorites");
    }

    await axios.post(`/favorites`, {
      clientId,
      productId,
    });

    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
};

export const deleteFavorite = async (clientId, productId) => {
  try {
    await axios.delete(`${URL_BASE}/favorites/${clientId}/${productId}`, {
      clientId,
      productId,
    });
  } catch (error) {
    console.log(error.message);
  }
};
