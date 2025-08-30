import Button from "../Button";
export default function WatchedMovieCard({ movie, setWatchedMovies }) {
  function handleMovieDeletion(){
    setWatchedMovies(watchedMovies => watchedMovies.filter(movieObj => movieObj.imdbID != movie.imdbID))
  }
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating || 0}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime || 0} min</span>
        </p>
        <Button className='btn-delete' onClick={handleMovieDeletion}>
          ✖️
        </Button>
      </div>
    </li>
  );
}
