import Box from "../Box";
import { useState } from "react";
import MovieDetails from "./MovieDetails";
import WatchedMovieCard from "./WatchedMovieCard";
import Summary from "./Summary";

export default function RightBox({ selectedId, setSelectedId, apikey }) {
  const [watchedMovies, setWatchedMovies] = useState(getLocalStorage);
  const [isOpen, setIsOpen] = useState(true);
  const [rating, setRating] = useState(0);

  function setLocalStorage(watchedMoviesList) {
    localStorage.setItem(
      "watchedMoviesList",
      JSON.stringify(watchedMoviesList)
    );
  }
  function getLocalStorage() {
    const local = localStorage.getItem("watchedMoviesList");
    return local ? JSON.parse(local) : [];
  }
  return (
    <Box isOpen={isOpen} setIsOpen={setIsOpen}>
      {isOpen &&
        (selectedId ? (
          <MovieDetails
            id={selectedId}
            apikey={apikey}
            setSelectedId={setSelectedId}
            setWatchedMovies={setWatchedMovies}
            watchedMovies={watchedMovies}
            rating={rating}
            setRating={setRating}
            setLocalStorage={setLocalStorage}
          />
        ) : (
          <>
            <Summary watchedMovies={watchedMovies} />
            <ul className="list">
              {watchedMovies?.map((m) => (
                <WatchedMovieCard key={m.imdbID} movie={m} />
              ))}
            </ul>
          </>
        ))}
    </Box>
  );
}
