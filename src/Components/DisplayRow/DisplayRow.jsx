import React, { useEffect, useState } from "react";
import styles from "./DisplayRow.module.css";
import SlideShow from "../SlideShow/SlideShow";
import movieinstance from "../../Utility/movieInstance";

function DisplayRow({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await movieinstance.get(fetchUrl);

        if (response.data && response.data.results) {
          setMovies(response.data.results);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchData();
  }, [fetchUrl]);

  if (movies.length === 0) {
    return null;
  }

  return (
    <div className={styles.mainWrapper}>
      <SlideShow title={title} movies={movies} />
    </div>
  );
}

export default DisplayRow;
