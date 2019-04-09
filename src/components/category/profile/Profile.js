import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {

        }
    }
    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        localStorage.removeItem('menu')
        window.location='#/login';
    }
    render(){
        
        return (
            <div>
                <Paper style={{padding: 10}}><Button variant="contained" color="primary">kaluar</Button></Paper>
            </div>
        )
    }
}
