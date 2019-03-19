import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
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
      username: "",
      first_name: "",
      last_name: "",
      password: "",
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
      url: "http://localhost:8080/api/register",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username: this.state.username,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
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

        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs 
              variant="fullWidth" 
              value={value} 
              onChange={this.moveTab} 
              indicatorColor="primary"
              textColor="primary"
             
            >
              <LinkTab label="telepon" classes={{ root: classes.tabRoot }}/>
              <LinkTab label="email" classes={{ root: classes.tabRoot }}/>
            </Tabs>
          </AppBar>
          {value === 0 && <TextField
          id="outlined-text-input"
          label="Telepon"
          className={classes.textField}
          type="number"
          margin="normal"
          fullWidth={true}
          name="phone"
          onChange={this.handleChange}
        />}
          {value === 1 &&   <TextField
          id="outlined-text-input"
          label="Email"
          fullWidth={true}
          className={classes.textField}
          type="email"
          margin="normal"
          name="email"
          onChange={this.handleChange}
        />}
        </div>

        <Button onClick={this.props.signUp.bind(this)}>Sign Up</Button>
       
      </form>

      
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
