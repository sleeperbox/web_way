import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Home from './Home';
import TrendingIcon from '@material-ui/icons/TrendingUp';

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

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  containerPage:{
    margin: 15,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class ScrollableTabsButtonAuto extends React.Component {
  state = {
    value: 1,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
            <Tab icon={<TrendingIcon/>}/>
            <Tab label="Home" />
            <Tab label="Komputer & gadget" />
            <Tab label="Keluarga & Asmara" />
            <Tab label="Fakta & Rumor" />
            <Tab label="Bisnis & Pekerjaan" />
            <Tab label="Fashion & Gaya Hidup" />
            <Tab label="Quotes" />
            <Tab label="Riddless" />
            <Tab label="Lainnya" />
          </Tabs>
        </AppBar>
        <br />
        <br />
        <Grid container>
          <Grid item xs sm={8}>
              {value === 0 && <Paper style={{height:'100px'}}><TabContainer>Trending</TabContainer></Paper>}
              {value === 1 && <TabContainer><Home/></TabContainer>}
              {value === 2 && <TabContainer>Komputer & gadget</TabContainer>}
              {value === 3 && <TabContainer>Keluarga dan asmara</TabContainer>}
              {value === 4 && <TabContainer>Fakta & rumor</TabContainer>}
              {value === 5 && <TabContainer>Bisnis & Pekerjaan</TabContainer>}
              {value === 6 && <TabContainer>Fashion & gaya hidup</TabContainer>}
              {value === 7 && <TabContainer>Quotes</TabContainer>} 
              {value === 8 && <TabContainer>Riddless</TabContainer>}    
              {value === 9 && <TabContainer>Lainnya</TabContainer>}    
          </Grid>
          <Grid item xs sm={4}>
              <TabContainer>
                xs=12 sm=4
              </TabContainer>
          </Grid>
          {value === 0 && <Grid item xs={12}>
          <Paper className={classes.paper}>bottom trending topik</Paper>
        </Grid>}
      </Grid>
      </div>
    );
  }
}

ScrollableTabsButtonAuto.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollableTabsButtonAuto);
