import { useEffect, useState } from "react";
import axios from "axios";

const useGetProducts = () => {
  const [data, setData] = useState([]);
  const getProducts = () => {
    axios
      .get(`/products`)
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    getProducts();
  }, []);

  return [data];
};

export default useGetProducts;
