import React from "react";
import { useState } from "react";
import styles from "./MovieCard.module.css";

import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const GENRE_MAP = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
};

function MovieCard({ movie }) {
  const [isInMyList, setIsInMyList] = useState(() => {
    const savedMovies = JSON.parse(localStorage.getItem("myList") || "[]");
    return savedMovies.some((item) => item.id === movie?.id);
  });

  const handleMyList = () => {
    const savedMovies = JSON.parse(localStorage.getItem("myList") || "[]");

    if (isInMyList) {
      const updatedMovies = savedMovies.filter((item) => item.id !== movie.id);
      localStorage.setItem("myList", JSON.stringify(updatedMovies));
      setIsInMyList(false);
    } else {
      const updatedMovies = [...savedMovies, movie];
      localStorage.setItem("myList", JSON.stringify(updatedMovies));
      setIsInMyList(true);
    }
  };
  const title = movie?.title || movie?.name || "Untitled";

  const mediaType =
    movie?.media_type === "tv" || movie?.name ? "TV Show" : "Movie";

  const genres =
    movie?.genre_ids
      ?.map((id) => GENRE_MAP[id])
      .filter(Boolean)
      .slice(0, 3) || [];

  const image = movie?.poster_path
    ? `${IMAGE_BASE}${movie.poster_path}`
    : "/placeholder.jpg";

  return (
    <div className={styles.cardWrapper}>
      {/* Main Movie Poster */}
      <img className={styles.poster} src={image} alt={title} />

      {/* Hover Card */}
      <div className={styles.hoverCard}>
        {/* Hover Image */}
        <img className={styles.hoverImage} src={image} alt={title} />

        {/* Movie Title */}
        <h3 className={styles.cardTitle}>{title}</h3>

        {/* Buttons */}
        <div className={styles.buttonsRow}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={`Play ${title}`}
            onClick={() => {
              const mediaType =
                movie?.media_type === "tv" || movie?.name ? "tv" : "movie";

              window.open(
                `https://www.themoviedb.org/${mediaType}/${movie.id}`,
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            <FaCirclePlay />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label={isInMyList ? "Remove from list" : "Add to list"}
            onClick={handleMyList}
          >
            {isInMyList ? <GoCheckCircleFill /> : <BsPlusCircle />}
          </button>

          <button type="button" className={styles.iconButton} aria-label="Like">
            <GoCheckCircleFill />
          </button>

          <button
            type="button"
            className={styles.iconButtonSmall}
            aria-label="More information"
          >
            <IoIosArrowDropdownCircle />
          </button>
        </div>

        {/* Movie Metadata */}
        <div className={styles.metaRow}>
          <span className={styles.tag}>{movie?.adult ? "18+" : "U/A 16+"}</span>

          <span className={styles.tag}>{mediaType}</span>

          <span className={styles.tag}>HD</span>
        </div>

        {/* Genres */}
        <div className={styles.genres}>
          {genres.length > 0
            ? genres.map((genre, index) => (
                <span key={genre}>
                  {genre}
                  {index < genres.length - 1 && (
                    <span className={styles.dot}>•</span>
                  )}
                </span>
              ))
            : "Genre unavailable"}
        </div>
        {movie?.overview && <p className={styles.overview}>{movie.overview}</p>}
      </div>
    </div>
  );
}

export default MovieCard;
