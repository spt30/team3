import React, { Component } from 'react';

export default class NotePage extends Component {
    render() {
        return (
            <div>
                <h1>Авторизуйтесь под github:</h1>
                <h2>Можно не авторизовываться</h2>
                <h3>Но лучше авторизоваться</h3>
                <h4>Рут <b>/main</b>, а компонент <i>index.js</i></h4>
                <h5>Удивительное дело</h5>
                <a href="/login">Авторизоваться</a>
            </div>
        );
    }
}
