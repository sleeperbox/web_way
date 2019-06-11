import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from './Container';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    background: '#fffff', 
    maxWidth: '100%',
  },
  
});

class index extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email"),
      isLogin: localStorage.getItem('auth'),      
    };
  }

  componentWillMount() {
    if(this.state.isLogin === null){
      window.location = "#/login";
      location.reload();
    }   
  }
  
  render(){
    const { classes } = this.props;
    return (
      <Grid container spacing={16}>
      <div className={classes.root} style={{paddingLeft:0, paddingRight:0,
    paddingBottom:0}}>      
        <Container style={{height:'100%'}}/>
      </div>
    </Grid>
    )
  }
}

index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(index);
