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
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
function Transition(props) {
  return <Slide direction="up" {...props} />;
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
});

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: 0,
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        isLogin: "",
        token: "",
        warning: null,
        open: true
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  moveTab = (event, value) => {
    this.setState({ value });
  };
  componentWillMount() {
    this.setState({
      isLogin: localStorage.getItem("auth")
    });
  }

  componentDidMount() {
    
  }


  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin || newState.warning) {
      return true;
    } else {
      return false;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === true) {
      localStorage.setItem("email", JSON.stringify(this.state.email));
      localStorage.setItem("auth", JSON.stringify(this.state.isLogin));
      window.location = "#/profile";
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

  setWarning = () => {
    this.setState({
      warning: null
    })
  }

  handleClose = () => {
    this.setState({ open: false });
  };
 
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
    )
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
    const { warning } = this.state;
    return (
      
      <form className={classes.container}>
      {warning === 1 ? (
             <div>
       
             <Dialog
               open={this.state.open}
               TransitionComponent={Transition}
               keepMounted
               onClose={this.handleClose}
               aria-labelledby="alert-dialog-slide-title"
               aria-describedby="alert-dialog-slide-description"
             >
               <DialogTitle id="alert-dialog-slide-title">
                 {"Warning !"}
               </DialogTitle>
               <DialogContent>
                 <DialogContentText id="alert-dialog-slide-description">
                    Email is Already Use Please use Another Email !
                 </DialogContentText>
               </DialogContent>
               <DialogActions>
                 <Button onClick={this.this.handleClose} color="primary">
                   Ok
                 </Button>
               </DialogActions>
             </Dialog>
           </div>
            ) : null}
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
        <TextField
          id="outlined-text-input"
          label="Username"
          className={classes.textField}
          type="text"
          fullWidth={true}
          margin="normal"
          name="username"
          onChange={this.handleChange}
        />
         <TextField
          id="outlined-text-input"
          label="First Name"
          className={classes.textField}
          type="text"
          fullWidth={true}
          margin="normal"
          name="first_name"
          onChange={this.handleChange}
        />
        <TextField
          id="outlined-text-input"
          label="Last Name"
          className={classes.textField}
          type="text"
          fullWidth={true}
          margin="normal"
          name="last_name"
          onChange={this.handleChange}
        />
          <TextField
          
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          fullWidth={true}
          margin="normal"
          name="password"
          onChange={this.handleChange}
        />
        
          <br />
          <br />
          <Button variant="contained" color="primary" className={classes.button} style={btnWidth} onClick={this.handleSubmit}>
            Sign Up
        </Button>
        Already signed up?&nbsp;<Button onClick={this.props.logins.bind(this)}>Login Here</Button>
                &nbsp;instead.
      </form>

      
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Form);
