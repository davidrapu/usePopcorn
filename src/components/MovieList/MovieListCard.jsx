export default function MovieListCard({ movie, setSelectedId }) {
  function handleSelection() {
    setSelectedId(movie.imdbID);
  }
  return (
    <li onClick={handleSelection}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓️</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
