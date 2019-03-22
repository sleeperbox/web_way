import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    background: '#f7f7f7f7', 
    width: '100%',
  },
  
});

function PaperSheet(props) {
  const { classes } = props;
  return (
    <Grid container spacing={16}>
      <Paper className={classes.root} elevation={1} style={{paddingLeft: 0, paddingRight: 0}}>
        
      </Paper>
    </Grid>
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
