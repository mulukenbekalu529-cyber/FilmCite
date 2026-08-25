import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./SlideShow.module.css";
import MovieCard from "../MovieCard/MovieCard";

function SlideShow({ title, movies }) {
  // Prevent errors if movies is undefined
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className={styles.slideShow}>
      <h2 className={styles.title}>{title}</h2>

      <Swiper
        modules={[Navigation]}
        navigation
        slidesPerView={"auto"}
        slidesPerGroup={6}
        spaceBetween={24}
        className={styles.swiper}
      >
        {movies.map((movie) => {
          // Skip invalid movie objects
          if (!movie || !movie.id) {
            return null;
          }

          return (
            <SwiperSlide key={movie.id} className={styles.slide}>
              <MovieCard movie={movie} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SlideShow;
