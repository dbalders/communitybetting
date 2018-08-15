import React, { Component } from 'react';

export class BuildBets extends Component {
    state = {
        gameData: []
    }

    componentDidMount() {
        this.callApi()
            .then(results => {
                let gameData = results.data.map((gameData) => {
                    return (
                        <div className="bet-container flex-vertical center" key={gameData.id} id={gameData.id}>
                            <div className="bet-title">
                                <a data="bet-title" src={gameData.link}>{gameData.gameTitle}</a>
                            </div>
                            <div className="bets-container flex center" data-id={gameData._id}>
                                <div className="bets-away flex-vertical">
                                    <div data-title="awayTeamAbbr" data-id={gameData._id} className="vote-abbr-left">{gameData.awayTeamAbbr}</div>
                                    <div className="vote-container flex">
                                        <div data-title="awayTeamSpreadVotes" className="vote-number center">{gameData.awayTeamSpreadVotes}</div>
                                        <div data-title='awayTeamSpread' data-vote-title="awayTeamSpreadVotes" data-id={gameData._id} className="vote" onClick={((e) => this.vote(e, gameData))}>{gameData.awayTeamSpread}</div>
                                    </div>
                                    <div className="vote-container flex">
                                        <div data-title="awayTeamMLVotes" className="vote-number center">{gameData.awayTeamMLVotes}</div>
                                        <div data-title='awayTeamML' data-vote-title="awayTeamMLVotes" data-id={gameData._id} className="vote" onClick={((e) => this.vote(e, gameData))}>{gameData.awayTeamML}</div>
                                    </div>
                                    <div className="vote-container flex">
                                        <div data-title="betOUUnderVotes" className="vote-number center">{gameData.betOUUnderVotes}</div>
                                        <div data-title='betOUUnder' data-vote-title="betOUUnderVotes" data-id={gameData._id} className="flex vote flex-center betOU" onClick={((e) => this.vote(e, gameData))}>
                                            <div data-title="betOU">{gameData.betOU}</div>
                                            <div data-title="betOUUnderValue">{gameData.betOUUnderValue}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bets-home flex-vertical">
                                    <div data-title="homeTeamAbbr" data-id={gameData._id} className="vote-abbr-right">{gameData.homeTeamAbbr}</div>
                                    <div className="vote-container flex">
                                        <div data-title='homeTeamSpread' data-vote-title="homeTeamSpreadVotes" data-id={gameData._id} className="vote" onClick={((e) => this.vote(e, gameData))}>{gameData.homeTeamSpread}</div>
                                        <div data-title="homeTeamSpreadVotes" className="vote-number center">{gameData.homeTeamSpreadVotes}</div>
                                    </div>
                                    <div className="vote-container flex">
                                        <div data-title='homeTeamML' data-vote-title="homeTeamMLVotes" data-id={gameData._id} className="vote" onClick={((e) => this.vote(e, gameData))}>{gameData.homeTeamML}</div>
                                        <div data-title="homeTeamMLVotes" className="vote-number center">{gameData.homeTeamMLVotes}</div>
                                    </div>
                                    <div className="vote-container flex">
                                        <div data-title='betOUOver' data-vote-title="betOUOverVotes" data-id={gameData._id} className="flex vote flex-center betOU" onClick={((e) => this.vote(e, gameData))}>
                                            <div data-title="betOU">{gameData.betOU}</div>
                                            <div data-title="betOUOverValue">{gameData.betOUOverValue}</div>
                                        </div>
                                        <div data-title="betOUOverVotes" className="vote-number center">{gameData.betOUOverVotes}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })

                this.setState({ gameData: gameData })
            })
            .catch(err => console.log(err));
    }

    callApi = async() => {
        const response = await fetch('/api/bets');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        return body;
    };

    vote = (e, data) => {
    	console.log(e);
    	console.log(data);

    }

    render() {
      return (
        <div className="bet-list-container flex flex-wrap">
            {this.state.gameData}
        </div>
      )
    }
}