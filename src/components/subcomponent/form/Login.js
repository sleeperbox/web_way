import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from "axios";


export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: false,
     
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
    handleChange(event) {
      let target = event.target;
      let value = target.value;
      let name = target.name;
      this.setState({
        [name]: value
      });
    }

    handleSubmit() {
      axios({
        method: "POST",
        url: "http://localhost:8080/api/login",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: this.state.email,
          password: this.state.password
        }
      }).then(result =>
        this.setState({
          warning: result.data,
          isLogin: result.data.auth,
          token: result.data.token
        })
      );
    }
    componentDidUpdate(){
      const { isLogin } = this.state;
      if(isLogin ===  true){
        localStorage.setItem("email", JSON.stringify(this.state.email));
        localStorage.setItem("auth", JSON.stringify(this.state.isLogin));
        window.location = "#/profile";
      } else {
        console.log('login gagal')
      }
    }
    // shouldComponentUpdate(newProps, newState){
    //   if(newState.isLogin || newState.warning || newState.kode){
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }

    render() {
        const { email, password } = this.state;
        return (
          <ValidatorForm onSubmit={this.handleSubmit}>
                <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    type="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <br />
                <TextValidator
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    value={password}
                    type="password"
                    validators={['required']}
                    errorMessages={['this field is required']}
                />
                <br />
                <Button color="primary" variant="contained" type="submit">
                    login
                </Button>
            </ValidatorForm>
        );
    }
}