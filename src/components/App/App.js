import { Tabs, Alert } from 'antd';
import { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import './App.css';
import 'antd/dist/antd.min.css';

import MovieList from '../MovieList';
import SearchLine from '../SearchLine';
import MovieApi from '../../services/MovieApi';
import RatedList from '../RatedList';
import { TagsApiProvider } from '../MovieApiContext';

export default class App extends Component {
  state = {
    search: '',
    idSession: null,
    rated: null,
    tagList: [],
  };

  movieApi = new MovieApi();

  componentDidMount() {
    this.movieApi.newSession().then((session) => {
      this.setState({ idSession: session.guest_session_id });
    });
    this.movieApi.getTagList().then((tags) => {
      this.setState({ tagList: tags });
    });
  }

  updateSearch = (value) => {
    this.setState({
      search: value,
    });
  };

  rateMovie = (val, id) => {
    const { idSession } = this.state;
    const star = {
      value: val,
    };
    this.movieApi.rateMovie(idSession, id, star);
  };

  onTabClick = (key) => {
    if (key === 2) {
      this.setState(({ rated }) => {
        return {
          rated: !rated,
        };
      });
    }
  };

  render() {
    const { search, idSession, rated, tagList } = this.state;
    return (
      <>
        <Online>
          <TagsApiProvider value={tagList}>
            <Tabs
              onTabClick={this.onTabClick}
              defaultActiveKey="1"
              centered
              items={[
                {
                  label: 'Search',
                  key: 1,
                  children: (
                    <>
                      <SearchLine updateSearch={this.updateSearch} />
                      <MovieList search={search} idSession={idSession} rateMovie={this.rateMovie} />
                    </>
                  ),
                },
                {
                  label: 'Rated',
                  key: 2,
                  children: <RatedList idSession={idSession} rateMovie={this.rateMovie} rated={rated} />,
                },
              ]}
            />
          </TagsApiProvider>
        </Online>
        <Offline>
          <Alert
            message="Warning"
            description="Нет соединения с сетью. Попробуйте переподключиться"
            type="warning"
            showIcon
          />
        </Offline>
      </>
    );
  }
}
