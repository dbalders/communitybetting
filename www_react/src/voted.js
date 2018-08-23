import React, { Component } from 'react';

class Voted extends Component {
    toggleClass = () => {
        const oldClassName = document.getElementById('test').className;
        const newClassName = oldClassName === 'red' ? 'blue' : 'red'
        document.getElementById('test').className = newClassName
    }

    render() {
        return ( <
            div >
            <
            p >
            click toggle to change colors below <
            /p> <
            button onClick = { this.toggleClass } > toggle < /button> <
            /div>
        );
    }
}