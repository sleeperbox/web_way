import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import InputMask from 'react-input-mask';
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Icon from "@mdi/react";
import { mdiGooglePlus } from "@mdi/js";
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

const styles1 = theme => ({
  error: {
    background: "red",
    color: "white"
  },

  message: {
    display: "flex",
    alignItems: "center"
  }
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
      action={[]}
      {...other}
    />
  );
}
MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error"]).isRequired
};

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
      phone_number: "",
      number: null
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
    const { isLogin } = this.state;
    if (isLogin) {
      window.location = "#/profile";
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === true) {
      localStorage.setItem("email", JSON.stringify(this.state.email));
      localStorage.setItem("phone", JSON.stringify(this.state.phone_number));
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
  handleSubmit() {
    if (this.state.value === 0) {
      axios({
        method: "POST",
        url: "http://apps.aprizal.com/api/register/phone",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          phone_number: this.state.phone_number,
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
    } else {
      axios({
        method: "POST",
        url: "http://apps.aprizal.com/api/register",
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
  }
  googleSignin() {
    window.location = "http://apps.aprizal.com/api/auth/google";
  }
  render() {
    const btnColor = {
      background: "#dd5044",
      color: "#ffffff",
      width: "100%"
    };
    const btnWidth = {
      width: "100%"
    };
    const { classes } = this.props;
    const { value } = this.state;
    const { warning } = this.state;
    const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);
    return (
      <ValidatorForm onSubmit={this.handleSubmit}>
        {warning === 1 ? (
          <MySnackbarContentWrapper
            style={{ background: "#ffa000" }}
            variant="error"
            className={classes.margin}
            message="Username/Email Has Been Used !"
          />
        ) : null}
        <br />
        <Button
          variant="contained"
          style={btnColor}
          onClick={this.googleSignin.bind(this)}
        >
          <Icon path={mdiGooglePlus} size={1} color="white" />
          <span>&nbsp;</span> sign in with google
        </Button>
        <br />
        <br />
        <div className={classes.root}>
          <AppBar position="static" color="default">
            <Tabs
              variant="fullWidth"
              value={value}
              required={true}
              onChange={this.moveTab}
              indicatorColor="primary"
              textColor="primary"
            >
              <LinkTab label="Phone" classes={{ root: classes.tabRoot }} />
              <LinkTab label="email" classes={{ root: classes.tabRoot }} />
            </Tabs>
          </AppBar>
          {value === 0 && (
            <TextValidator
              label="Phone"
              className={classes.textField}
              type="number"
              margin="normal"
              fullWidth={true}
              required={true}
              name="phone_number"
              placeholder="082316xxxxx"
              onChange={this.handleChange}
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,13)
            }}
            />
          )}
          {value === 1 && (
            <TextValidator
              label="Email"
              fullWidth={true}
              required={true}
              className={classes.textField}
              type="email"
              margin="normal"
              name="email"
              onChange={this.handleChange}
            />
          )}
        </div>
        <TextValidator
          label="Username"
          required={true}
          className={classes.textField}
          type="text"
          fullWidth={true}
          margin="normal"
          name="username"
          onChange={this.handleChange}
        />
        <TextValidator
          label="First Name"
          required={true}
          className={classes.textField}
          type="text"
          fullWidth={true}
          margin="normal"
          name="first_name"
          onChange={this.handleChange}
        />
        <TextValidator
          label="Last Name"
          required={true}
          className={classes.textField}
          type="text"
          fullWidth={true}
          margin="normal"
          name="last_name"
          onChange={this.handleChange}
        />
        <TextValidator
          label="Password"
          className={classes.textField}
          type="password"
          fullWidth={true}
          margin="normal"
          required={true}
          name="password"
          onChange={this.handleChange}
        />
        <br />
        <br />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          className={classes.button}
          style={btnWidth}
        >
          Sign Up
        </Button>
        Already signed up?&nbsp;
        <Button onClick={this.props.logins.bind(this)}>
          <u>
            <b>Login Here</b>
          </u>
        </Button>
        &nbsp;instead.
      </ValidatorForm>
    );
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Form);