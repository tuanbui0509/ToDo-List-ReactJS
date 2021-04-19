import React, { Component } from 'react';
import Search from './Search'
import Sort from './Sort'
class Control extends Component {
    render() {
        return (
            <div className="row mt-15">
                <div>
                    <Search />
                    <Sort />

                </div>
            </div>
        );
    }
}

export default Control;
