
import React, { Component } from "react";
import Form from './form/Form';
import Login from './form/Login';
import TextField from '@material-ui/core/TextField';



export default class GridForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            choice: 0,
        };
    }

    goToLogin() {
        this.setState({choice: 1})    
    }

    up(){
        this.setState({choice: 0})    
       
    }

    render () {
        console.log(this.state.choice)
        const {choice} = this.state
        const grid = {
            height: 658,
        }

        return (
            
            <div style={grid}>
                {choice === 0 ? <Form logins = {this.goToLogin.bind(this)}/> : <Login signUp = {this.up.bind(this)}/>}
            </div>
        );
    }


}