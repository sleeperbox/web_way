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

function PaperSheet(props) {
  const { classes } = props;
  return (
    <Grid container spacing={16}>
      <div className={classes.root} style={{paddingLeft:0, paddingRight:0,
    paddingBottom:0}}>      
        <Container style={{height:'100%'}}/>
      </div>
    </Grid>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
