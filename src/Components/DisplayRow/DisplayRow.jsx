import React, { useEffect, useState } from "react";
import styles from "./DisplayRow.module.css";
import SlideShow from "../SlideShow/SlideShow";
import BASE_URL from "../../Utility/MovieInstance.js";
import requests from "../../Utility/requestUrls.js";

function DisplayRow() {
  const [movies, setMovies] = useState({
    trending: [],
    filmCiteOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const [
        trendingRes,
        filmCiteOriginalsRes,
        topRatedRes,
        actionRes,
        comedyRes,
        horrorRes,
        romanceRes,
        docRes,
      ] = await Promise.all([
        BASE_URL.get(requests.fetchTrending),
        BASE_URL.get(requests.fetchFilmCiteOriginals),
        BASE_URL.get(requests.fetchTopRatedMovies),
        BASE_URL.get(requests.fetchActionMovies),
        BASE_URL.get(requests.fetchComedyMovies),
        BASE_URL.get(requests.fetchHorrorMovies),
        BASE_URL.get(requests.fetchRomanceMovies),
        BASE_URL.get(requests.fetchDocumentaries),
      ]);
      setMovies({
        trending: trendingRes.data.results,
        filmCiteOriginals: filmCiteOriginalsRes.data.results,
        topRated: topRatedRes.data.results,
        action: actionRes.data.results,
        comedy: comedyRes.data.results,
        horror: horrorRes.data.results,
        romance: romanceRes.data.results,
        documentaries: docRes.data.results,
      });
    } catch (error) {
      console.log("API ERROR:", error);
      console.log("Response:", error.response?.data);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <SlideShow title="FilmCite Trending" movies={movies?.trending} />

      <SlideShow
        title="Popular on FilmCite"
        movies={movies?.filmCiteOriginals}
      />

      <SlideShow title="Action" movies={movies?.action} />

      <SlideShow title="Top Rated" movies={movies?.topRated} />
    </div>
  );
}

export default DisplayRow;
