import React, { Component } from 'react';
import './index.css';
import { BuildBets } from './BuildBets';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            gameData: []
        }
        this.vote = this.vote.bind(this)
    }

    componentDidMount() {
        this.callApi()
            .then(results => {
                let gameData = results.data;
                this.setState({ gameData: gameData }).bind(this)
            })
            .catch(err => console.log(err));
    }

    callApi = async() => {
        const response = await fetch('/api/bets');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    vote(e, data) {

        var sendData = {
            'betId': e.currentTarget.getAttribute('data-id'),
            'betVote': e.currentTarget.getAttribute('data-vote-title')
        }

        var voteButton = e.currentTarget;

        fetch('/api/vote', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: sendData
          }),
        })
        //wait for the promise and return the response
        .then(response => response.json())
        //return the response.data
        .then(response => {
            return response.data;
        })
        //update the state to update the page
        .then(response => {
            this.setState({"gameData": response});
        })
    }

    render() {

        const { gameData } = this.state;

        return (
            <div className="site-container">
                <BuildBets gameData={gameData} vote={this.vote}/>
            </div>
        )
    }
}

export default App;