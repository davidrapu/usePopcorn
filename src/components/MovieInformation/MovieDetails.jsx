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
  setRating
}) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function handleClosure() {
    setSelectedId(null);
    setSelectedMovie(null)
  }

  function handleAddWatched() {

    const existingMovie = watchedMovies.find(
      (movieObj) => movieObj.imdbID === id
    );

    const movieObj = {
      imdbID: selectedMovie.imdbID,
      Title: selectedMovie.Title,
      Year: selectedMovie.Year,
      Poster: selectedMovie.Poster,
      runtime: Number(selectedMovie.Runtime.split(" ")[0]),
      imdbRating: Number(selectedMovie.imdbRating),
      userRating: Number(rating),
    };

    if (existingMovie != undefined) {
        setWatchedMovies((watched) => {
            const newWatched = [...watched.filter((movieObj => movieObj.imdbID != id)), movieObj]
            return newWatched
        })
    }else{
        setWatchedMovies((watched) => [...watched, movieObj]);
    }
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
          <Stars maxRating={10} size={25} rating={rating} setRating={setRating} />

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