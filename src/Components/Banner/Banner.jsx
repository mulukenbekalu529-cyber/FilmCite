import React, { useEffect, useState } from "react";
import { FaPlay, FaPlus } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import styles from "./Banner.module.css";
import BASE_URL from "../../Utility/MovieInstance.js";
import requests from "../../Utility/requestUrls.js";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);
  const [error, setError] = useState("");

  // Fetch a trending movie for the banner.
  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        setError("");

        const response = await BASE_URL.get(requests.fetchTrending);
        const data = response.data;

        if (data.results && data.results.length > 0) {
          const randomMovie =
            data.results[Math.floor(Math.random() * data.results.length)];

          setMovie(randomMovie);
        } else {
          setError("No movies are available right now.");
        }
      } catch (error) {
        console.error("Banner API Error:", error);
        setError("Unable to load movies. Please try again later.");
      }
    };

    fetchBannerMovie();
  }, []);

  // Check whether the banner movie is already in My List.
  useEffect(() => {
    if (!movie) return;

    try {
      const savedMovies = JSON.parse(localStorage.getItem("myList") || "[]");

      setIsInMyList(savedMovies.some((item) => item.id === movie.id));
    } catch (error) {
      console.error("Could not read My List:", error);
      setIsInMyList(false);
    }
  }, [movie]);

  // Open the movie or TV show details on TMDB.
  const handlePlay = () => {
    if (!movie) return;

    const mediaType = movie.media_type === "tv" || movie.name ? "tv" : "movie";

    const movieUrl = `https://www.themoviedb.org/${mediaType}/${movie.id}`;

    window.open(movieUrl, "_blank", "noopener,noreferrer");
  };

  // Add the banner movie to My List or remove it if already saved.
  const handleMyList = () => {
    if (!movie) return;

    try {
      const savedMovies = JSON.parse(localStorage.getItem("myList") || "[]");

      const alreadySaved = savedMovies.some((item) => item.id === movie.id);

      const updatedMovies = alreadySaved
        ? savedMovies.filter((item) => item.id !== movie.id)
        : [...savedMovies, movie];

      localStorage.setItem("myList", JSON.stringify(updatedMovies));

      setIsInMyList(!alreadySaved);
    } catch (error) {
      console.error("Could not update My List:", error);
      alert("Unable to update My List. Please try again.");
    }
  };

  if (!movie) {
    return (
      <section className={styles.banner}>
        <div className={styles.loading}>{error || "Loading..."}</div>
      </section>
    );
  }

  const title = movie.title || movie.name || movie.original_name || "Untitled";

  const description = movie.overview || "";

  const shouldTruncate = description.length > 150 && !isExpanded;

  const finalDescription = shouldTruncate
    ? description.slice(0, 150) + "..."
    : description;

  return (
    <section
      className={styles.banner}
      style={{
        backgroundImage: movie.backdrop_path
          ? `url(${IMAGE_BASE_URL}${movie.backdrop_path})`
          : "none",
      }}
    >
      <div className={styles.overlay}></div>

      <div className={styles.bannerContent}>
        <p className={styles.netflix}>Netflix</p>

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.description}>
          {finalDescription}

          {description.length > 150 && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={styles.moreLink}
              aria-expanded={isExpanded}
            >
              {isExpanded ? " Less" : " More"}
            </button>
          )}
        </p>

        <div className={styles.buttons}>
          <button
            type="button"
            className={styles.playButton}
            onClick={handlePlay}
            aria-label={`View details for ${title}`}
          >
            <FaPlay />
            <span>Play</span>
          </button>

          <button
            type="button"
            className={styles.myListButton}
            onClick={handleMyList}
            aria-pressed={isInMyList}
          >
            {isInMyList ? <GoCheckCircleFill /> : <FaPlus />}

            <span>{isInMyList ? "Added to My List" : "My List"}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
