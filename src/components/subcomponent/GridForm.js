
import React, { Component } from "react";
import Form from './form/Form';

export default class GridForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    render () {
        
     
        return (
        <div>
            <div>
                <h1>WAY</h1>
                <p>Sign Up or Log in</p>
            </div>
            <Form/>
        </div>
        );
    }


}