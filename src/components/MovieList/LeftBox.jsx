import { useState } from "react";
import Box from "../Box";
import MovieListCard from "./MovieListCard";

export default function LeftBox({ movies, isLoading, isError, setSelectedId }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Box isOpen={isOpen} setIsOpen={setIsOpen}>
      {isOpen && (
        <>
          {isLoading && <div className="loader">Loading...</div>}
          {!isLoading && !isError && (
            <ul className="list list-movies">
              {movies?.map((v) => (
                <MovieListCard
                  key={v.imdbID}
                  movie={v}
                  setSelectedId={setSelectedId}
                />
              ))}
            </ul>
          )}
          {!isLoading && isError && (
            <div className="error">🎦 Movie not found</div>
          )}
        </>
      )}
    </Box>
  );
}
