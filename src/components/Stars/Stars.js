import { Rate } from 'antd';
import './Stars.css';
import { Component } from 'react';

export default class Stars extends Component {
  render() {
    const { id, rateMovie, star } = this.props;
    return (
      <Rate
        allowHalf
        count="10"
        allowClear={false}
        onChange={(value) => rateMovie(value, id)}
        defaultValue={star}
        disabled={!!star}
      />
    );
  }
}
