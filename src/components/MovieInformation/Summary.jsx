export default function Summary({ watchedMovies }) {
  const avgImdbRating =
    average(watchedMovies.map((movie) => movie.imdbRating)) || 0;
  const avgUserRating =
    average(watchedMovies.map((movie) => movie.userRating)) || 0;
  const avgRuntime = average(watchedMovies.map((movie) => movie.runtime)) || 0;

  //
  function average(arr) {
    return arr.reduce((acc, num) => num + acc, 0) / arr.length;
  }
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watchedMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Math.round(avgImdbRating * 10) / 10}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.round(avgUserRating * 10) / 10}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.round(avgRuntime * 10) / 10} min</span>
        </p>
      </div>
    </div>
  );
}
