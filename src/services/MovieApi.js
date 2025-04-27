export default class MovieApi {
  _apiBase = 'https://api.themoviedb.org/3/search/movie?api_key=c2143fc2f39f8d18b2cff64a7be9b0e4';

  _apiTag = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c2143fc2f39f8d18b2cff64a7be9b0e4';

  _apiGuestSession =
    'https://api.themoviedb.org/3/authentication/guest_session/new?api_key=c2143fc2f39f8d18b2cff64a7be9b0e4';

  _apiRatedMovies = 'https://api.themoviedb.org/3/guest_session/';

  _apiRateMovie = 'https://api.themoviedb.org/3/movie/';

  async getMovieList(search, page = 1) {
    const res = await fetch(`${this._apiBase}&query=${search}&page=${page}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}, received ${res.status}`);
    }
    const data = await res.json();
    return data;
  }

  async getTagList() {
    const res = await fetch(this._apiTag);
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiTag}, received ${res.status}`);
    }
    const result = await res.json();
    return result.genres;
  }

  async newSession() {
    const res = await fetch(this._apiGuestSession);
    const data = await res.json();
    return data;
  }

  async rateMovie(sessionId, movieId, star) {
    const response = await fetch(
      `${this._apiRateMovie}${movieId}/rating?api_key=c2143fc2f39f8d18b2cff64a7be9b0e4&guest_session_id=${sessionId}`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(star),
      }
    );
    const result = await response.json();
    return result;
  }

  async getRatedMovies(sessionId, page = 1) {
    const res = await fetch(
      `${this._apiRatedMovies}${sessionId}/rated/movies?api_key=c2143fc2f39f8d18b2cff64a7be9b0e4&language=en-US&sort_by=created_at.asc&page=${page}`
    );
    if (!res.ok) {
      throw new Error(`Could not fetch ${this._apiBase}, received ${res.status}`);
    }
    const movies = await res.json();
    return movies;
  }
}
