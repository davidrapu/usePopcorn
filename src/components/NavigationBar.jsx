import { useEffect, useState } from "react";

export default function NavigationBar({ apikey, movies, setMovies, setIsLoading, setIsError }) {
  const [search, setSearch] = useState("");
  function handleSearch(e){
    setSearch(e.target.value)
  }
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      async function handleFetch() {
        try {
          setIsError(false);
          setIsLoading(true);
          if (search.length < 3) {
            setMovies([]);
            setIsError(false);
            return;
          }
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${apikey}&s=${search}`,
            { signal: controller.signal }
          );
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not Found");
          setMovies(data.Search || []);
        } catch(err) {
          if (err.name != "AbortError") {
            setIsError(true);
          }
        } finally {
          setIsLoading(false);
        }
      }
      handleFetch();
    }, 50); // wait 300ms after last keystroke

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);


  return (
    <div className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        placeholder="Search movies..."
        type="text"
        value={search}
        onChange={handleSearch}
      />
      <p className="num-results">Found {movies.length} results</p>
    </div>
  );
}
