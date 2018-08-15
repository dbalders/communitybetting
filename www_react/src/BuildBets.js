import React, { Component } from 'react';

export class BuildBets extends Component {
    constructor() {
        super();
        this.state = {
            nbaData = []
        }
    }

    componentDidMount() {
        this.callApi()
            .then(results => {
                // this.setState({ nbaData: res.data })
                let teamName = results.data.map((homeTeam) => {
                	console.log(homeTeam); 
                	return
                })
            })
            .catch(err => console.log(err));
    }

    callApi = async() => {
        const response = await fetch('/api/bets');
        const body = await response.json();

        if (response.status !== 200) throw Error(body.message);

        // console.log(someId);
        // console.log(this)
        // console.log(body);

        return body;
    };

    render() {
        console.log('here');

        return console.log('here')
    }
}