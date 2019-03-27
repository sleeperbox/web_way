import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import axios from "axios";



function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    minWidth: '50%',
  },
});

class NavTabs extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      email: "",
      password: "",
      isLogin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount(){
    const { isLogin } = this.state;
    if(isLogin == true){
      console.log('login')
    } else{
      console.log('gagal')
    }
  
  }
  componentDidMount(){
    
  }

  componentDidUpdate(){
    const { isLogin } = this.state;
    if(isLogin == true){
      localStorage.setItem("email", JSON.stringify(this.state.email));
      localStorage.setItem("auth", JSON.stringify(this.state.isLogin));
      window.location = "#/profile";
    } else {
      console.log('login gagal')
    }
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin || newState.warning || newState.kode) {
      return true;
    } else {
      return false;
    }
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
  render() {
    const btnColor = {
      background: '#dd5044',
      color: '#ffffff',
      width: '100%'
    }
    const btnWidth = {
      width: '100%'

    }
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      
      <Button variant="contained" className={classes.button} style={btnColor}>
                  Log in with google
                 
              </Button>
              <br />
              <br />
          <TextField
          id="outlined-text-input"
          label="Email"
          fullWidth={true}
          className={classes.textField}
          type="email"
          margin="normal"
          name="email"
          onChange={this.handleChange}
        />
         <TextField
          id="outlined-text-input"
          label="Password"
          fullWidth={true}
          className={classes.textField}
          type="password"
          margin="normal"
          name="password"
          onChange={this.handleChange}
        />
        <br />
        <br />
         <Button variant="contained" className={classes.button} color="primary" style={btnWidth} onClick={this.handleSubmit}>
                  Login
              </Button>
        <Button onClick={this.props.signUp.bind(this)}>Sign Up</Button>
       
      </form>

      
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
