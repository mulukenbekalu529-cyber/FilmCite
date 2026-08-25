const API_KEY = "6996c85c027fee7957b67c53f890825c";

const requests = {
  fetchTrending: "/trending/all/week?language=en-US",

  fetchNetflixOriginals: "/discover/tv?with_networks=213",

  fetchTopRatedMovies: "/movie/top_rated?language=en-US",

  fetchActionMovies: "/discover/movie?with_genres=28",

  fetchComedyMovies: "/discover/movie?with_genres=35",

  fetchHorrorMovies: "/discover/movie?with_genres=27",

  fetchRomanceMovies: "/discover/movie?with_genres=10749",

  fetchDocumentaries: "/discover/movie?with_genres=99",
};

export default requests;
