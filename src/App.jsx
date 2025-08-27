import { useState } from "react";
import NavigationBar from "./components/NavigationBar";
import LeftBox from "./components/MovieList/LeftBox";
import RightBox from "./components/MovieInformation/RightBox";

const KEY = "4f153679";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  return (
    <div>
      <NavigationBar
        apikey={KEY}
        movies={movies}
        setMovies={setMovies}
        setIsLoading={setIsLoading}
        setIsError={setIsError}
      />
      <main className="main">
        <LeftBox
          movies={movies}
          isLoading={isLoading}
          isError={isError}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
        <RightBox
          selectedId={selectedId}
          setSelectedId={setSelectedId}
          apikey={KEY}
        />
      </main>
    </div>
  );
}

export default App;
