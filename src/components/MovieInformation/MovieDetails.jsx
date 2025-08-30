import { useState, useEffect } from "react";
import Stars from "../Stars";
import Button from "../Button";

export default function MovieDetails({
  id,
  apikey,
  setSelectedId,
  setWatchedMovies,
  watchedMovies,
  rating,
  setRating,
  setLocalStorage
}) {
  // States
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Variables
  const existingMovie = watchedMovies.find(
    (movieObj) => movieObj.imdbID === id
  );

  // Handelers
  function handleClosure() {
    setSelectedId(null);
    setSelectedMovie(null);
  }

  function handleAddWatched() {

    const movieObj = {
      imdbID: selectedMovie.imdbID,
      Title: selectedMovie.Title,
      Year: selectedMovie.Year,
      Poster: selectedMovie.Poster,
      runtime: Number(selectedMovie.Runtime.split(" ")[0]),
      imdbRating: Number(selectedMovie.imdbRating),
      userRating: Number(rating),
    };

    setWatchedMovies(watched => {
      const newWatched = [...watched, movieObj];
      setLocalStorage(newWatched)
      return newWatched
    })


    setSelectedId(null)
    setRating(0)
  }

  useEffect(() => {
    const controller = new AbortController()
    async function fetchMovie() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${apikey}&i=${id}`, {signal: controller.signal}
      );
      const data = await res.json();

      setIsLoading(false);
      setSelectedMovie(data);
    }

    fetchMovie();

    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  // console.log(selectedMovie)
  useEffect(() => {
    document.title =  `Movie | ${selectedMovie?.Title || ''}`
    return () => {
      document.title = 'usePopcorn'
    }
  }, [selectedMovie])

  return isLoading ? (
    <div className="loader"> Loading... </div>
  ) : (
    <div className="details">
      <header>
        <Button className="btn-back" onClick={handleClosure}>
          {" "}
          ⬅{" "}
        </Button>
        {selectedMovie && (
          <>
            <img src={selectedMovie.Poster} alt={selectedMovie.Title} />
            <div className="details-overview">
              <h2> {selectedMovie.Title} </h2>
              <p>
                {" "}
                {selectedMovie.Released} &bull; {selectedMovie.Runtime}{" "}
              </p>
              <p> {selectedMovie.Genre} </p>
              <p>⭐ {selectedMovie.imdbRating} IMDB rating</p>
            </div>
          </>
        )}
      </header>
      <section>
        <div className="rating">
          { existingMovie === undefined ?
            <Stars maxRating={10} size={25} rating={rating} setRating={setRating} />
            :
            <p>You rated with movie {existingMovie.userRating}⭐</p>
          }
        { rating > 0 &&
            <Button className="btn-add" onClick={handleAddWatched}>
            + Add to List
            </Button>
        }
        </div>
        <p> {selectedMovie?.Plot} </p>
        <p>Staring {selectedMovie?.Actors} </p>
        <p>Directed by {selectedMovie?.Director} </p>
      </section>
    </div>
  );
}