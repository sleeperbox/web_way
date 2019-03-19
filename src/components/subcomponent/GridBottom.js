
import React, { Component } from "react";

export default class GridBottom extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render () {
        const grid = {
            height: 50,
        } 
     
        return (
        <div style={grid}>
            <p>ini adalah grid handap</p>
        </div>
        );
    }


}