import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axios from "axios";
import SnackbarContent from '@material-ui/core/SnackbarContent';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles1 = theme => ({ 
  error: {
    background: 'red',
    color: 'white'
  },
  
  message: {
    display: 'flex',
    alignItems: 'center',
  },
 
});
function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;

  return (
    <SnackbarContent
      
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          {message}
        </span>
      }
      action={[
        
      ]}
      {...other}
    />
  );
}
MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error']).isRequired,
};

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLogin: false,
      warning: null,
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
      }
    }
    // shouldComponentUpdate(newProps, newState){
    //   if(newState.isLogin || newState.warning || newState.kode){
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
    googleSignin() {
      window.location = "http://localhost:8080/api/auth/google"      
    }

    render() {
      
        const btnWidth = {
          width: '100%'
        }
        const btnColor = {
          background: '#dd5044',
          color: '#ffffff',
          width: '100%'
        }
        const { warning } = this.state;
        const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
        const { classes } = this.props;

        return (
          <ValidatorForm onSubmit={this.handleSubmit}>
          {warning === 1 ? (
            <MySnackbarContentWrapper
              style={{background: '#ffa000'}}
              variant="error"
              message="Username/Email Has Been Used !"
            />
          ) : null}
              <br />
              <br />
            <Button variant="contained" style={btnColor} onClick={this.googleSignin.bind(this)}>
                sign in with google 
            </Button>
              <br />
              <br />
          <TextValidator
            label="Email, Phone Number or Username"
            onChange={this.handleChange}
            name="email"
            type="text"
            required={true}
            fullWidth={true}
          />
          <br />
          <TextValidator
            label="Password"
            onChange={this.handleChange}
            name="password"
            required={true}
            type="password"
            fullWidth={true}
          />
          <br />
          <br />
          <Button color="primary" variant="contained" type="submit" style={btnWidth}>
              Sign in
          </Button>
          <br />
          <br />
          Don't have an Account? <Button onClick={this.props.signUp.bind(this)}>
            <u><b>sign up here</b></u>
          </Button>
        </ValidatorForm>  
      );
    }
}