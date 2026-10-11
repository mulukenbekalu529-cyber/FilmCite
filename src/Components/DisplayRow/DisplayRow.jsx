import React, { useEffect, useState } from "react";
import styles from "./DisplayRow.module.css";
import SlideShow from "../SlideShow/SlideShow";
import BASE_URL from "../../Utility/MovieInstance";
import requests from "../../Utility/requestUrls.js";

function DisplayRow() {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
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
        netflixRes,
        topRatedRes,
        actionRes,
        comedyRes,
        horrorRes,
        romanceRes,
        docRes,
      ] = await Promise.all([
        BASE_URL.get(requests.fetchTrending),
        BASE_URL.get(requests.fetchNetflixOriginals),
        BASE_URL.get(requests.fetchTopRatedMovies),
        BASE_URL.get(requests.fetchActionMovies),
        BASE_URL.get(requests.fetchComedyMovies),
        BASE_URL.get(requests.fetchHorrorMovies),
        BASE_URL.get(requests.fetchRomanceMovies),
        BASE_URL.get(requests.fetchDocumentaries),
      ]);
      setMovies({
        trending: trendingRes.data.results,
        netflixOriginals: netflixRes.data.results,
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
      <SlideShow title="Netflix Trending" movies={movies?.trending} />

      <SlideShow title="Popular on Netflix" movies={movies?.netflixOriginals} />

      <SlideShow title="Action" movies={movies?.action} />

      <SlideShow title="Top Rated" movies={movies?.topRated} />
    </div>
  );
}

export default DisplayRow;
