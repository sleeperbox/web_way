import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import IndexGrid from './subcomponent/index';
import Bg from '../../public/images/bg.png' 

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    background: 'url(' + Bg + ')'
  }
});

function PaperSheet(props) {
  
  const { classes } = props;
  

  return (
    <Grid container spacing={16}>
      <Grid item xs={12} style={{paddingLeft: 0, paddingRight: 0}}>
          <Paper className={classes.root} elevation={1}>
            <IndexGrid/>
          </Paper>
      </Grid>
    </Grid>
     
  
  );
}

PaperSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PaperSheet);
