import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
});

class NavTabs extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        value: 0,
    };
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  
  render() {
    const btnColor = {
      background: '#dd5044',
      color: '#ffffff',
    }
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
      
      <Button variant="contained" className={classes.button}>
                  Log in with google
                 
              </Button>
              <br />
              <br />

        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs 
              variant="fullWidth" 
              value={value} 
              onChange={this.handleChange} 
              indicatorColor="primary"
              textColor="primary"
             
            >
              <LinkTab label="telepon" href="page1" />
              <LinkTab label="email" href="page2" />
            </Tabs>
          </AppBar>
          {value === 0 &&<TextField
          id="outlined-text-input"
          label="Telepon"
          className={classes.textField}
          type="number"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />}
          {value === 1 &&   <TextField
          id="outlined-text-input"
          label="Email"
          className={classes.textField}
          type="email"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />}
        </div>

        <TextField
          id="outlined-text-input"
          label="Full Name"
          className={classes.textField}
          type="text"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
          <TextField
          id="outlined-text-input"
          label="Username"
          className={classes.textField}
          type="text"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
          <TextField
          id="outlined-password-input"
          label="Password"
          className={classes.textField}
          type="password"
          autoComplete="current-password"
          margin="normal"
          variant="outlined"
        />
        <Button variant="contained" color="primary" className={classes.button}>
            Sign Up
        </Button>
      </form>

      
    );
  }
}

NavTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavTabs);
