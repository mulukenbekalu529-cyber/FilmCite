import React from "react";
import styles from "./MovieCard.module.css";

import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";

function MovieCard({ movie }) {
  // Prevent error if movie is undefined or null
  if (!movie) {
    return null;
  }

  const genres = ["Adventure", "Action", "Thriller"];

  // TMDB poster URL
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  // Movie title or TV show name
  const movieTitle = movie.title || movie.name || "Movie";

  return (
    <div className={styles.cardWrapper}>
      {/* Base Poster */}
      {posterUrl ? (
        <img className={styles.poster} src={posterUrl} alt={movieTitle} />
      ) : (
        <div className={styles.noPoster}>No Image</div>
      )}

      {/* Hover Card */}
      <div className={styles.hoverCard}>
        {/* Movie Image */}
        <div className={styles.imageWrapper}>
          {posterUrl ? (
            <img src={posterUrl} alt={movieTitle} />
          ) : (
            <div className={styles.noPoster}>No Image</div>
          )}

          <div className={styles.badge}>Recently Added</div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonRow}>
          <FaCirclePlay
            className={styles.circleButton}
            color="white"
            size={32}
          />

          <BsPlusCircle
            className={styles.circleButton}
            color="white"
            size={32}
          />

          <GoCheckCircleFill
            className={styles.circleButton}
            color="white"
            size={32}
          />

          <IoIosArrowDropdownCircle
            className={styles.circleButtonSmall}
            color="white"
            size={32}
          />
        </div>

        {/* Metadata */}
        <div className={styles.metadataRow}>
          <span className={styles.tag}>U/A 16+</span>
          <span className={styles.tag}>Movies</span>
          <span className={styles.tag}>HD</span>
        </div>

        {/* Genres */}
        <div className={styles.genres}>
          {genres.map((genre, index) => (
            <span key={genre}>
              {genre}

              {index < genres.length - 1 && (
                <span className={styles.dot}> • </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
