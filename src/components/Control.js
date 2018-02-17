import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {
  render() {
    return (
        <div className="row mt-15">
            {/* Search Component */}
                <Search />
            {/* End Search Component */}
            {/* Sort Component */}
                <Sort />
            {/* End Sort Component */}
        </div>
    )
  }
};

export default Control;