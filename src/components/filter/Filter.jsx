import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { Box, Slider } from "@mui/material";
import { filterProducts, getAllCategories } from "../../redux/actions";
import styles from "./Filter.module.css";
import { useEffect } from "react";
import { getCategories } from "../../request/category";

function valuetext(value) {
  return `$ ${value}`;
}

function Filter({ setFilter, filter, setCurrentPage }) {
  const dispatch = useDispatch();

  const allCategories = useSelector((state) => state.allCategories);
  useEffect(() => {
    getCategories().then((res) => {
      dispatch(getAllCategories(res.data));
    });
  }, [dispatch]);
  const handleChangeFilter = (e, newValue) => {
    if (e.target.name === "price") {
      setFilter({ ...filter, price: newValue });
      dispatch(filterProducts({ ...filter, price: newValue }));
    } else {
      setFilter({
        ...filter,
        [e.target.name]: e.target.value,
      });
      dispatch(filterProducts({ ...filter, [e.target.name]: e.target.value }));
    }
    setCurrentPage(1);
  };
  return (
    <div className={styles.Container}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Categories
        </InputLabel>
        <Select
          className={styles.selectCategories}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter.category}
          name="category"
          onChange={handleChangeFilter}
        >
          <MenuItem value={"all"} name="category">
            every
          </MenuItem>
          {allCategories?.map((category, index) => {
            return (
              <MenuItem key={index} value={category} name="category">
                {category}
              </MenuItem>
            );
          })}
        </Select>
        <Box className={styles.boxSlider} sx={{ width: 300 }}>
          <Slider
            className={styles.Slider}
            getAriaLabel={() => "Temperature range"}
            value={filter.price}
            onChange={handleChangeFilter}
            name="price"
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>{`$ ${filter.price[0]}`}</p>
            <p>{`$ ${filter.price[1]}`}</p>
          </div>
        </Box>
      </FormControl>
    </div>
  );
}

export default Filter;
