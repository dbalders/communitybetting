import React, { Component } from 'react';
import './index.css';
import { BuildBets } from './BuildBets';

class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            gameData: [],
            voteData: []
        }
        this.vote = this.vote.bind(this)
    }

    componentDidMount() {
        this.callApi()
            .then(results => {
                //Put the game data into a variable to put in  the state
                let gameData = results.data;
                //Go over each item and add the 6 voting categories for voting css
                gameData.map((gameData, i) => {
                    gameData.voted = [false, false, false, false, false, false];
                });
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
        var votingKey = e.currentTarget.getAttribute('data-key')

        // e.currentTarget.style.backgroundColor='#ccc'

        var sendData = {
            'betId': e.currentTarget.getAttribute('data-id'),
            'betVote': e.currentTarget.getAttribute('data-vote-title')
        }

        //Ok, so, here i have figured out how to search and find a specific div on the vote
        //So, what needs to happen here is to push voteData into a cookie
        //Then, down after we ge the data back, instead of pushing the 6 falses, we need to read the cookie to know which should be switched from false to true
        //Guessing at this point it would be an if statement like, is this id in the cookie? yes? ok, now map the attribute to one of the 6 possibilities and where it
        //lies in the array. Ex. 111111, awayTeamML. awayTeamML is the 2nd item in the array, so assign it a value of 1 and then change the first value to true
        //Also, need to add in here the ability to 'unvote' when clicked on again. That should be after the first tho. Think this should fix the css and allow
        //individual to change on click
        var voteData = this.state.voteData;
        voteData.push({
            'betId': data.id,
            'betVote': e.currentTarget.getAttribute('data-title')
        });

        var element = document.getElementById(voteData[0].betId);

        console.log(element)
        console.log(element.querySelector('[data-title=' + voteData[0].betVote + ']'))

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
            // console.log(response.length)
            response.map((gameData, i) => {
                //this is broken b/c will set all to false, need to fix this to be dynamic with what updates
                gameData.voted = [false, false, false, false, false, false];
            });
            this.setState({"gameData": response});
        })
    }

    render() {

        const { gameData } = this.state;

        return (
            <div className="site-container">
                <BuildBets gameData={this.state.gameData} vote={this.vote}/>
            </div>
        )
    }
}

export default App;