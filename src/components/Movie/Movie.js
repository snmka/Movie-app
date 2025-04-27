import { Component } from 'react';
import { Card, Tag } from 'antd';
import 'antd/dist/antd.min.css';
import './Movie.css';
import { format } from 'date-fns';

import Rating from '../Rating';
import Stars from '../Stars';
import { TagsApiConsumer } from '../MovieApiContext';

import noImage from './no-image-icon.png';

export default class Movie extends Component {
  tagNames = (tags) => {
    const arr = [];
    const { tagID } = this.props;
    tags.forEach(({ id, name }) => {
      tagID.forEach((elem) => {
        if (id === elem) {
          arr.push(name);
        }
      });
    });
    return arr;
  };

  render() {
    const { title, releaseDate, poster, overview, rating, idSession, id, rateMovie, star } = this.props;
    const cutOverview = overview.slice(0, overview.lastIndexOf(' ', 130));
    let date = null;
    if (releaseDate) {
      date = format(new Date(releaseDate), 'MMMM dd, yyyy');
    }
    const imagePoster = poster ? `https://image.tmdb.org/t/p/original${poster}` : noImage;
    return (
      <li className="item">
        <Card hoverable cover={<img alt="movie poster" src={imagePoster} className="item__img" />}>
          <Rating rating={rating} />
          <h1>{title}</h1>
          <div className="date">{date}</div>
          <TagsApiConsumer>
            {(tags) => {
              return this.tagNames(tags).map((tag) => {
                return (
                  <Tag style={{ opacity: 0.65 }} key={tag}>
                    {tag}
                  </Tag>
                );
              });
            }}
          </TagsApiConsumer>
          <p className="description">{`${cutOverview} ...`}</p>
          <Stars idSession={idSession} id={id} rateMovie={rateMovie} star={star} />
        </Card>
      </li>
    );
  }
}
