import React, { Component } from 'react';

export class VotedCSS extends Component {

    constructor(props){
        super(props);
        this.toggleVoted = this.toggleVoted.bind(this);
    }

    toggleVoted() {
        console.log('here')
        var css = (this.props.voted === "notVoted") ? "vote-selected" : "notVoted";
        this.setState({"voted":css});
    }

    render() {
        return;
    }
}