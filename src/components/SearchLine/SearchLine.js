import './SearchLine.css';

import { Component } from 'react';
import { debounce } from 'lodash';

export default class SearchLine extends Component {
  onLabelChange = debounce((e) => {
    const { updateSearch } = this.props;
    updateSearch(e.target.value);
  }, 500);

  render() {
    return (
      <form className="search">
        <input className="search__input" placeholder="Type to search..." onChange={this.onLabelChange} />
      </form>
    );
  }
}
