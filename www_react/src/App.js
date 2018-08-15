import React, { Component } from 'react';
import './index.css';
import { BuildBets } from './BuildBets';

class App extends Component {

    render() {

        return (
            <div className="site-container">
                <BuildBets />
            </div>
        )
    }
}

export default App;