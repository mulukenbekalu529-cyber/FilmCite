import Header from "./Components/Header/Header";
import Banner from "./Components/Banner/Banner";
import DisplayRow from "./Components/DisplayRow/DisplayRow";
import Footer from "./Components/Footer/Footer";

import requests from "./Utility/requestUrl";

function App() {
  return (
    <div className="app">
      <Header />

      <Banner />

      <DisplayRow title="Trending Now" fetchUrl={requests.fetchTrending} />

      <DisplayRow title="Top Rated" fetchUrl={requests.fetchTopRatedMovies} />

      <DisplayRow title="Action Movies" fetchUrl={requests.fetchActionMovies} />

      <DisplayRow title="Comedies" fetchUrl={requests.fetchComedyMovies} />

      <DisplayRow
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />

      <Footer />
    </div>
  );
}

export default App;
