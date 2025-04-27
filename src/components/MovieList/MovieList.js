import { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';

import Movie from '../Movie';
import './MovieList.css';
import MovieApi from '../../services/MovieApi';

export default class MovieList extends Component {
  movies = new MovieApi();

  state = {
    data: [],
    loading: false,
    error: false,
    emptySearchLine: true,
    page: 1,
    totalResults: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { page } = this.state;
    if (search !== prevProps.search) {
      if (!search) {
        this.setState({ emptySearchLine: true, data: [], error: false, totalResults: 0 });
      } else {
        this.setState({ loading: true });
        this.movies
          .getMovieList(search, page)
          .then((data) => {
            this.setState({
              data: data.results,
              loading: false,
              error: false,
              emptySearchLine: false,
              totalResults: data.total_results,
              page: 1,
            });
          })
          .catch(this.onError);
      }
    }
    if (page !== prevState.page) {
      this.setState({ loading: true });
      this.movies
        .getMovieList(search, page)
        .then((data) => {
          this.setState({
            data: data.results,
            loading: false,
            error: false,
            emptySearchLine: false,
            totalResults: data.total_results,
          });
        })
        .catch(this.onError);
    }
  }

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  changePage = (page) => {
    this.setState({ page });
  };

  render() {
    const { data, loading, error, emptySearchLine, page, totalResults } = this.state;
    const { idSession, rateMovie } = this.props;
    // console.log(idSession);
    const errorMessage = error ? (
      <Alert message="Ошибка" description="Что-то пошло не так. Исправим в ближайшее время." type="error" showIcon />
    ) : null;
    const emptySearch = emptySearchLine && !error ? <Alert message="Введите название фильма." type="info" /> : null;
    const noMatches =
      data.length === 0 && !emptySearch && !error ? (
        <Alert message="Таких фильмов не найдено. Проверьте название." type="info" />
      ) : null;
    return (
      <div>
        {noMatches}
        {emptySearch}
        {errorMessage}
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <ul className="movieList">
              {data.map((movie) => {
                return (
                  <Movie
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    overview={movie.overview}
                    poster={movie.poster_path}
                    tagID={movie.genre_ids}
                    star={movie.rating}
                    rating={movie.vote_average}
                    id={movie.id}
                    idSession={idSession}
                    rateMovie={rateMovie}
                  />
                );
              })}
            </ul>
            <Pagination
              current={page}
              total={totalResults}
              onChange={this.changePage}
              showSizeChanger={false}
              hideOnSinglePage
              defaultPageSize={20}
            />
          </>
        )}
      </div>
    );
  }
}
