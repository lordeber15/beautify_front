import axios from "axios";


export const getCommentsByClient = async (clientId) => {
  try {
    return await axios.get(`/comments/client/${clientId}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProductComment = async (
  { tittle, rating, content },
  productId,
  userId
) => {
  try {
    return await axios.post(
      `/comments/products/${productId}/${userId}`,
      {
        tittle,
        rating,
        content,
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const createServiceComment = async (form, serviceId, userId) => {
  try {
    return await axios.post(
      `/comments/services/${serviceId}/${userId}`,
      form
    );
  } catch (error) {
    console.log(error.message);
  }
};

export const updateComment = async ({ tittle, rating, content }, commentId) => {
  try {
    return await axios.put(`/comments/${commentId}`, {
      tittle,
      rating,
      content,
    });
  } catch (error) {
    console.log(error.message);
  }
};
