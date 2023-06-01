import { useSelector } from "react-redux";
import { useState } from "react";
import styles from "./Home.module.css";
import "@splidejs/react-splide/css";
import SectionCards from "../../components/sectionCards/SectionCards";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ima3 from "../../assets/images/Banner1.webp";
import ima4 from "../../assets/images/Banner2.webp";
import ima5 from "../../assets/images/Banner3.webp";
import { Skeleton } from "@mui/material";

function Home() {
  const images = [ima3, ima4, ima5];
  const allProducts = useSelector((state) => state.allProducts);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className={styles.Container}>
      <div className={styles.contenedorSlider}>
        <div className={styles.btnIzquierda} onClick={handlePrevious}>
          <KeyboardDoubleArrowLeftIcon />
        </div>
        <div className={styles.sliderScreen}>
          {images ? (
            <img
              id="CollectionImagen"
              className={styles.imagen}
              src={images[currentImageIndex]}
              alt="Image"
            />
          ) : (
            <Skeleton
              sx={{ height: 390, width: 390 }}
              animation="wave"
              variant="rectangular"
            />
          )}
        </div>
        <div className={styles.btnDerecha} onClick={handleNext}>
          <KeyboardDoubleArrowRightIcon />
        </div>

        {/* {products.length ? (
          <Splide
            aria-label="My Favorite Images"
            options={{
              type: "loop",
              fixedWidth: "50 vw",
              fixedHeight: "50vw",
              perPage: 3,
              focus: "center",
              gap: "1rem",
              arrows: true,
              arrowPath: "",
              pagination: true,
              // lazyLoad:'nearby',
              classes: {
                arrows: "splide__arrows customArrows",
                arrow: "splide__arrow customArrow",
                prev: "splide__arrow--prev customPrevArrow",
                next: "splide__arrow--next customNextArrow",
              },
            }}
          >
            {products.map((elem, index) => (
              <SplideSlide className={styles.splideSlide} key={index}>
                <PromoCard image={elem.image} id={elem.id} name={elem.name} />
              </SplideSlide>
            ))}
          </Splide>
        ) : (
          <div>waiting...</div>
        )} */}
      </div>
      <h2 className={styles.description}>
        Take a look at the best prices in town!
      </h2>
      {allProducts && (
        <SectionCards
          nameSection={"Most populars"}
          arrayProducts={allProducts}
          populars={true}
        />
      )}
      {allProducts && (
        <SectionCards
          nameSection={"Pencil"}
          arrayProducts={allProducts}
          category={"Pencil"}
          isCategory={true}
        />
      )}
    </div>
  );
}

export default Home;
