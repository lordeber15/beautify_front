import { useDispatch, useSelector } from "react-redux";
import { resetFiltersOrder, searchProductByName } from "../../redux/actions";
import { useState } from "react";
import handlerSearch from "../../handlers/handleSearch";
import handlerChange from "../../handlers/handleChange";
import styles from "./SearchBar.module.css";

function SearchBar({ setCurrentPage, setFilter, setOrdered }) {
  const copyProducts = useSelector((state) => state.allProducts);
  const [searched, setSearched] = useState("");
  const dispatch = useDispatch();
  const handlerReset = () => {
    setFilter({
      category: "all",
      price: [1, 1000],
    });
    setOrdered("");
    setSearched("");
    dispatch(resetFiltersOrder(copyProducts));
  };
  return (
    <div className={styles.Container}>
      <form
        onSubmit={(e) => {
          handlerSearch(
            e,
            searched,
            dispatch,
            searchProductByName,
            setCurrentPage,
            setSearched
          );
        }}
      >
        <input
          className={styles.input}
          type="search"
          value={searched}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handlerSearch(
                e,
                searched,
                dispatch,
                searchProductByName,
                setCurrentPage,
                setSearched
              );
            }
          }}
          onChange={(e) => {
            handlerChange(e, setSearched);
          }}
          placeholder="Nail polish..."
        />
        <button className={styles.buttonSubmit} type="submit">
          Search
        </button>
        <button
          className={styles.buttonReset}
          onClick={(e) => {
            e.preventDefault();
            handlerReset();
          }}
        >
          View all
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
