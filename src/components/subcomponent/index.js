import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridPost from './GridPost';
import GridForm from './GridForm';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 10,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
});

function FullWidthGrid(props) {
  
  const { classes } = props;
  
  return (
    <div className={classes.root}>
      <Grid container spacing={24} style={{border: "none"}}>
        <Grid item xs={12} sm={6}>
            <GridPost/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper} style={{background: "none"}} elevation={4}>
            <GridForm/>
          </Paper>  
        </Grid>   
      </Grid>
    </div>
  );
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullWidthGrid);
