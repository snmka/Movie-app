import { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';

import Movie from '../Movie';
import './RatedList.css';
import MovieApi from '../../services/MovieApi';

export default class RatedList extends Component {
  movies = new MovieApi();

  state = {
    data: [],
    loading: false,
    error: false,
    page: 1,
    totalResults: 0,
  };

  componentDidMount() {
    const { idSession } = this.props;
    this.setState({
      loading: true,
    });
    this.movies
      .getRatedMovies(idSession)
      .then((movies) => {
        this.setState({
          data: movies.results,
          loading: false,
        });
      })
      .catch(this.onError);
  }

  componentDidUpdate(prevProps, prevState) {
    const { idSession, rated } = this.props;
    const { page } = this.state;
    if (rated !== prevProps.rated) {
      this.setState({
        loading: true,
      });
      this.movies
        .getRatedMovies(idSession, page)
        .then((movies) => {
          this.setState({
            data: movies.results,
            loading: false,
            error: false,
            totalResults: movies.total_results,
          });
        })
        .catch(this.onError);
    }
    if (page !== prevState.page) {
      this.setState({
        loading: true,
      });
      this.movies
        .getRatedMovies(idSession, page)
        .then((movies) => {
          this.setState({
            data: movies.results,
            loading: false,
            error: false,
            totalResults: movies.total_results,
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
    const { data, tagList, loading, error, page, totalResults } = this.state;
    const { idSession, starRaiting, rateMovie } = this.props;
    const errorMessage = error ? (
      <Alert message="Ошибка" description="Что-то пошло не так. Исправим в ближайшее время." type="error" showIcon />
    ) : null;
    return (
      <div>
        {errorMessage}
        {loading ? (
          <Spin size="large" />
        ) : (
          <>
            <ul className="movieList">
              {data.map((movie) => {
                return (
                  <Movie
                    starRaiting={starRaiting}
                    key={movie.id}
                    title={movie.title}
                    releaseDate={movie.release_date}
                    overview={movie.overview}
                    poster={movie.poster_path}
                    tagID={movie.genre_ids}
                    tagList={tagList}
                    rating={movie.vote_average}
                    star={movie.rating}
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
