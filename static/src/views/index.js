import React, { Component } from 'react';
import List from './list/index'

export default class MyLayout extends Component {
    render () {
        return (
            <div className="app-layout-wrap">
                <List />
            </div>
        )
    }
}