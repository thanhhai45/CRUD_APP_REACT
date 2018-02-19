import React, { Component } from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends Component {
  render() {
    return (
        <div className="row mt-15">
            {/* Search Component */}
                <Search onSearch={this.props.onSearch} />
            {/* End Search Component */}
            {/* Sort Component */}
                <Sort 
                    onSort={this.props.onSort} 
                    sortBy={this.props.sortBy}
                    sortValue={this.props.sortValue}
                />
            {/* End Sort Component */}
        </div>
    )
  }
};

export default Control;