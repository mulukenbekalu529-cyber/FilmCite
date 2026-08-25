import React, { useEffect, useState } from "react";
import styles from "./Banner.module.css";
import { Play, Info } from "lucide-react";

import movieinstance from "../../Utility/movieInstance";
import requests from "../../Utility/requestUrl";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchBannerMovie() {
      try {
        const response = await movieinstance.get(
          requests.fetchNetflixOriginals,
        );

        const results = response.data.results;

        if (results && results.length > 0) {
          const randomMovie =
            results[Math.floor(Math.random() * results.length)];

          setMovie(randomMovie);
        }
      } catch (error) {
        console.error("Error fetching banner movie:", error);
      }
    }

    fetchBannerMovie();
  }, []);

  if (!movie) {
    return null;
  }

  const truncate = (text, max = 150) => {
    if (!text) return "";

    return text.length > max ? text.substring(0, max) + "..." : text;
  };

  const backgroundImage = movie.backdrop_path
    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    : "none";

  return (
    <div
      className={styles.banner}
      style={{
        backgroundImage: backgroundImage,
      }}
    >
      <div className={styles.contents}>
        <h1 className={styles.title}>{movie.title || movie.name}</h1>

        <p className={styles.description}>{truncate(movie.overview)}</p>

        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <Play size={24} />
            <span>Play</span>
          </button>

          <button className={styles.button}>
            <Info size={24} />
            <span>More Info</span>
          </button>
        </div>
      </div>

      <div className={styles.fadeBottom} />
    </div>
  );
}

export default Banner;
